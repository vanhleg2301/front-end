import React, { useEffect, useState } from "react";
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

export default function HomeMeeting() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createAndJoin = () => {
    const roomId = generateRoomId();
    navigate(`${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) navigate(`${roomId}`);
    else {
      alert("Please provide a valid room id");
    }
  };

  return (
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
  );
}
