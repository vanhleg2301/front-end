import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ScaleIcon from "@mui/icons-material/Scale";

export default function JobDetailMoreInfor({jobDetail}) {
  return (
    <>
      {/*right more information*/}
      <Grid item xs={12} md={4}>
        <Box sx={{ width: "100%", mt: 5, ml: 6 }}>
          <Card sx={{ p: 3, borderTop: "1px solid gray" }}>
            <Grid container spacing={2}>
              <Grid item md={12} display='flex'>
                <Typography
                  variant='h6'
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                  More information
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
                        <Typography variant='body1'>Type of Work</Typography>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>
                          {jobDetail.typeOfWork ? "Full-time" : "Part-time"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center' mb={2}>
                      <IconButton>
                        <LocationSearchingIcon />
                      </IconButton>
                      <Box ml={1}>
                        <Typography variant='body1'>Location</Typography>
                        <Typography
                          title={jobDetail.location.province}
                          variant='body2'
                          style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            
                          }}>
                          {jobDetail.location.address},
                          {jobDetail.location.district}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center' mb={2}>
                      <IconButton>
                        <LocationSearchingIcon />
                      </IconButton>
                      <Box ml={1}>
                        <Typography variant='body1'>Exp</Typography>
                        <Typography
                          variant='body2'
                          style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}>
                          {jobDetail.experience} Year
                        </Typography>
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center' mb={2}>
                      <IconButton>
                        <LocationSearchingIcon />
                      </IconButton>
                      <Box ml={1}>
                        <Typography variant='body1'>Amount position</Typography>
                        <Typography
                          variant='body2'
                          style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}>
                          1
                        </Typography>
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center' mb={2}>
                      <IconButton>
                        <LocationSearchingIcon />
                      </IconButton>
                      <Box ml={1}>
                        <Typography variant='body1'>Gender</Typography>
                        <Typography
                          variant='body2'
                          style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}>
                          {jobDetail.gender ? "Male" : 'Female'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center'>
                      <IconButton>
                        <LocationSearchingIcon />
                      </IconButton>
                      <Box ml={1}>
                        <Typography variant='body1'>Industry</Typography>
                        <Typography
                          variant='body2'
                          style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}>
                          {jobDetail.industry}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>
    </>
  );
}
