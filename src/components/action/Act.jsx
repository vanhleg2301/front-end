import React, { useEffect, useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { RequestGet } from "../../util/request";

export default function Act({ onSearch }) {
  //Search bar
  const [searchValue, setSearchValue] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]); // Keep track of selected jobs

  // search
  const [afterSearch, setAfterSearch] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await RequestGet(`jobs`);
        setJobs(response);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJob();
  }, []);

  const onChange = (event) => {
    const searchTerm = event.target.value;
    setSearchValue(searchTerm);
  };

  const handleDropdownClick = async (event, searchTerm) => {
    if (typeof searchTerm === "string") {
      setSearchValue(searchTerm);
      setSelectedJobs([...selectedJobs, searchTerm]);
      try {
        const data = await RequestGet(`jobs/find?title=${searchTerm}`);
        setAfterSearch(data);
      } catch (error) {
        console.error("Error fetching find job:", error);
      }
    }
  };

  useEffect(() => {
    const fetchFind = async () => {
      try {
        const data = await RequestGet(`jobs/find?title=${searchValue}`);
        setAfterSearch(data);
        console.log("from fetch: ", afterSearch);
      } catch (error) {
        console.error("Error fetching find job:", error);
      }
    };
    fetchFind();
  }, [searchValue]);

  // submit all
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    onSearch(afterSearch);
    console.log("from search: ", afterSearch);
    console.log("Form submitted!");
  };

  // location
  const [locationSearch, setLocationSearch] = useState("");
  const [locations, setLocations] = useState([
    "Hanoi",
    "Ho Chi Minh",
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

  // Lọc location dựa trên giá trị tìm kiếm
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

  return (
    <Container maxWidth={"lg"} sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Search*/}
          <Grid item xs={12} md={12}>
            <Box>
              <Autocomplete
                freeSolo
                options={jobs.map((job) => job.title)}
                onChange={handleDropdownClick}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    value={searchValue}
                    onChange={onChange}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Recruitment position"
                    fullWidth
                  />
                )}
              />
            </Box>
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

                <MenuItem value="" hidden>
                  ---
                </MenuItem>
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
                value={""}
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
                <MenuItem value="">---</MenuItem>
                <MenuItem value="y">All</MenuItem>
                <MenuItem value="1">1 year</MenuItem>
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

                <MenuItem value="" hidden>
                  ---
                </MenuItem>
                <MenuItem value="deal">Deal</MenuItem>
                <MenuItem value="15-20">15 - 20</MenuItem>
                <MenuItem value="20-25">20 - 25</MenuItem>
                <MenuItem value="25-30">25 - 30</MenuItem>
                <MenuItem value="30-50">30 - 50</MenuItem>
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
