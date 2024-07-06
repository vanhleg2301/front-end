import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import FooterMeet from "./MeetUI/FooterMeet";
import MeetMain from "./MeetUI/MeetMain";
import MessengerAndPeople from "./MeetUI/MessengerAndPeople";
import Test from "./MeetUI/Test";

export default function MeetingCall() {
  const [isMessengerVisible, setIsMessengerVisible] = useState(false);
  const [isPeopleVisible, setIsPeopleVisible] = useState(false);

  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);
  const [isPresenting, setIsPresenting] = useState(false);

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

  const toggleAudio = () => {
    setIsAudio(!isAudio);
  };

  const toggleVideo = () => {
    setIsVideo(!isVideo);
  };

  const togglePresenting = () => {
    setIsPresenting(!isPresenting);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#303030",
        height: "100vh",
        width: "100%",
        position: "absolute", // Changed to relative
        margin: -1,
        display: "flex",
      }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          mt: 2,
          transition: "margin-right 0.3s ease-in-out", // Smooth transition
          marginRight: isMessengerVisible || isPeopleVisible ? "25%" : "0", // Adjust margin instead of transform
        }}>
        <Paper
          sx={{
            position: "relative",
            height: "82vh",
            width: "90%",
            boxShadow: 3,
            borderRadius: 2,
          }}>
          {/*<MeetMain />*/}
          <Test
            playVideo={isVideo}
            muteMic={!isAudio}
            screenShare={isPresenting}
          />
        </Paper>
      </Box>

      <FooterMeet
        isAudio={isAudio}
        isVideo={isVideo}
        isPresenting={isPresenting}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        togglePresenting={togglePresenting}
        disconnectCall={() => console.log("Call disconnected")}
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
  );
}
