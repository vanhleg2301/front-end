import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import {
  Videocam as VideoIcon,
  Mic as MicIcon,
  CallEnd as PhoneIcon,
  ExpandLess as AngleUpIcon,
  ClosedCaption as ClosedCaptioningIcon,
  DesktopMac as DesktopIcon,
  MicOff as MicOffIcon,
} from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Badge } from "@mui/material";
import MessengerAndPeople from "./MessengerAndPeople";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const FooterContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  left: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "70px",
  background: "#4CAF50",
  zIndex: 1,
}));

const LeftItem = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const CenterItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

const RightItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

export default function FooterMeet({
  isAudio,
  isVideo,
  toggleAudio,
  toggleVideo,
  isPresenting,
  togglePresenting,
  stopScreenShare,
  screenShare,
  disconnectCall,
  toggleMessenger,
  togglePeople,
  peopleCount,
}) {
  return (
    <>
      <FooterContainer>
        <LeftItem>
          <Tooltip title='Meeting details'>
            <IconButton>
              <AngleUpIcon />
            </IconButton>
          </Tooltip>
        </LeftItem>
        <CenterItem>
          <Tooltip title='Toggle Audio' sx={{ mr: 1 }}>
            <IconButton
              onClick={toggleAudio}
              style={
                !isAudio ? { backgroundColor: "#d93025", color: "#fff" } : {}
              }>
              {isAudio ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title='Video'>
            <IconButton
              onClick={toggleVideo}
              style={
                !isVideo ? { backgroundColor: "#d93025", color: "#fff" } : {}
              }>
              {isVideo ? <VideoIcon /> : <VideocamOffIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title='Caption'>
            <IconButton onClick={disconnectCall}>
              <ClosedCaptioningIcon style={{ color: "#d93025" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Presentation'>
            <IconButton onClick={togglePresenting}>
              {isPresenting ? (
                <DesktopIcon style={{ color: "#d93025" }} />
              ) : (
                <DesktopIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title='Disconnect Call'>
            <IconButton onClick={disconnectCall}>
              <PhoneIcon style={{ color: "#d93025" }} />
            </IconButton>
          </Tooltip>
        </CenterItem>
        <RightItem sx={{ pr: 7 }}>
          <Tooltip title='People' sx={{ pr: 2 }}>
            <IconButton onClick={togglePeople}>
              <Badge badgeContent={(peopleCount = 4)} color='default'>
                <PeopleOutlineIcon style={{ color: "" }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title='Messenger'>
            <IconButton onClick={toggleMessenger}>
              <MessageIcon style={{ color: "" }} />
            </IconButton>
          </Tooltip>
        </RightItem>
      </FooterContainer>
    </>
  );
}
