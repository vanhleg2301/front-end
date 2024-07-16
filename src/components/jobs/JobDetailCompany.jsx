import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ScaleIcon from "@mui/icons-material/Scale";

export default function JobDetailCompany({jobDetail}) {
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
                    src='https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/iposvn-61a6eab341dba.jpg'
                    alt='Company Logo'
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Grid>
              <Grid item md={8} display='flex'>
                <Typography
                  title='CompanyCompanyCompanyCompanyCompanyCompany
                        CompanyCompanyCompanyCompanyCompanyCompany'
                  variant='h6'
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                  CompanyCompanyCompanyCompanyCompanyCompany
                  CompanyCompanyCompanyCompanyCompanyCompany
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
                          100 - 200
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
                            maxWidth: "20%", // Adjust this value as needed
                          }}>
                          Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho
                          Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha
                          Noi, Ho Chi Minh
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Grid>
              <Grid item md={12} textAlign={"center"}>
                <Button>View company</Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>
    </>
  );
}
