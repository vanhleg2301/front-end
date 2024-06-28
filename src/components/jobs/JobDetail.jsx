import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScaleIcon from "@mui/icons-material/Scale";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CircularProgress from "@mui/material/CircularProgress";
import { RequestGet, RequestPost } from "../../util/request";
import JobSavedChild from "./JobSavedChild";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { formatSalary } from "../../util/formatHelpers";
import { APIAPPLY, APIUSER } from "../../util/apiEndpoint";
import { AuthContext } from "../../context/AuthProvider";

export default function JobDetail() {
  // Job detail
  const { userLogin } = useContext(AuthContext);
  const { jobId } = useParams();
  const [jobDetail, setJobDetail] = useState();
  const [isApplied, setIsApplied] = useState();

  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    let timer;
    if (alertMessage) {
      timer = setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [alertMessage]);

  // apply here
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog

  const handleApply = async () => {
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await RequestGet(`job/${jobId}`);
        
        setJobDetail(response);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching job detail:", error);
      }
    };

    const checkIfApplied = async () => {
      try {
        const appliedJobs = await RequestGet(`${APIAPPLY}/${userLogin.user._id}`);
        const applied = appliedJobs.some((job) => job.jobID?._id=== jobId);
        // console.log(appliedJobs.map((job) => job.jobID?.title))
        setIsApplied(applied);
        if(applied){
          setAlertMessage('You have successfully applied for this job.');
        }
        // console.log("applied:", applied);
        
      } catch (error) {
        console.error("Error checking if job is applied:", error);
      }
    };

  //sendmail to recruiter
    const sendMail = async () => {
      try {
        const response = await RequestPost(`${APIUSER}/sendmailJob`, {
          applicantId: userLogin.user._id,
          jobId: jobId 
        })
        if (response) {
          console.log("Cv: ", response.cv);
          console.log("Job: ", response.job);
          console.log("Email of Recruiter: ", response.recruiterEmail);
          alert(response.message);
          // window.location.href = "https://mail.google.com/mail/u/1/#inbox"
        }
        console.log("Response: ", response);
      } catch (error) {
        console.error("Error checking if send Email:", error);
      }
    }
    sendMail()
    checkIfApplied();
    fetchJobDetail();
  }, [jobId, userLogin.user._id]);

  



  // Company in jobDetail


  if (!jobDetail) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Container>
    {alertMessage && (
      <Alert
        variant="outlined"
        severity="success"
        sx={{ position: "fixed", bottom: "10px", left: "10px" }}>
        {alertMessage}
      </Alert>
    )}
      <Grid container spacing={0} sx={{ mb: 5 }}>
        {/*left*/}
        <Grid item xs={12} md={8}>
          <Box sx={{ width: "100%" }}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography>{jobDetail.title}</Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <Grid container spacing={0} alignItems={"center"}>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                      <AttachMoneyIcon />
                      <Typography variant="body1">Salary</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {formatSalary(jobDetail.minSalary, jobDetail.maxSalary)}
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                      <LocationSearchingIcon />
                      <Typography variant="body1">Location</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {jobDetail.location.comune},{" "}
                        {jobDetail.location.province}
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                      <HourglassEmptyIcon />
                      <Typography variant="body1">Exp</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {jobDetail.experience} years
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
                      deadline for submission:
                      <span style={{ color: "black" }}>
                        {new Date(jobDetail.deadline).toLocaleDateString()}
                      </span>
                    </Typography>
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={9}>
                {isApplied ? (
                  <Button
                    sx={{ width: "90%", mr: 1 }}
                    color="primary"
                    variant="contained"
                    disabled
                  >
                    Applied
                  </Button>
                ) : (
                  <Button
                    sx={{ width: "90%", mr: 1 }}
                    color="primary"
                    variant="contained"
                    onClick={handleApply}
                  >
                    Apply
                  </Button>
                )}
                </Grid>
                <Grid item md={3}>
                  <Button
                    sx={{ width: "80%", mr: 1 }}
                    color="primary"
                    variant="outlined"
                    startIcon={<FavoriteBorderIcon />}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Grid>
        {/*right*/}
        <Grid item xs={12} md={4}>
          <Box sx={{ width: "100%", ml: 6 }}>
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
                    }}>
                    CompanyCompanyCompanyCompanyCompanyCompany
                    CompanyCompanyCompanyCompanyCompanyCompany
                  </Typography>
                </Grid>

                <Grid item md={12}>
                  <CardContent>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start">
                      <Box display="flex" alignItems="center" mb={2}>
                        <IconButton>
                          <ScaleIcon />
                        </IconButton>
                        <Box ml={1}>
                          <Typography variant="body1">Scale</Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}>
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
                            }}>
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
        <Grid container spacing={0}>
          {/*left description*/}
          <Grid item xs={12} md={8}>
            <Box sx={{ width: "100%" }}>
              <Card sx={{ width: "100%", p: 3, borderTop: "1px solid gray" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Job description
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    {jobDetail.description.JobDescription}
                    <br />
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Candidate Requirements
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    {jobDetail.description.CandidateRequirements}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Benefit
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    {jobDetail.description.Benefit}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Location working
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    - Hà Nội: PHÒNG KHÁM ĐA KHOA MIRAI: Tầng 2, Tòa 901B, Chung
                    cư Starlake, Xuân Tảo, Bắc Từ Liêm
                    <br />
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Working time
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    - Thứ 2 - Thứ 7 (từ 08:00 đến 17:00)
                    <br />
                    - Nghỉ 2 thứ 7 trong tháng
                    <br />
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    How to apply
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    - Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay
                    dưới đây.
                    <br />
                    - Hạn nộp hồ sơ: 04/07/2024
                    <br />
                  </Typography>

                  <Grid container justifyContent="left">
                  {isApplied ? (
                    <Button
                      sx={{mt: 2 }}
                      color="primary"
                      variant="contained"
                      disabled
                    >
                      Applied
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={handleApply}>
                      Apply now
                    </Button>
                  )}
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, ml: 3 }}>
                      <FavoriteIcon />
                      Save
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          {/*right more information*/}
          <Grid item xs={12} md={4}>
            <Box sx={{ width: "100%", mt: 5, ml: 6 }}>
              <Card sx={{ p: 3, borderTop: "1px solid gray" }}>
                <Grid container spacing={2}>
                  <Grid item md={12} display="flex">
                    <Typography
                      variant="h6"
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
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start">
                        <Box display="flex" alignItems="center" mb={2}>
                          <IconButton>
                            <ScaleIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">
                              Job position
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}>
                              Job position
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                          <IconButton>
                            <LocationSearchingIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">Location</Typography>
                            <Typography
                              title="Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh"
                              variant="body2"
                              style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "20%", // Adjust this value as needed
                              }}>
                              Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi,
                              Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi
                              Minh, Ha Noi, Ho Chi Minh
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                          <IconButton>
                            <LocationSearchingIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">Exp</Typography>
                            <Typography
                              variant="body2"
                              style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}>
                              Exp
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                          <IconButton>
                            <LocationSearchingIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">
                              Amount position
                            </Typography>
                            <Typography
                              variant="body2"
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
                        <Box display="flex" alignItems="center">
                          <IconButton>
                            <LocationSearchingIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">Gender</Typography>
                            <Typography
                              variant="body2"
                              style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}>
                              None
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
        </Grid> 
      </Grid>
      <JobSavedChild open={openDialog} handleClose={handleCloseDialog} setIsApplied={setIsApplied}/>
    </Container>
  );
}
