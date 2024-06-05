import { Box, Button, Container, Typography, Grid, Paper } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import React, { useState } from "react";

export default function UploadCv() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Gửi tệp tin được chọn lên máy chủ
      // Ở đây bạn có thể sử dụng các thư viện như axios để gửi dữ liệu
      console.log("Uploading file:", selectedFile);
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom>
              Upload cv here
            </Typography>
            <Box sx={{ my: 2 }}>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      Format support .doc, .docx, pdf size below 5MB
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<UploadFile />}
                    >
                      Choose CV
                      <input type="file" hidden onChange={handleFileChange} />
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
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
