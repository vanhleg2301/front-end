import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { APICV } from "../../util/apiEndpoint";
import { Request, RequestGet } from "../../util/request";

export default function ManagerCv() {
  const [cvList, setCvList] = useState([]);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await RequestGet(`${APICV}/`);
        setCvList(response);
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };
    fetchCVs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await Request(`${APICV}/${id}`, { method: 'DELETE' });
      setCvList(cvList.filter((cv) => cv._id !== id));
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
  };

  const getFileType = (fileURL) => {
    const extension = fileURL.split(".").pop().toLowerCase();
    if (extension === "png" || extension === "jpg" || extension === "jpeg") {
      return "image";
    } else if (extension === "pdf") {
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
