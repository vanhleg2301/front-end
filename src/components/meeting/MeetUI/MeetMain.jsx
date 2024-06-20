import { Box } from "@mui/system";
import React from "react";
import Button from "@mui/material/Button";
import { Grid, Paper } from "@mui/material";

export default function MeetMain() {
  return (
    <Paper
      sx={{
        height: "95%",
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "red",
        padding: 2,
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: "40%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="text" color="primary">
          MeetMain
        </Button>
      </Paper>
      <Paper
        sx={{
          width: "40%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="text" color="primary">
          MeetMain
        </Button>
      </Paper>
      <Paper
        sx={{
          width: "40%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="text" color="primary">
          MeetMain
        </Button>
      </Paper>
      <Paper
        sx={{
          width: "40%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="text" color="primary">
          MeetMain
        </Button>
      </Paper>
    </Paper>
  );
}
