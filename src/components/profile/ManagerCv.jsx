import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { APICV } from "../../util/apiEndpoint";
import { Request, RequestDelete, RequestGet } from "../../util/request";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/formatHelpers";

export default function ManagerCv() {
  const { userLogin } = useContext(AuthContext);
  const [cvList, setCvList] = useState([]);

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
    return fileURL.split(".").pop().toLowerCase();
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Manage CVs
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}>
          <Typography variant="h5">
            <Button
              component={Link}
              to={`/profile/upload`}
              variant="outlined"
              style={{ textDecoration: "none", color: "black" }}>
              Upload more CVs
            </Button>
          </Typography>
          {cvList.length === 0 && (
            <Typography variant="body1">No CVs uploaded yet.</Typography>
          )}
        </Box>
        <Grid container spacing={2}>
          {cvList.map((cv) => (
            <Grid item key={cv._id} xs={12} sm={6} md={4}>
              <Card
                variant="outlined"
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
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 1,
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
                    <Typography variant="subtitle2" mt={1}>
                     Update: {formatDate(cv.updatedAt)}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Typography
                        variant="subtitle2"
                        mt={1}
                        sx={{ position: "absolute", pr: 7}}>
                        {getFileExtension(cv.fileURL)}
                      </Typography>
                      <IconButton onClick={() => handleDelete(cv._id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
