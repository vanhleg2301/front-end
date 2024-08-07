import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { RequestPost, RequestPostFile } from "../../util/request";
import { APIAPPLY, APIUSER, NOTIFICATION } from "../../util/apiEndpoint";
import { AuthContext } from "../../context/AuthProvider";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/socket";
import { toast, ToastContainer } from "react-toastify";
import DialogChooseCv from "../profile/DialogChooseCv";

export default function JobSavedChild({ open, handleClose, setIsApplied }) {
  const { jobId } = useParams();
  const socket = useSocket();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileName, setFileName] = React.useState("");
  const [textDes, setTextDes] = React.useState("");
  const [applied, setApplied] = React.useState(false); // State để kiểm tra đã áp dụng công việc hay chưa
  const { userLogin } = React.useContext(AuthContext);
  const [dialogChooseCv, setDialogChooseCv] = React.useState(false);
  const [chosenCv, setChosenCv] = React.useState(null);

  const handleYourFile = () => {
    setDialogChooseCv(true);
  };

  const handleCloseChooseCv = () => {
    setDialogChooseCv(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleDes = async (event) => {
    setTextDes(event.target.value);
  };

  const getFileExtension = (fileURL) => {
    const decodedURL = decodeURIComponent(fileURL);
    // Lấy phần cuối cùng của URL bằng cách tách theo dấu /
    const fileNameWithParams = decodedURL.split("/").pop();

    // Lấy tên file từ phần cuối cùng của URL bằng cách tách theo dấu .
    const fileName = fileNameWithParams.split(".").slice(0, -1).join(".");

    return fileName;
  };

  const handleChooseCv = (cv) => {
    setChosenCv(cv.fileURL);
    setFileName(getFileExtension(cv.fileURL));
    handleCloseChooseCv();
  };

  const saveNotification = async (messAccept, recruitersID, jobId) => {
    const responseNoti = await RequestPost(`${NOTIFICATION}/${recruitersID}`, {
      jobId: jobId,
      message: messAccept,
    });
    // console.log("SaveNotification successfully:", responseNoti);
  };

  const handleApply = async () => {
    const applicantId = userLogin.user._id;

    if (userLogin?.user?.roleID === 2) {
      toast.error("Recruiter not allowed to apply for job");
      return;
    } else if (userLogin?.user?.roleID === 3) {
      toast.error("Admin not allowed to apply for job");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select a fileCv to apply");
      return;
    }

    if (applicantId) {
      try {
        const response = await RequestPostFile(`${APIAPPLY}/apply`, {
          jobId,
          applicantId,
          textDes,
          cvFile: selectedFile,
        });

        console.log("Response:", response.recruitersID);
        setApplied(true); // Đã áp dụng thành công
        setApplied(setIsApplied); // Đã áp dụng thành công
        toast.success("Apply successfully");

        socket.emit("applied", {
          userId: userLogin.user._id,
          jobId: jobId,
          updatedAt: response.jobApplied.updatedAt,
          message: `${userLogin.user.email} has applied for some job.`,
        });

        saveNotification(
          `${userLogin.user.email} has applied for some job.`,
          response.recruitersID,
          jobId
        );

        // await sendmail(applicantId, jobId);
      } catch (error) {
        toast.error("Error applying for job");
        console.error("Error applying for job:", error);
        // Xử lý lỗi khi áp dụng công việc
      }
    } else {
      console.log("No file selected.");
    }
    handleClose();
  };

  const handleApplyWithYourCv = async () => {
    const applicantId = userLogin.user._id;

    if (userLogin?.user?.roleID === 2) {
      toast.error("Recruiter not allowed to apply for job");
      return;
    } else if (userLogin?.user?.roleID === 3) {
      toast.error("Admin not allowed to apply for job");
      return;
    }

    if (applicantId) {
      try {
        console.log(chosenCv);
        const response = await RequestPost(`${APIAPPLY}/applyYourCv`, {
          jobId,
          applicantId,
          cvFile: chosenCv,
          textDes,
        });

        console.log("Response:", response);
        setApplied(true); // Đã áp dụng thành công
        setApplied(setIsApplied); // Đã áp dụng thành công
        toast.success("Apply successfully");

        socket.emit("applied", {
          userId: userLogin.user._id,
          jobId: jobId,
          updatedAt: response.jobApplied.updatedAt,
          message: `${userLogin.user.email} has applied for some job.`,
        });

        saveNotification(
          `${userLogin.user.email} has applied for some job.`,
          response.recruitersID,
          jobId
        );

        // await sendmail(applicantId, jobId);
      } catch (error) {
        toast.error("Error applying for job");
        console.error("Error applying for job:", error);
        // Xử lý lỗi khi áp dụng công việc
      }
    } else {
      console.log("No file selected.");
    }
    handleClose();
  };

  const sendmail = async (applicantId, jobId) => {
    //sendmail to recruiter
    try {
      const response = await RequestPost(`${APIUSER}/sendmailJob`, {
        applicantId,
        jobId,
      });
      if (response) {
        console.log("Cv: ", response.cv);
        console.log("Job: ", response.job);
        console.log("Email of Recruiter: ", response.recruiterEmail);
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{ textAlign: "center" }}>
        <DialogTitle id='alert-dialog-title' variant='h3'>
          {"Form apply"}
        </DialogTitle>
        <DialogContent>
          <Paper elevation={3}>
            <Box sx={{ p: 4 }}>
              <Typography variant='h6' gutterBottom>
                Title job
              </Typography>
              <Box sx={{ my: 2 }}>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} sm={12}>
                      <Typography>
                        Format support .doc, .docx, pdf size below 5MB
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Button
                        variant='contained'
                        component='label'
                        // startIcon={<UploadFile />}
                        onClick={handleYourFile}>
                        Choose your cv
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Button
                        variant='contained'
                        component='label'
                        startIcon={<UploadFile />}>
                        Choose CV
                        <input
                          type='file'
                          accept='.pdf'
                          hidden
                          onChange={handleFileChange}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
              {fileName && (
                <Typography sx={{ my: 2 }}>
                  Selected file: {fileName}
                </Typography>
              )}
              <Box sx={{ padding: "30px" }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SummarizeIcon />
                    <Typography sx={{ marginLeft: 1 }}>
                      Introduce Yourself
                    </Typography>
                  </Box>
                  <TextareaAutosize
                    id='introduction'
                    aria-label='Introduction'
                    value={textDes}
                    onChange={handleDes}
                    minRows={7}
                    placeholder='Write your introduction here...'
                    style={{ width: "100%", resize: "vertical" }}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </DialogContent>

        <DialogActions>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            {applied ? (
              <Typography variant='body1' color='secondary'>
                You have already applied for this job. Wait recruiter check
              </Typography>
            ) : (
              <Button
                variant='contained'
                onClick={chosenCv ? handleApplyWithYourCv : handleApply}
                sx={{ width: "90%" }}>
                Apply
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
      <>
        <DialogChooseCv
          open={dialogChooseCv}
          handleClose={handleCloseChooseCv}
          onChooseCv={handleChooseCv}
        />
      </>
    </>
  );
}
