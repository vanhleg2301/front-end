import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  RequestGet,
  RequestPatch,
  RequestPost,
  RequestPut,
} from "../../../util/request";
import { generateRoomId } from "../../../util/formatHelpers";
import {
  APIAPPLY,
  APIJOB,
  APIROOM,
  APIUSER,
  NOTIFICATION,
} from "../../../util/apiEndpoint";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../util/formatHelpers";
import { useSocket } from "../../../context/socket";
import { AuthContext } from "../../../context/AuthProvider";
import Detail from "./Detail";
import { toast, ToastContainer } from "react-toastify";
import { Stack } from "@mui/system";

const JobDetail = () => {
  const { userLogin } = useContext(AuthContext);
  const { jobId } = useParams(); // Get the jobId from the URL params
  const [job, setJob] = useState(null); // Declare a state variable for job, initialize with null
  const [dataJob, setDataJob] = useState(null);
  const [reload, setReload] = useState(false); // State for reloading the data
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const [selectedApplicant, setSelectedApplicant] = useState(null); // State for selected applicant
  const [meetingDetails, setMeetingDetails] = useState({
    timeMeeting: "",
    linkMeeting: "",
  });
  const [isRoomIdGenerated, setIsRoomIdGenerated] = useState(false); // State to track if room ID has been generated

  const handleGenerateRoomId = () => {
    const newRoomId = generateRoomId();
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      linkMeeting: newRoomId,
    }));
    setIsRoomIdGenerated(true); // Set the flag to true once the room ID is generated
  };

  useEffect(() => {
    const fetchJob = async () => {
      const response = await RequestGet(`${APIJOB}/${jobId}`);
      setJob(response);
    };

    const fetchCvOfJob = async () => {
      const response = await RequestGet(`${APIJOB}/jobCv/${jobId}`);
      setDataJob(response);
    };

    fetchJob();
    fetchCvOfJob();
  }, [jobId, reload]); // Add jobId as a dependency

  const handleReload = () => {
    setReload(!reload);
  };

  const handleOpenFile = (fileURL) => {
    console.log("decodedURL:", fileURL);
    window.open(fileURL, "_blank");
  };

  const socket = useSocket();

  const handleOpenDialog = (applicantId) => {
    setSelectedApplicant(applicantId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApplicant(null);
  };

  const saveNotification = async (messAccept, linkMeeting) => {
    try {
      const response = await RequestPost(
        `${NOTIFICATION}/${selectedApplicant}`,
        {
          linkMeet: linkMeeting,
          message: messAccept,
        }
      );
      console.log("SaveNotification successfully:", response);
    } catch (error) {
      console.log("SaveNotification fail:", error);
    }
  };

  const sendmail = async (userId, message) => {
    //sendmail to recruiter
    try {
      const response = await RequestPost(`${APIUSER}/sendMailFrame`, {
        userId: userId,
        message: message,
      });
      console.log("Send email for applicant successfully: ", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleAccept = async () => {
    if (!meetingDetails.timeMeeting || !meetingDetails.linkMeeting) {
      toast.error("Please enter meeting details");
      return;
    }

    try {
      await RequestPost(`${APIROOM}/${userLogin?.user?._id}`, {
        roomId: meetingDetails.linkMeeting,
      });

      await RequestPatch(`${APIAPPLY}/status/${jobId}/${selectedApplicant}`, {
        status: 0,
      });

      socket.emit("accept_applied", {
        timeMeeting: meetingDetails.timeMeeting,
        linkMeeting: meetingDetails.linkMeeting,
        userId: selectedApplicant,
        message: `Recruiter accepted your cv in ${job.title}`,
      });

      await saveNotification(
        `Recruiter accepted your cv in ${job.title} at ${formatDate(
          meetingDetails.timeMeeting
        )}`,
        meetingDetails.linkMeeting
      );

      const mess = `Recruiter accepted your cv in ${
        job.title
      }. Code meeting: "${meetingDetails.linkMeeting}" at ${formatDate(
        meetingDetails.timeMeeting
      )} ^.^`;

      sendmail(selectedApplicant, mess);

      toast.success("Accepted successfully");
      setOpenDialog(false); // Close the dialog after accepting
    } catch (error) {
      console.error("Failed to accept application:", error);
    }
  };

  const handleReject = async (applicant) => {
    try {
      const hi = await RequestPatch(
        `${APIAPPLY}/status/${jobId}/${applicant}`,
        { status: 2 }
      );

      console.log(job?.title, "met: ", meetingDetails.linkMeeting);
      socket.emit("reject_applied", {
        linkMeeting: "",
        userId: applicant,
        message: `Recruiter rejected your cv in ${job?.title}`,
      });

      const mess = `Recruiter reject your cv in ${job?.title}. Please try again next time! ^_^`;

      sendmail(selectedApplicant, mess);

      await saveNotification(`Recruiter rejected your cv in ${job?.title}`, "");
      toast.success("Rejected successfully");
      setReload(!reload); // Reload the data
    } catch (error) {
      console.error("Failed to reject application:", error);
    }
  };

  return (
    <Container sx={{ borderTop: "1px solid #ddd" }}>
      <ToastContainer />
      {/*Job List*/}
      <Detail />
      {/*View Cv List*/}
      <Box mt={3} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant='h4'>List cv of job</Typography>
        <IconButton size='small' aria-label='reload' onClick={handleReload}>
          <RefreshIcon />
        </IconButton>
        <Typography>
          This job have <span>{dataJob?.length}</span> apply for
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Update at</TableCell>
                    <TableCell>FullName</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Cv</TableCell>
                    <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                      Function
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataJob ? (
                    dataJob?.map((j, index) => (
                      <TableRow hover key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{formatDate(j?.updatedAt)}</TableCell>
                        <TableCell>{j?.applicantID?.fullName}</TableCell>
                        <TableCell>{j?.applicantID?.email}</TableCell>
                        <TableCell onClick={() => handleOpenFile(j?.fileURL)}>
                          <Button color='primary' variant='contained'>
                            View Cv
                          </Button>
                        </TableCell>
                        <TableCell>
                          {j?.status === 1 ? (
                            <>
                              <Stack direction='row' spacing={2}>
                                <Button
                                  color='primary'
                                  variant='contained'
                                  sx={{ marginRight: 2 }}
                                  onClick={() =>
                                    handleOpenDialog(j?.applicantID._id)
                                  }>
                                  Accept
                                </Button>
                                <Button
                                  color='error'
                                  variant='contained'
                                  onClick={() =>
                                    handleReject(j?.applicantID._id)
                                  }>
                                  Reject
                                </Button>
                              </Stack>
                            </>
                          ) : j?.status === 0 ? (
                            <TableCell>
                              <Button variant='outlined' disabled>
                                Accepted
                              </Button>
                            </TableCell>
                          ) : j?.status === 2 ? (
                            <TableCell>
                              <Button variant='outlined' color='error' disabled>
                                Rejected
                              </Button>
                            </TableCell>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        No CVs found for this job.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Meeting detail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the date, time, and link for the meeting.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='timeMeeting'
            type='datetime-local'
            fullWidth
            variant='standard'
            value={meetingDetails?.timeMeeting}
            onChange={(e) =>
              setMeetingDetails({
                ...meetingDetails,
                timeMeeting: e.target.value,
              })
            }
            inputProps={{
              min: new Date().toISOString().slice(0, 16),
            }}
          />
          <TextField
            margin='dense'
            id='linkMeeting'
            label='Meeting Link'
            type='text'
            fullWidth
            variant='standard'
            value={meetingDetails?.linkMeeting}
            onChange={(e) =>
              setMeetingDetails({
                ...meetingDetails,
                linkMeeting: e.target.value,
              })
            }
            disabled
          />
          <Button
            onClick={handleGenerateRoomId}
            variant='contained'
            color='secondary'
            disabled={isRoomIdGenerated}>
            Generate Room ID
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAccept}>Accept</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobDetail;
