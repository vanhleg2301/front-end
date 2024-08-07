import {
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
import { useNavigate, useParams } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CircularProgress from "@mui/material/CircularProgress";
import { RequestGet } from "../../util/request";
import JobSavedChild from "./JobSavedChild";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { formatDate, formatSalary } from "../../util/formatHelpers";
import { APIAPPLY } from "../../util/apiEndpoint";
import { AuthContext } from "../../context/AuthProvider";
import JobDetailCompany from "./JobDetailCompany";
import JobDetailMoreInfor from "./JobDetailMoreInfor";
import LoginDialog from "../login/LoginDialog";
import { toast } from "react-toastify";

export default function JobDetail() {
  // Job detail
  const { userLogin } = useContext(AuthContext);
  const { jobId } = useParams();
  const [jobDetail, setJobDetail] = useState();
  const [isApplied, setIsApplied] = useState();
  const navigate = useNavigate();

  // apply here
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog

  // login
  const [openLogin, setOpenLogin] = useState(false);

  const handleApply = async () => {
    if (!userLogin || Object.keys(userLogin).length === 0) {
      toast.info("you must login before apply this");
      setOpenLogin(true);
    } else {
      setOpenDialog(true); // Open the dialog
    }
    
  };

  const handleCloseLogin = () => {
    setOpenLogin(false); // Close the dialog login
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await RequestGet(`job/${jobId}`);
        setJobDetail(response);
      } catch (error) {
        console.error("Error fetching job detail:", error);
      }
    };

    const checkIfApplied = async () => {
      if (!userLogin || Object.keys(userLogin).length === 0) return;
      try {
        const appliedJobs = await RequestGet(
          `${APIAPPLY}/${userLogin?.user?._id}`
        );
        const applied = appliedJobs.some((job) => job.jobID._id === jobId);

        setIsApplied(applied);
      } catch (error) {
        console.error("Error checking if job is applied:", error);
      }
    };

    fetchJobDetail();
    checkIfApplied();
  }, [jobId, userLogin]);

  const formatJobDescription = (description) => {
    return description.split("-").map(
      (item, index) =>
        item && (
          <React.Fragment key={index}>
            <span>&#8211; {item.trim()}</span>
            <br />
          </React.Fragment>
        )
    );
  };

  if (!jobDetail) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Grid container spacing={0} sx={{ mb: 5, mt: -5 }}>
        {/*left*/}
        <Grid item xs={12} md={8}>
          <Box sx={{ width: "100%" }}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography>{jobDetail.title}</Typography>
              </Box>
              <Box display='flex' justifyContent='center'>
                <Grid container spacing={0} alignItems={"center"}>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                      <AttachMoneyIcon />
                      <Typography variant='body1'>Salary</Typography>
                      <Typography variant='body2' sx={{ fontWeight: "bold" }}>
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
                      <Typography variant='body1'>Location</Typography>
                      <Typography variant='body2' sx={{ fontWeight: "bold" }}>
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
                      <Typography variant='body1'>Exp</Typography>
                      <Typography variant='body2' sx={{ fontWeight: "bold" }}>
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
                      color='primary'
                      variant='contained'
                      disabled>
                      Applied
                    </Button>
                  ) : (
                    <Button
                      sx={{ width: "90%", mr: 1 }}
                      color='primary'
                      variant='contained'
                      onClick={handleApply}>
                      Apply
                    </Button>
                  )}
                </Grid>
                <Grid item md={3}>
                  <Button
                    sx={{ width: "80%", mr: 1 }}
                    color='primary'
                    variant='outlined'
                    startIcon={<FavoriteBorderIcon />}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Grid>
        <JobDetailCompany jobDetail={jobDetail} />
        <Grid container spacing={0}>
          {/*left description*/}
          <Grid item xs={12} md={8}>
            <Box sx={{ width: "100%", marginTop: -7 }}>
              <Card sx={{ p: 3, borderTop: "1px solid gray" }}>
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    Job description
                  </Typography>
                  <Typography variant='body2' component='div' gutterBottom>
                    {formatJobDescription(jobDetail.description.JobDescription)}
                    <br />
                  </Typography>

                  <Typography variant='h6' gutterBottom>
                    Candidate Requirements
                  </Typography>
                  <Typography variant='body2' component='div' gutterBottom>
                    {formatJobDescription(
                      jobDetail.description.CandidateRequirements
                    )}
                  </Typography>

                  <Typography variant='h6' gutterBottom>
                    Benefit
                  </Typography>
                  <Typography variant='body2' component='div' gutterBottom>
                    {formatJobDescription(jobDetail.description.Benefit)}
                  </Typography>

                  <Typography variant='h6' gutterBottom>
                    Location working
                  </Typography>
                  <Typography variant='body2' component='div' gutterBottom>
                    - {jobDetail.location.address}
                    {jobDetail.location.commune},{jobDetail.location.district},
                    {jobDetail.location.province}
                    <br />
                  </Typography>

                  <Typography variant='h6' gutterBottom>
                    Working time
                  </Typography>
                  <Typography variant='body2' component='div' gutterBottom>
                    - {jobDetail.typeOfWork === 0 ? "Full-time" : "Part-time"}
                    <br />- {formatDate(jobDetail.deadline)}
                    <br />
                    - Nghỉ 2 thứ 7 trong tháng
                    <br />
                  </Typography>

                  <Typography variant='h6' gutterBottom>
                    How to apply
                  </Typography>
                  <Typography variant='body2' component='div' gutterBottom>
                    - Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay
                    dưới đây.
                    <br />
                    - Hạn nộp hồ sơ: 04/07/2024
                    <br />
                  </Typography>

                  <Grid container justifyContent='left'>
                    {isApplied ? (
                      <Button
                        sx={{ mt: 2 }}
                        color='primary'
                        variant='contained'
                        disabled>
                        Applied
                      </Button>
                    ) : (
                      <Button
                        variant='contained'
                        color='primary'
                        sx={{ mt: 2 }}
                        onClick={handleApply}>
                        Apply now
                      </Button>
                    )}
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{ mt: 2, ml: 3 }}>
                      <FavoriteIcon />
                      Save
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <JobDetailMoreInfor jobDetail={jobDetail} />
        </Grid>
      </Grid>

      <LoginDialog open={openLogin} handleClose={handleCloseLogin} />
      <JobSavedChild
        open={openDialog}
        handleClose={handleCloseDialog}
        setIsApplied={setIsApplied}
      />
    </Container>
  );
}
