import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { APICV } from "../../util/apiEndpoint";
import { RequestDelete, RequestGet } from "../../util/request";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../util/formatHelpers";

export default function ManagerCv({ onChooseCv, open }) {
  const { userLogin } = useContext(AuthContext);
  const [cvList, setCvList] = useState([]);
  const nagivation = useNavigate();

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await RequestGet(`${APICV}/${userLogin.user._id}`);
        setCvList(response);
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };
    fetchCVs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await RequestDelete(`${APICV}/${id}`);
      setCvList(cvList.filter((cv) => cv._id !== id));
      console.log("CV deleted successfully.");
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
  };

  const getFileType = (fileURL) => {
    const extension = fileURL.split(".").pop().toLowerCase();
    if (extension === "png" || extension === "jpg" || extension === "jpeg") {
      return "image";
    } else if (
      extension === "pdf" ||
      extension === "docx" ||
      extension === "doc"
    ) {
      return "pdf";
    } else {
      return "unknown";
    }
  };

  const getFileExtension = (fileURL) => {
    const decodedURL = decodeURIComponent(fileURL);
    // Lấy phần cuối cùng của URL bằng cách tách theo dấu /
    const fileNameWithParams = decodedURL.split("/").pop();

    // Lấy tên file từ phần cuối cùng của URL bằng cách tách theo dấu .
    const fileName = fileNameWithParams.split(".").slice(0, -1).join(".");

    return fileName;
  };

  const handleOpenPdf = (fileURL) => {
    console.log("decodedURL:", fileURL);
    window.open(fileURL, "_blank");
  };

  const handleChooseCv = (cv) => {
    onChooseCv(cv);
  };

  return (
    <Container maxWidth='md'>
      <Box mt={4}>
        <Typography variant='h3' gutterBottom>
          Manage CVs
        </Typography>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}>
          <Typography variant='h5'>
            <Button
              component={Link}
              to={`/profile/upload`}
              variant='outlined'
              style={{ textDecoration: "none", color: "black" }}>
              Upload more CVs
            </Button>
          </Typography>
          {cvList.length === 0 && (
            <Typography variant='body1'>No CVs uploaded yet.</Typography>
          )}
        </Box>
        <Grid container spacing={2}>
          {cvList.map((cv) => (
            <Grid item key={cv._id} xs={12} sm={6} md={4}>
              <Card
                variant='outlined'
                sx={{
                  position: "relative", // Ensure relative positioning
                  height: 200,
                  width: 200,
                }}>
                {/* Background image */}
                <Box
                  sx={{
                    backgroundImage: `url('https://www.topcv.vn/v4/image/upload_cv/default_cv.jpg')`,
                    backgroundSize: "cover",
                    height: 200,
                    width: 200,
                  }}
                />
                {/* Content at the bottom */}
                <CardContent
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent white background
                    textAlign: "left",
                    padding: 1, // Adjust padding as needed
                  }}>
                  <Box
                    sx={{
                      position: "absolute",
                      right: 1,
                      top: 0,
                      m: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenPdf(cv.fileURL)}>
                    View cv
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 1,
                      mt: 1,
                    }}>
                    {/* Content */}
                    {getFileType(cv.fileURL) === "image" && (
                      <Box>
                        {/* Image display */}
                        <Box
                          // component="img"
                          src={cv.fileURL}
                          sx={{ maxWidth: "100%", height: "auto" }}
                        />
                      </Box>
                    )}
                    <Typography variant='subtitle2' mt={3} ml={2}>
                      Update: {formatDate(cv.updatedAt)}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Typography
                        variant='subtitle2'
                        mt={1}
                        sx={{ position: "absolute", pr: 7 }}>
                        {getFileExtension(cv.fileURL)}
                      </Typography>
                      <IconButton onClick={() => handleDelete(cv._id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              {open && (
                <Button onClick={() => handleChooseCv(cv)}>Choose cv</Button>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
