import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthProvider";
import { APICV } from "../../util/apiEndpoint";
import { RequestPostFile } from "../../util/request";
import { Link } from "react-router-dom";

export default function UploadCv() {
  const { userLogin } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("cvFile", selectedFile);
      formData.append("applicantID", userLogin.user._id);

      try {
        const response = await RequestPostFile(`${APICV}/upload`, formData);

        if (response && response.message === "File already exists.") {
          console.log("Upload fail:", response.message);
          setErrorMessage("File already exists. Please choose another file.");
          setErrorSnackbarOpen(true);
        } else if (response && response.message === "Invalid file type.") {
          console.log("Upload fail:", response.message);
          setErrorMessage(
            "Invalid file type. Let upload .doc, .docx, .pdf file only."
          );
          setErrorSnackbarOpen(true);
        } else if (
          response &&
          response.message === "File size exceeds limit."
        ) {
          console.log("Upload fail:", response.message);
          setErrorMessage(
            "File size exceeds limit. Please upload file below 5MB."
          );
          setErrorSnackbarOpen(true);
        } else {
          console.log("Upload successful:", response);
          setAlertMessage("Upload successful");
          setSelectedFile(null);
          setFileName("");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrorMessage("Error uploading file. Please try again.");
        setErrorSnackbarOpen(true);
      }
    } else {
      setErrorMessage("No file selected.");
      setErrorSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  return (
    <>
      {alertMessage && (
        <Alert
          variant="outlined"
          severity="success"
          sx={{ position: "fixed", bottom: "10px", left: "10px" }}>
          {alertMessage}
        </Alert>
      )}
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Paper elevation={3}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h3" gutterBottom>
                Upload CV Here
              </Typography>
              <Typography variant="h5" gutterBottom>
                <Button
                  LinkComponent={Link}
                  to={`/profile/manager`}
                  variant="outlined"
                  style={{ textDecoration: "none", color: "black" }}>
                  Check your uploaded CVs
                </Button>
              </Typography>
              <Box sx={{ my: 2 }}>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        Format support: .doc, .docx, .pdf; size below 5MB
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFile />}>
                        Choose CV
                        <input
                          fileName={selectedFile}
                          name="cvFile"
                          type="file"
                          hidden
                          onChange={handleFileChange}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
              {fileName && (
                <Typography variant="body1" sx={{ my: 2 }}>
                  Selected file: {fileName}
                </Typography>
              )}
              <Box sx={{ my: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}>
                  Upload
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Snackbar
          open={errorSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={errorMessage}
        />
      </Container>
    </>
  );
}
