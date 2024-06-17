import React, { useState } from "react";
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { Link, useNavigate } from "react-router-dom";
import shortid from "shortid";
import { ENDPOINT } from "../../util/constants";

export default function HomeMeeting() {
  const [meetingCode, setMeetingCode] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setMeetingCode(event.target.value);
  };

  const handleJoin = async () => {
    console.log("joined with: ", meetingCode);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const startCall = () => {
    const uid = shortid.generate();
    navigate(`/meeting/${uid}#init`);
    console.log("From shortid: ", uid);
  };

  const apiUrl = ENDPOINT;
  const [roomCode, setRoomCode] = useState('');

  const onCreateRoom = () => {
      axios.post(`${apiUrl}/create-room`).then((res) => {
        navigate(`/meeting/${res.data.code}`);
      });
  }

  
  const onJoinRoom = () => {
          axios.get(`${apiUrl}/get-room/${roomCode}`).then((res) => {
            navigate(`/meeting/${res.data.code}`);
      }).catch(err => {
          console.log(err);
      });
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Paper elevation={3} style={{ padding: "5rem" }}>
        <Grid container spacing={5}>
          {/* Thông tin giới thiệu */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Welcome to AceInterview
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Connect Applicant with Recruiter
              </Typography>
            </Box>
          </Grid>

          {/* Nút chức năng */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CameraEnhanceIcon />}
                  style={{ marginBottom: "1rem", width: "100%" }}
                  // onClick={handleMenuOpen}
                  onClick={onCreateRoom}
                >
                  New Meeting
                </Button>
                {/*<Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={startCall}>Start Instant Meeting</MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    Schedule in Google Calendar
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    Create Meeting for Later
                  </MenuItem>
                </Menu>*/}
                
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  variant="outlined"
                  placeholder="Enter meeting code"
                  fullWidth
                  // value={meetingCode}
                  // onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyboardIcon />
                      </InputAdornment>
                    ),
                  }}
                  style={{ marginBottom: "1rem" }}
                  onChange={(input) => setRoomCode(input.target.value)}
                  name='room-code'
                />
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ width: "100%" }}
                  // disabled={!meetingCode}
                  // onClick={handleJoin}
                  onClick={onJoinRoom}
                >
                  Join
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
