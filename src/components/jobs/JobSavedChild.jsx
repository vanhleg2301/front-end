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
import { RequestPost } from "../../util/request";
import { APIAPPLY } from "../../util/apiEndpoint";
import { AuthContext } from "../../context/AuthProvider";
import { useParams } from "react-router-dom";

export default function JobSavedChild({ open, handleClose }) {
  const { jobId } = useParams();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileName, setFileName] = React.useState("");
  const [textDes, setTextDes] = React.useState("");
  const { userLogin } = React.useContext(AuthContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleDes = async (e) => {
    setTextDes(event.target.value);
  };

  const handleApply = async () => {
    const applicantId = userLogin.user._id;
    if (applicantId) {
      let response = RequestPost(`${APIAPPLY}/apply`, {
        applicantId,
        jobId
      });
      const apply = JSON.stringify(response);
      console.log(apply.message);
      console.log(apply.jobApplied);
      console.log(
        "Uploading file:",
        selectedFile,
        "And description:",
        textDes,
        "applicationId:",
        applicantId,
        "jobId:",
        jobId
      );
      handleClose();
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ textAlign: "center" }}>
        <DialogTitle id="alert-dialog-title" variant="h3">
          {"Form apply"}
        </DialogTitle>
        <DialogContent>
          <Paper elevation={3}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Title job
              </Typography>
              <Box sx={{ my: 2 }}>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={12}>
                      <Typography>
                        Format support .doc, .docx, pdf size below 5MB
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFile />}>
                        Choose CV
                        <input type="file" hidden onChange={handleFileChange} />
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
                    id="introduction"
                    aria-label="Introduction"
                    value={textDes}
                    onChange={handleDes}
                    minRows={7}
                    placeholder="Write your introduction here..."
                    style={{ width: "100%", resize: "vertical" }}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </DialogContent>

        <DialogActions>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleApply}
              sx={{ width: "90%" }}>
              Apply
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
