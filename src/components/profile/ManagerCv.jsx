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
    } else if (extension === "pdf" || extension === "docx" || extension === "doc") {
      return "pdf";
    } else {
      return "unknown";
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Manage CVs
        </Typography>
        <Typography variant="h5" gutterBottom>
          <Button
          LinkComponent={Link}
            to={`/profile/upload`}
            variant="outlined"
            style={{ textDecoration: "none", color: "black" }}>
            Upload more CVs
          </Button>
        </Typography>
        <List>
          {cvList.map((cv) => (
            <div key={cv._id}>
              <ListItem>
                {getFileType(cv.fileURL) === "image" ? (
                  <Paper elevation={3}>
                    <img
                      src={cv.fileURL}
                      alt="CV Thumbnail"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </Paper>
                ) : getFileType(cv.fileURL) === "pdf" ? (
                  <Paper elevation={3}>
                    <Typography variant="body1">PDF Thumbnail</Typography>
                    {/* You can add a PDF thumbnail generator here */}
                  </Paper>
                ) : (
                  <ListItemText primary={cv.fileURL} />
                )}
                <Typography variant="body1">Update: {formatDate(cv.updatedAt)}</Typography>
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleDelete(cv._id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        {cvList.length === 0 && (
          <Typography variant="body1">No CVs uploaded yet.</Typography>
        )}
      </Box>
    </Container>
  );
}
