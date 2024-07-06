import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/socket";
import usePeer from "../../hook/usePeer";
import useMediaStream from "../../hook/useMediaStream";
import Player from "../MeetingComponent/Player/Player";
import usePlayer from "../../hook/usePlayer";
import styles from "./Room.module.css";
import { useParams } from "react-router-dom";
import Bottom from "../MeetingComponent/Bottom/Bottom";
import { cloneDeep } from "lodash";
import CopySection from "../MeetingComponent/CopySection/CopySection";
import FooterMeet from "../MeetingComponent/Bottom/FooterMeet";
import MessengerAndPeople from "../MeetingComponent/Bottom/MessengerAndPeople";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

const Room = () => {
  const socket = useSocket();
  const { roomId } = useParams();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer);

  const [users, setUsers] = useState([]);

  const [isMessengerVisible, setIsMessengerVisible] = useState(false);
  const [isPeopleVisible, setIsPeopleVisible] = useState(false);

  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isCopySectionVisible, setIsCopySectionVisible] = useState(true);

  const toggleMessenger = () => {
    setIsMessengerVisible(!isMessengerVisible);
    if (isPeopleVisible) {
      setIsPeopleVisible(false);
    }
  };

  const togglePeople = () => {
    setIsPeopleVisible(!isPeopleVisible);
    if (isMessengerVisible) {
      setIsMessengerVisible(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopySectionVisible(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`Some user connected in room with userId ${newUser}`);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayers, socket, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId) => {
      console.log(`user ${userId} is leaving the room`);
      users[userId]?.close();
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    };

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);

    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [players, setPlayers, socket, users]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);

  return (
    <>
      <Box sx={{ backgroundColor: "#303030", margin: -1 }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            transition: "margin-right 0.3s ease-in-out", // Smooth transition
            marginRight: isMessengerVisible || isPeopleVisible ? "25%" : "0", // Adjust margin instead of transform
          }}>
          <Box
            sx={{
              position: "relative",
              backgroundColor: "#303030",
              width: "90%",
              mt: 2,
              boxShadow: 3,
              borderRadius: 2,
            }}>
            <Box className={styles.activePlayerContainer}>
              {playerHighlighted && (
                <Player
                  url={playerHighlighted.url}
                  muted={playerHighlighted.muted}
                  playing={playerHighlighted.playing}
                  isActive
                />
              )}
            </Box>

            <Box className={styles.inActivePlayerContainer}>
              {Object.keys(nonHighlightedPlayers).map((playerId) => {
                const { url, muted, playing } = nonHighlightedPlayers[playerId];
                return (
                  <Player
                    key={playerId}
                    url={url}
                    muted={muted}
                    playing={playing}
                    isActive={false}
                  />
                );
              })}
            </Box>
            {isCopySectionVisible && <CopySection roomId={roomId} />}
          </Box>
        </Box>
        <FooterMeet
          muted={playerHighlighted?.muted}
          playing={playerHighlighted?.playing}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          leaveRoom={leaveRoom}
          toggleMessenger={toggleMessenger}
          togglePeople={togglePeople}
          peopleCount={4}
        />
        <MessengerAndPeople
          mess={isMessengerVisible}
          people={isPeopleVisible}
          close={() => {
            setIsMessengerVisible(false);
            setIsPeopleVisible(false);
          }}
        />
      </Box>
    </>
  );
};

export default Room;
