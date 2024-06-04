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
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function Act() {
  //Search bar
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  //Location
  const [locationSearch, setLocationSearch] = useState("");
  const [locations, setLocations] = useState([
    "Hanoi",
    "Ho Chi Minh City",
    "Da Nang",
    "Hai Phong",
  ]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearchInLocation = (event) => {
    setLocationSearch(event.target.value);
  };

  // Lọc các vị trí dựa trên giá trị tìm kiếm
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // salary
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [customRanges, setCustomRanges] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [errorColor, setErrorColor] = useState(false);

  const handleAddRange = () => {
    if (from && to) {
      if (Number(to) > Number(from)) {
        setCustomRanges([...customRanges, `${from} - ${to}`]);
        setFrom("");
        setTo("");
        setErrorColor(false);
        setSelectedValue("");
      } else {
        setErrorColor(true);
      }
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // submit all
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    console.log("Form submitted!");
  };

  return (
    <Container maxWidth={"lg"} sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Search*/}
          <Grid item xs={12} md={12}>
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
          </Grid>
          {/* Location*/}
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" fullWidth>
              <Select
                value={selectedLocation}
                onChange={handleLocationChange}
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
                <Box
                  sx={{ display: "flex", alignItems: "center", padding: "8px" }}
                >
                  <TextField
                    placeholder="Search location"
                    value={locationSearch}
                    size="small"
                    onChange={handleSearchInLocation}
                    fullWidth
                  />
                </Box>

                <MenuItem value="" hidden></MenuItem>
                <MenuItem value="all">All</MenuItem>
                {filteredLocations.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* EXP*/}
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" fullWidth>
              <Select
                input={
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <HourglassEmptyIcon /> Exp:
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
          {/* Salary*/}
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" fullWidth>
              <Select
                value={selectedValue}
                onChange={handleChange}
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
                <Box
                  sx={{ display: "flex", alignItems: "center", padding: "8px" }}
                >
                  <TextField
                    error={errorColor}
                    placeholder="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    size="small"
                    sx={{ marginRight: "8px" }}
                  />
                  <TextField
                    error={errorColor}
                    placeholder="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    size="small"
                    sx={{ marginRight: "8px" }}
                  />
                  <IconButton onClick={handleAddRange} color="primary">
                    <AttachMoneyIcon />
                  </IconButton>
                </Box>

                {customRanges.map((range, index) => (
                  <MenuItem key={index} value={range}>
                    {range}
                  </MenuItem>
                ))}

                <MenuItem value=""></MenuItem>
                <MenuItem value="deal">Deal</MenuItem>
                <MenuItem value="15 - 20">15 - 20</MenuItem>
                <MenuItem value="20 - 25">20 - 25</MenuItem>
                <MenuItem value="25 - 30">25 - 30</MenuItem>
                <MenuItem value="30 - 50">30 - 50</MenuItem>
                {/* Add more salary ranges here */}
              </Select>
            </FormControl>
          </Grid>
          {/* Find*/}
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
