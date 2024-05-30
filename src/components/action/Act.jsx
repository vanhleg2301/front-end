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
  Paper,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function Act() {
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([
    "Engineer",
    "Developer",
    "Designer",
  ]); // Danh sách từ khóa gợi ý

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setAnchorEl(event.currentTarget); // Hiển thị thanh từ khóa gợi ý khi người dùng bắt đầu nhập
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setAnchorEl(null); // Ẩn thanh từ khóa gợi ý khi người dùng chọn một từ khóa
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    console.log("Form submitted!");
  };

  return (
    <Container maxWidth={"lg"} sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            {/* Search*/}
            <TextField
              variant="outlined"
              value={searchValue}
              onChange={handleSearchChange}
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
            {/* Thanh từ khóa gợi ý */}
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <List>
                {suggestions.map((suggestion, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </Popover>
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
                <Box>
                  <TextField placeholder="Typing location" />
                </Box>

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
                <Box>
                  <TextField placeholder="from" />
                  <TextField placeholder="to" />
                </Box>

                <MenuItem value="all">All</MenuItem>
                <MenuItem value="range1">11 - 12</MenuItem>
                {/* Add more salary ranges here */}
              </Select>
            </FormControl>
          </Grid>
          {/* Search*/}
          <Grid item xs={12} md={3}>
            <Button
              type="submit"
              variant="contained"
              color="info"
              fullWidth
              sx={{ height: "54.55px" }}
            >
              Find
            </Button>
          </Grid>
        </Grid>
        {/* Advanced filtering*/}
      </form>
    </Container>
  );
}
