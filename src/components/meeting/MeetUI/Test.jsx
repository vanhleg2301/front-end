import React, { useContext, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import Peer from "peerjs";
import { AuthContext } from "../../../context/AuthProvider";

const chance = new Chance();

export default function Test({ playVideo, muteMic, screenShare }) {
  const [userDetail] = useState({});

  const { userLogin } = useContext(AuthContext);
  const refVideo = useRef(null);
  const refScreenShareVideo = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaStreamShared, setMediaStreamShared] = useState(null);
  const [peer, setPeer] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [error, setError] = useState(null); // State for handling errors
  const [originalVideoTrack, setOriginalVideoTrack] = useState(null); // Add this at the beginning of your component

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
            facingMode: "user", // Use "environment" for the back camera
          },
        });
        setMediaStream(stream);
        refVideo.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError(err); // Set error state for UI feedback
      }
    };

    getMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Mic
  useEffect(() => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !muteMic;
        setIsMicMuted(muteMic);
        // console.log("muteMic", muteMic);
      });
    }
  }, [muteMic, mediaStream]);

  // Camera
  useEffect(() => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = playVideo;
        setIsVideoPlaying(playVideo);
        // console.log("playVideo", playVideo);
      });
    }
  }, [playVideo, mediaStream]);

  // Screen share
  useEffect(() => {
    if (refScreenShareVideo.current && mediaStreamShared) {
      refScreenShareVideo.current.srcObject = mediaStreamShared;
    }
  }, [mediaStreamShared]);

  // Manage screen sharing
  useEffect(() => {
    if (screenShare) {
      shareScreen();
    } else {
      stopScreenShare();
    }
  }, [screenShare]);

  // ShareScreen function
  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setMediaStreamShared(screenStream);
      refScreenShareVideo.current.srcObject = screenStream;
      const screenStreamTrack = screenStream.getVideoTracks()[0];
      setOriginalVideoTrack(mediaStreamShared.getVideoTracks()[0]);
      mediaStreamShared.removeTrack(mediaStreamShared.getVideoTracks()[0]);
      mediaStreamShared.addTrack(screenStreamTrack);
    } catch (err) {
      console.error("Error sharing screen", err);
    }
  };
  // Stop screen sharing
  const stopScreenShare = () => {
    if (originalVideoTrack) {
      // Remove the screen stream track
      const screenStreamTrack = mediaStreamShared.getVideoTracks()[0];
      mediaStreamShared.removeTrack(screenStreamTrack);
      // Add back the original video track
      mediaStreamShared.addTrack(originalVideoTrack);
      setMediaStreamShared(mediaStreamShared);
      setOriginalVideoTrack(null);
    }
  };

  // peerJs
  useEffect(() => {
    const initializePeer = () => {
      const peerInstance = new Peer();
      console.log("peerInstance", peerInstance);

      peerInstance.on("open", (id) => {
        console.log("Peer connected with ID:", id);
      });

      peerInstance.on("call", (call) => {
        if (mediaStream) {
          call.answer(mediaStream);
          call.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
          });
        }
      });

      // Handle data connection
      peerInstance.on("connection", (dataConnection) => {
        dataConnection.on("data", (data) => {
          console.log("Received data:", data);
        });

        // Send data
        dataConnection.send("Hello!");
      });

      setPeer(peerInstance);
    };

    if (!peer) {
      initializePeer();
    }

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [mediaStream, peer]);

  const handleCallPeer = (peerId) => {
    console.log("peerId: ", peerId);
    if (!peerId) {
      console.error("Peer ID is not available");
      return;
    }

    console.log("peer: ", peer);
    if (!peer) {
      console.error("Peer is not available");
      return;
    }

    console.log("mediaStream: ", mediaStream);
    if (!mediaStream) {
      console.error("Media stream is not available");
      return;
    }

    const call = peer.call(peerId, mediaStream);
    console.log("call: ", call);
    if (!call) {
      console.error("Failed to create call");
      return;
    }

    call.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream);
    });
  };

  // useEffect(() => {
  //   const socket = io("http://localhost:9999"); // Replace with your server URL
  //   socket.emit("join-room", "room-id"); // Replace with your room ID

  //   socket.on("user-connected", (userId) => {
  //     handleCallPeer(userId);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [handleCallPeer]);

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
      <button onClick={() => handleCallPeer(userLogin.user._id)}>
        Call Peer
      </button>

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
