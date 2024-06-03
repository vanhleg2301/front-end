import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Act from "../action/Act";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Image } from "@mui/icons-material";
import ScaleIcon from "@mui/icons-material/Scale";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function JobDetail() {
  return (
    <Container>
      <Grid container spacing={0}>
        {/*left*/}
        <Grid item xs={12} md={8}>
          <Box sx={{ width: "100%" }}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography>
                  Nhân Viên Kiến Trúc, Tư Vấn, Thiết Kế - Thu Nhập Từ 10-30
                  Triệu
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <Grid container spacing={0} alignItems={"center"}>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <AttachMoneyIcon />
                      <Typography variant="body1">Salary</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        12m
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <LocationSearchingIcon />
                      <Typography variant="body1">Location</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Ha Noi, Ho Chi Minh
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <HourglassEmptyIcon />
                      <Typography variant="body1">Exp</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        1-2 year
                      </Typography>
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>

              <Grid container>
                <Grid item xs={12} md={12} sx={{ textAlign: "end" }}>
                  <IconButton>
                    <AccessTimeIcon />
                    <Typography>
                      Hạn nộp:
                      <span style={{ color: "black" }}>12-10-2002</span>
                    </Typography>
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={9}>
                  <Button
                    sx={{ width: "90%", mr: 1 }}
                    color="secondary"
                    variant="contained"
                  >
                    Apply
                  </Button>
                </Grid>
                <Grid item md={3}>
                  <Button
                    sx={{ width: "80%", mr: 1 }}
                    color="secondary"
                    variant="outlined"
                    startIcon={<FavoriteBorderIcon />}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={1}></Grid>
        {/*right*/}
        <Grid item xs={12} md={3}>
          <Box sx={{ width: "100%" }}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Box>
                    <img
                      src="https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/iposvn-61a6eab341dba.jpg"
                      alt="Company Logo"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                </Grid>
                <Grid item md={8} display="flex">
                  <Typography
                    title="CompanyCompanyCompanyCompanyCompanyCompany
                            CompanyCompanyCompanyCompanyCompanyCompany"
                    variant="h6"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    CompanyCompanyCompanyCompanyCompanyCompany
                    CompanyCompanyCompanyCompanyCompanyCompany
                  </Typography>
                </Grid>

                <Grid item md={12}>
                  <CardContent>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Box display="flex" alignItems="center" mb={2}>
                        <IconButton>
                          <ScaleIcon />
                        </IconButton>
                        <Box ml={1}>
                          <Typography variant="body1">Scale</Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            100 - 200
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <IconButton>
                          <LocationSearchingIcon />
                        </IconButton>
                        <Box ml={1}>
                          <Typography variant="body1">Location:</Typography>
                          <Typography
                            title="Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh"
                            variant="body2"
                            style={{
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "20%", // Adjust this value as needed
                            }}
                          >
                            Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho
                            Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh,
                            Ha Noi, Ho Chi Minh
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
      </Grid>
    </Container>
  );
}
