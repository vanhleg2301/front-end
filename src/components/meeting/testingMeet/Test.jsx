import React, { useContext, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import Peer from "peerjs";
import { io } from "socket.io-client";
import { AuthContext } from "../../../context/AuthProvider";
import { useParams } from "react-router-dom";

export default function Test({ playVideo, muteMic, screenShare }) {
  const { roomId } = useParams();
  const { userLogin } = useContext(AuthContext);
  const [userDetail] = useState({
    id: userLogin.user._id,
    name: userLogin.user.fullName,
  });

  const refVideo = useRef(null);
  const refScreenShareVideo = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaStreamShared, setMediaStreamShared] = useState(null);
  const [peer, setPeer] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [error, setError] = useState(null);
  const [originalVideoTrack, setOriginalVideoTrack] = useState(null);

  useEffect(() => {
    let stream = null;

    const getMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          },
          video: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
            frameRate: { ideal: 30, max: 60 },
            facingMode: "user",
          },
        });
        setMediaStream(stream);
        refVideo.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError(err);
      }
    };

    getMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  useEffect(() => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !muteMic;
        setIsMicMuted(muteMic);
      });
    }
  }, [muteMic, mediaStream]);

  useEffect(() => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = playVideo;
        setIsVideoPlaying(playVideo);
      });
    }
  }, [playVideo, mediaStream]);

  useEffect(() => {
    if (refScreenShareVideo.current && mediaStreamShared) {
      refScreenShareVideo.current.srcObject = mediaStreamShared;
    }
  }, [mediaStreamShared]);

  useEffect(() => {
    if (screenShare) {
      shareScreen();
    } else {
      stopScreenShare();
    }
  }, [screenShare]);

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setMediaStreamShared(screenStream);
      refScreenShareVideo.current.srcObject = screenStream;
      const screenStreamTrack = screenStream.getVideoTracks()[0];
      setOriginalVideoTrack(mediaStream.getVideoTracks()[0]);
      mediaStream.removeTrack(mediaStream.getVideoTracks()[0]);
      mediaStream.addTrack(screenStreamTrack);
    } catch (err) {
      console.error("Error sharing screen", err);
    }
  };

  const stopScreenShare = () => {
    if (originalVideoTrack) {
      const screenStreamTrack = mediaStream.getVideoTracks()[0];
      mediaStream.removeTrack(screenStreamTrack);
      mediaStream.addTrack(originalVideoTrack);
      setMediaStreamShared(null);
      setOriginalVideoTrack(null);
    }
  };

  const socket = io("/", { transports: ["websocket"] });

  useEffect(() => {
    socket.emit("join-room", roomId, userDetail.id);
    socket.on("user-connected", (userId) => {
      handleCallPeer(userId);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, userDetail.id]);

  useEffect(() => {
    const initializePeer = () => {
      const peerInstance = new Peer(userDetail.id, {
        host: "localhost",
        port: 9999,
        path: "/peerjs",
      });

      peerInstance.on("signal", (data) => {
        console.log("SIGNAL", data);
      });

      peerInstance.on("open", (id) => {
        console.log("Peer connected with ID:", id);
        socket.emit("join-room", roomId, id);
      });

      peerInstance.on("call", (call) => {
        if (mediaStream) {
          call.answer(mediaStream);
          call.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
          });
        }
      });

      peerInstance.on("connection", (dataConnection) => {
        dataConnection.on("data", (data) => {
          console.log("Received data:", data);
        });

        dataConnection.send("Hello!");
      });

      setPeer(peerInstance);
      console.log("peerInstance", peerInstance);
    };

    if (!peer && mediaStream) {
      initializePeer();
    }

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [mediaStream, peer, userDetail.id, roomId]);

  const handleCallPeer = (peerId) => {
    console.log("peerId", peerId);
    if (peer && mediaStream) {
      const call = peer.call(peerId, mediaStream);
      if (!call) {
        console.log("call fail: peer.call()", peer.call());
        console.log("call fail: call", call);
        return;
      }
      call.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
      });
    } else {
      console.error("Cannot call peer. Peer or media stream is not available.");
    }
  };

  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        width: "70%",
        mt: 4,
      }}>
      <video
        muted={isMicMuted}
        ref={refVideo}
        autoPlay={isVideoPlaying}
        playsInline
        style={{ width: "60%" }}
      />
      {remoteStream && (
        <video
          ref={(video) => {
            if (video) {
              video.srcObject = remoteStream;
            }
          }}
          autoPlay
          playsInline
        />
      )}
      <button onClick={() => handleCallPeer("roomId")}>Call Peer</button>

      {screenShare && mediaStreamShared && (
        <video
          muted={isMicMuted}
          ref={refScreenShareVideo}
          autoPlay
          playsInline
        />
      )}
      {error && <div>Error: {error.message}</div>}
    </Box>
  );
}
