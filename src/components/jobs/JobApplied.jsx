import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, Grid, IconButton } from "@mui/material";
import { Description } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthProvider";
import { RequestGet } from "../../util/request";
import { APIAPPLY } from "../../util/apiEndpoint";
import { useNavigate, Link } from "react-router-dom";

export default function JobApplied() {
  const { userLogin } = useContext(AuthContext);
  const [jobApplied, setJobApplied] = useState([]);
  const nagivation = useNavigate();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await RequestGet(`${APIAPPLY}/${userLogin.user._id}`);
        setJobApplied(
          response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
        console.log("response:", response);
      } catch (error) {
        console.error("Error fetching job applied:", error);
      }
    };
    fetchJobDetail();
  }, [userLogin.user._id]);

  const handleOpenPdf = (fileURL) => {
    console.log("decodedURL:", fileURL);
    window.open(fileURL, '_blank');
  };
  

  return (
    <Container maxWidth={"lg"}>
      <Box mb={3} mt={12}>
        <Typography variant="h5" component="h2">
          {jobApplied?.length} Job Applied
        </Typography>
      </Box>
      {jobApplied?.map((job, index) => (
        <Card variant="outlined" key={index} sx={{ mb: 3 }}>
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
                  }}>
                  <img
                    src="your_image_url"
                    alt="Job Logo"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Box>
              </Grid>
              <Grid item md={7}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={userLogin ? `/jobs/${job.jobID._id}` : "/login"}
                    sx={{ textDecoration: "none", color: "black" }}>
                    {job.jobID?.title || "Title not available"}
                  </Typography>
                  <Typography color="textSecondary">
                    Company:{" "}
                    {job.jobID?.recruitersID || "Company not available"}
                  </Typography>
                  <Typography color="textSecondary">
                    Applied on: {new Date(job.createdAt).toLocaleDateString()} -{" "}
                    {new Date(job.createdAt).toLocaleTimeString()}
                  </Typography>
                  <Typography color="textSecondary">
                    {job.textDes}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={2}>
                <Box>12 - 13 m</Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    height: "100%",
                  }}>
                  <IconButton>
                    <Button
                      variant="contained"
                      startIcon={<Description />}
                      onClick={() => handleOpenPdf(job.fileURL)}>
                      View CV
                    </Button>
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
