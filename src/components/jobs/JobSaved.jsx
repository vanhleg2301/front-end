import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, Grid, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import JobSavedChild from "./JobSavedChild";

export default function JobSaved() {
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog

  const handleApply = async () => {
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };
  return (
    <Container maxWidth={"lg"}>
      <Box mb={3}>
        <Typography variant="h5" component="h2">
          Job Saved
        </Typography>
      </Box>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80%",
                  height: "100%",
                }}
              >
                <img
                  src="your_image_url"
                  alt="Job Logo"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item md={7}>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h5" component="h2">
                  Title
                </Typography>
                <Typography color="textSecondary">
                  Company: CÔNG TY TNHH VI MOREA
                </Typography>
                <Typography color="textSecondary">
                  Save time: 03/06/2024 - 22:55
                </Typography>
                <Box
                  sx={{
                    marginTop: 1,
                    width: "12%",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    backgroundColor: "#f4f5f5",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography color="textSecondary">Ha Noi</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  height: "100%",
                }}
              >
                <IconButton variant="contained" onClick={handleApply}>
                  <Typography>Apply</Typography>
                </IconButton>
                <IconButton sx={{ bgcolor: "#4caf50" }}>
                  <Delete />
                  <Typography>Un save</Typography>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <JobSavedChild open={openDialog} handleClose={handleCloseDialog} />
    </Container>
  );
}
