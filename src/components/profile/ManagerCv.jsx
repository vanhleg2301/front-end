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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { APICV } from "../../util/apiEndpoint";
import { Request, RequestGet } from "../../util/request";

export default function ManagerCv() {
  const [cvList, setCvList] = useState([]);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await RequestGet(`${APICV}/`);
        console.log(response)
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
                <ListItemText primary={cv.fileURL} />
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
