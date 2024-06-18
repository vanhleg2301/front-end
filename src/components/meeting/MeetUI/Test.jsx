import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { Chance } from "chance";

const chance = new Chance();

export default function Test({ playVideo, muteMic }) {
  const [userDetail] = useState({
    id: chance.guid(),
    name: chance.name(),
  });
  const refVideo = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [error, setError] = useState(null); // State for handling errors

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

  useEffect(() => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !muteMic;
        setIsMicMuted(muteMic);
        console.log("muteMic", muteMic);
      });
    }
  }, [muteMic]);

  useEffect(() => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = playVideo;
        setIsVideoPlaying(playVideo);
        console.log("playVideo", playVideo);
      });
    }
  }, [playVideo]);

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
