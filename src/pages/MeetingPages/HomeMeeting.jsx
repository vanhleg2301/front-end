import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { useNavigate } from "react-router-dom";
import { generateRoomId } from "../../util/formatHelpers";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";

export default function HomeMeeting() {
  const { userLogin } = useContext(AuthContext);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createAndJoin = () => {
    if (!userLogin || Object.keys(userLogin).length === 0) {
      toast.info("Please login to create a new meeting", {
        autoClose: 2000
      });
    
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
      return;
    }

    const roomId = generateRoomId();
    navigate(`${roomId}`);
  };

  const checkRoomIdExists = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:9999/room`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data?.room !== undefined;
    } catch (error) {
      console.error("Error checking room ID:", error);
      return false;
    }
  };

  const joinRoom = async () => {
    if (!userLogin || Object.keys(userLogin).length === 0) {
      toast.info("Please login to create a new meeting", {
        autoClose: 2000 
      });
    
      setTimeout(() => {
        navigate("/login");
      }, 2000); 
      
      return;
    }
    if (roomId) {
      const exists = await checkRoomIdExists(roomId);
      if (exists) {
        navigate(`${roomId}`);
      } else {
        toast.info("import code recruiter send to you to join meeting");
      }
    } else {
      toast.info("Please provide a valid room ID");
    }
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth='lg' style={{ marginTop: "2rem" }}>
        <Paper elevation={3} style={{ padding: "5rem" }}>
          <Grid container spacing={5}>
            {/* Thông tin giới thiệu */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant='h4' gutterBottom>
                  Welcome to AceInterview
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                  Connect Applicant with Recruiter
                </Typography>
              </Box>
            </Grid>

            {/* Nút chức năng */}
            <Grid item xs={12} md={6}>
              <Box display='flex' flexDirection='column' alignItems='center'>
                <Box>
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<CameraEnhanceIcon />}
                    style={{ marginBottom: "1rem", width: "100%" }}
                    onClick={createAndJoin}>
                    New Meeting
                  </Button>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    variant='outlined'
                    placeholder='Enter meeting code'
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <KeyboardIcon />
                        </InputAdornment>
                      ),
                    }}
                    style={{ marginBottom: "1rem" }}
                    value={roomId}
                    onChange={(e) => setRoomId(e?.target?.value)}
                    name='room-code'
                  />
                  <Button
                    variant='outlined'
                    color='primary'
                    style={{ width: "100%" }}
                    onClick={joinRoom}>
                    Join
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
