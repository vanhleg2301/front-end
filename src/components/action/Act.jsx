import React, { useState } from "react";
import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Button,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function Act() {
  const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const [advanced, setAdvanced] = useState(0);
  const handleAdvanced = () => {
    setAdvanced(1);
  };
  return (
    <Container maxWidth={"lg"} sx={{ mt: 4 }}>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Recruitment position"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" fullWidth>
              <Select
                input={
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <LocationOnIcon /> Location:
                      </InputAdornment>
                    }
                  />
                }
              >
                <MenuItem value="text">
                  <TextField placeholder="Typing location" />
                </MenuItem>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="location1">Location 1</MenuItem>
                <MenuItem value="location2">Location 2</MenuItem>
                <MenuItem value="location3">Location 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" fullWidth>
              <Select
                input={
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <AttachMoneyIcon /> Exp:
                      </InputAdornment>
                    }
                  />
                }
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="range1">1 year</MenuItem>
                {/* Add more salary ranges here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" fullWidth>
              <Select
                input={
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <AttachMoneyIcon /> Salary:
                      </InputAdornment>
                    }
                  />
                }
              >
                <MenuItem value="text">
                  <TextField placeholder="from" />
                  <TextField placeholder="to" />
                </MenuItem>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="range1">11 - 12</MenuItem>
                {/* Add more salary ranges here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="info"
              fullWidth
              sx={{ height: "54.55px" }}
            >
              Find
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={1}>
            <Box>Total results: {getRandomNumber()}</Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {advanced === 1 ? (
              <Grid container>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      input={
                        <OutlinedInput
                          startAdornment={
                            <InputAdornment position="start">
                              <LocationOnIcon /> Location:
                            </InputAdornment>
                          }
                        />
                      }
                    >
                      <MenuItem value="text">
                        <TextField placeholder="Typing location" />
                      </MenuItem>
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="location1">Location 1</MenuItem>
                      <MenuItem value="location2">Location 2</MenuItem>
                      <MenuItem value="location3">Location 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      input={
                        <OutlinedInput
                          startAdornment={
                            <InputAdornment position="start">
                              <LocationOnIcon /> Location:
                            </InputAdornment>
                          }
                        />
                      }
                    >
                      <MenuItem value="text">
                        <TextField placeholder="Typing location" />
                      </MenuItem>
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="location1">Location 1</MenuItem>
                      <MenuItem value="location2">Location 2</MenuItem>
                      <MenuItem value="location3">Location 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            ) : null}
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="info"
              fullWidth
              sx={{ height: "54.55px" }}
              onClick={handleAdvanced}
            >
              Advanced filtering
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  );
}
