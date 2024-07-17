import React, { useState } from "react";
import { cloneDeep } from "lodash";
import { useSocket } from "../context/socket";
import { useNavigate } from "react-router-dom";

const usePlayer = (myId, roomId, peer) => {
  const socket = useSocket();
  const [players, setPlayers] = useState({});
  const playersCopy = cloneDeep(players);
  const navigate = useNavigate();

  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];

  const nonHighlightedPlayers = playersCopy;

  const toggleAudio = () => {
    console.log("I toggled my audio");
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].muted = !copy[myId].muted;
      return { ...copy };
    });
    socket.emit("user-toggle-audio", myId, roomId);
  };

  const toggleVideo = () => {
    console.log("I toggled my video");
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].playing = !copy[myId].playing;
      return { ...copy };
    });
    socket.emit("user-toggle-video", myId, roomId);
  };

  const startSharing = (screenStream) => {
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        ...prev[myId],
        url: screenStream,
        sharing: true,
      },
    }));

    // Inform other users that you've started sharing
    socket.emit("user-start-sharing", { roomId, userId: myId });

    // Replace the current track with the screen sharing track
    const videoTrack = screenStream.getVideoTracks()[0];
    Object.values(peer.connections).forEach((connections) => {
      connections.forEach((connection) => {
        const sender = connection.peerConnection
          .getSenders()
          .find((s) => s.track.kind === "video");
        if (sender) {
          sender.replaceTrack(videoTrack);
        }
      });
    });

    // Listen for the end of screen sharing
    videoTrack.onended = () => {
      stopSharing();
    };
  };

  const stopSharing = (stream) => {
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        ...prev[myId],
        url: stream, // Revert to the original camera stream
        sharing: false,
      },
    }));

    // Inform other users that you've stopped sharing
    socket.emit("user-stop-sharing", { roomId, userId: myId });

    // Replace the screen sharing track with the original camera track
    const videoTrack = stream.getVideoTracks()[0];
    Object.values(peer.connections).forEach((connections) => {
      connections.forEach((connection) => {
        const sender = connection.peerConnection
          .getSenders()
          .find((s) => s.track.kind === "video");
        if (sender) {
          sender.replaceTrack(videoTrack);
        }
      });
    });
  };

  const leaveRoom = () => {
    socket.emit("user-leave", myId, roomId);
    console.log("leaving room", roomId);
    peer?.disconnect();
    navigate("/");
  };

  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    startSharing,
    stopSharing,
    leaveRoom,
  };
};

export default usePlayer;
