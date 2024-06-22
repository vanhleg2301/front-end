import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, Grid, IconButton, Link } from "@mui/material";
import { Message, Description } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthProvider";
import { RequestGet } from "../../util/request";
import { APIAPPLY } from "../../util/apiEndpoint";

export default function JobApplied() {
  const {userLogin} = useContext(AuthContext);
  const [jobApplied, setJobApplied] = useState();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await RequestGet(`${APIAPPLY}/${userLogin.user._id}`);
        setJobApplied(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching job applied:", error);
      }
    };
    fetchJobDetail();
  }, []);
  return (
    <Container maxWidth={"lg"}>
      <Box mb={3}>
        <Typography variant="h5" component="h2">
          {jobApplied?.length} Job Applied
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
                <Box>
                  <Typography color="textSecondary">
                    Cv applied <Link>Cv</Link>
                  </Typography>
                </Box>
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
                }}
              >
                <IconButton>
                  <Button variant="contained" startIcon={<Message />}>
                    Message
                  </Button>
                </IconButton>
                <IconButton>
                  <Button variant="contained" startIcon={<Description />}>
                    View CV
                  </Button>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
