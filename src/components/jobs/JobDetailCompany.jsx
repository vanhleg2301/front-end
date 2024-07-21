import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ScaleIcon from "@mui/icons-material/Scale";
import { Link, useParams } from "react-router-dom";
import { RequestGet } from "../../util/request";

export default function JobDetailCompany({ jobDetail }) {
  const { jobId } = useParams();
  const [company, setCompany] = React.useState([]);
  useEffect(() => {
    const getCompanyId = async () => {
      try {
        const companyId = await RequestGet(`job/com/${jobId}`);
        setCompany(companyId);
      } catch (error) {
        console.error("Error companyId:", error);
      }
    };

    getCompanyId();
  }, [jobDetail._id]);

  
  return (
    <>
      {/*right*/}
      <Grid item xs={12} md={4}>
        <Box sx={{ width: "100%", ml: 6 }}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <Box>
                  <img
                    src={company?.logo}
                    alt='Company Logo'
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Grid>
              <Grid item md={8} display='flex'>
                <Typography
                  title={company?.companyName}
                  variant='h6'
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                  {company?.companyName}
                </Typography>
              </Grid>

              <Grid item md={12}>
                <CardContent>
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='flex-start'>
                    <Box display='flex' alignItems='center' mb={2}>
                      <IconButton>
                        <ScaleIcon />
                      </IconButton>
                      <Box ml={1}>
                        <Typography variant='body1'>Scale</Typography>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>
                          {company?.numberOfEmployees}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center'>
                      <IconButton>
                        <LocationSearchingIcon />
                      </IconButton>
                      <Box ml={1}>
                        <Typography variant='body1'>Location:</Typography>
                        <Typography
                          title='Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh'
                          variant='body2'
                          style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "80%", // Adjust this value as needed
                          }}>
                         {company?.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Grid>
              <Grid item md={12} textAlign={"center"}>
                <Button component={Link} to={`/companies/${company?._id}`}>View company</Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>
    </>
  );
}
