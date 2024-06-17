import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function MessengerAndPeople({ mess, people, close }) {
  const [visible, setVisible] = useState(mess || people);

  const handleClose = () => {
    setVisible(false);
  };
  return (
    <Slide direction="left" in={mess || people} mountOnEnter unmountOnExit>
      <Box
        sx={{
          backgroundColor: "white",
          position: "absolute",
          top: 20,
          right: 20,
          height: "82vh",
          width: "25%",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 10,
          }}
          onClick={close}
        >
          <CloseIcon />
        </IconButton>
        {people && (
          <Collapse
            in={people}
            orientation="horizontal"
            sx={{ height: "100%" }}
          >
            <Box
              elevation={3}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column", // Ensure content stacks vertically
                justifyContent: "space-between", // Adjust content alignment
                padding: 2,
                fontWeight: "bold",
                color: "primary.contrastText",
              }}
            >
              <Box>
                <Typography variant="h6">People Section</Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 2,
                  backgroundColor: "background.paper",
                  borderRadius: 5,
                }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search someone here..."
                  sx={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon
                          style={{ color: "gray", cursor: "pointer" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Collapse>
        )}

        {mess && (
          <Collapse in={mess} orientation="horizontal" sx={{ height: "100%" }}>
            <Box
              elevation={3}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column", // Ensure content stacks vertically
                padding: 2,
                fontWeight: "bold",
                color: "primary.contrastText",
              }}
            >
              <Box>
                <Typography variant="h6">Messenger Section</Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 2,
                  backgroundColor: "background.paper",
                  borderRadius: 5,
                  bottom: "0",
                }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Type a message..."
                  sx={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SendIcon
                          style={{ color: "gray", cursor: "pointer" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Collapse>
        )}
      </Box>
    </Slide>
  );
}
