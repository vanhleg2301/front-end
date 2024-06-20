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
import React, { useState } from "react";

export default function ManagerCv() {
  const [cvList, setCvList] = useState([]);

  const handleDelete = (index) => {
    const newCvList = [...cvList];
    newCvList.splice(index, 1);
    setCvList(newCvList);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Manage CVs
        </Typography>
        <List>
          {cvList.map((cv, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText primary={cv.fileName} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleDelete(index)}>
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
