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
import { APIJOB } from "../../util/apiEndpoint";

export default function Act({ onSearch }) {
  // ------ Search bar
  const [searchValue, setSearchValue] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]); // Keep track of selected jobs

  // search
  const [afterSearch, setAfterSearch] = useState("");

  // ------ location
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [locations, setLocations] = useState([]);

  // ------ salary
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [customRanges, setCustomRanges] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [errorColor, setErrorColor] = useState(false);

  // ------ EXP
  const [selectedExp, setSelectedExp] = useState("");

  // get job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await RequestGet(APIJOB);
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

  // Dropdown in search bar
  const handleDropdownClick = async (event, searchTerm) => {
    if (typeof searchTerm === "string") {
      setSearchValue(searchTerm);
      setSelectedJobs([...selectedJobs, searchTerm]);
      try {
        const data = await RequestGet(`${APIJOB}/find?title=${searchTerm}`);
        setAfterSearch(data);
      } catch (error) {
        console.error("Error fetching find job:", error);
      }
    }
  };

  // find with request
  useEffect(() => {
    const fetchFind = async () => {
      try {
        const query = new URLSearchParams({
          title: searchValue,
          location: selectedLocation,
          experience: selectedExp,
          minSalary: from,
          maxSalary: to,
        }).toString();

        const data = await RequestGet(`${APIJOB}/find?${query}`);
        console.log(query);
        setAfterSearch(data);

        // console.log("from fetch: ", afterSearch);
      } catch (error) {
        console.error("Error fetching find job:", error);
      }
    };
    fetchFind();
  }, [searchValue, selectedLocation, selectedExp, from, to, selectedValue]);

  // ------ submit all
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    onSearch(afterSearch);

    // console.log("from search: ", afterSearch);
    console.log("Form submitted!: ", [
      searchValue,
      selectedLocation,
      selectedExp,
      selectedValue,
      afterSearch,
    ]);
  };

  // ------ location
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      const uniqueLocations = [
        ...new Set(jobs.map((job) => job.location.comune)),
      ];
      setLocations(uniqueLocations);
    }
  }, [jobs]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearchInLocation = (event) => {
    setLocationSearch(event.target.value);
  };

  // Lọc location dựa trên giá trị tìm kiếm
  var data = locations.filter(function( element ) { return element !== undefined; });
  const filteredLocations = data.filter((location) =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // ------ salary
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    const [min, max] = event.target.value.split(" - ");
    setFrom(min);
    setTo(max);
  };

  const handleAddRange = () => {
    if (from && to) {
      if (Number(to) > Number(from)) {
        const ranges = [...customRanges, `${from} - ${to}`];
        setCustomRanges(ranges);
        setSelectedValue(`${from} - ${to}`);
        setErrorColor(false);
      } else {
        setErrorColor(true);
      }
    }
  };

  // ------ EXP
  const handleExp = (event) => {
    setSelectedExp(event.target.value);
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
                }>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                  }}>
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
                value={selectedExp}
                onChange={handleExp}
                input={
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <HourglassEmptyIcon /> Exp:
                      </InputAdornment>
                    }
                  />
                }>
                <MenuItem value="">---</MenuItem>
                <MenuItem value={0}>Less than 1 year</MenuItem>
                <MenuItem value={1}>1 year</MenuItem>
                <MenuItem value={2}>2 year</MenuItem>
                <MenuItem value={3}>3 year</MenuItem>
                <MenuItem value={4}>4 year</MenuItem>
                <MenuItem value={5}>5 year</MenuItem>
                <MenuItem value={6}>More than 5 year</MenuItem>
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
                }>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                  }}>
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
                <MenuItem value="0 - 0">Deal</MenuItem>
                {/* 
                <MenuItem value="20-25">20 - 25</MenuItem>
                <MenuItem value="25-30">25 - 30</MenuItem>
                <MenuItem value="30-50">30 - 50</MenuItem> */}
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
              sx={{ height: "54.55px" }}>
              Find
            </Button>
          </Grid>
        </Grid>
        {/* Advanced filtering*/}
      </form>
    </Container>
  );
}
