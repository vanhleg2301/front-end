import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { Chance } from "chance";

export default function Test({ playVideo, muteMic }) {
  const chance = new Chance();
  const [userDetail] = useState({
    id: chance.guid(),
    name: chance.name(),
  });
  const refVideo = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);

  useEffect(() => {
    let stream;

    const getMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);
        refVideo.current.srcObject = stream;
        setIsVideoPlaying(true);
      } catch (err) {
        console.error("Error accessing media devices.", err);
        // Xử lý thông báo lỗi khi không thể truy cập camera/microphone
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
    if (refVideo.current && mediaStream) {
      refVideo.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  useEffect(() => {
    if (mediaStream) {
      const tracks = mediaStream.getAudioTracks();
      tracks.forEach((track) => {
        track.enabled = !muteMic;
        setIsMicMuted(muteMic);
      });
    }
  }, [muteMic, mediaStream]);

  useEffect(() => {
    if (mediaStream) {
      const tracks = mediaStream.getVideoTracks();
      tracks.forEach((track) => {
        track.enabled = playVideo;
        setIsVideoPlaying(playVideo);
      });
    }
  }, [playVideo, mediaStream]);

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
    </Box>
  );
}
