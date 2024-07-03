import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { RequestGet } from "../../util/request";

const locationPerPage = 4;
export default function FilterJob() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await RequestGet(`job`);
        setJobs(response);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJob();
  }, []);
  const [currentPageLocation, setCurrentPageLocation] = useState(1);
  //filter
  const [filter, setFilter] = useState(1);

  // location
  const getUniqueLocations = () => {
    const locations = jobs.map((job) => job.location.comune);
    return [...new Set(locations)];
  };

  const uniqueLocations = getUniqueLocations();

  const getPaginatedLocation = () => {
    const startIndex = (currentPageLocation - 1) * locationPerPage; // = 0
    const endIndex = startIndex + locationPerPage; // = 6
    return uniqueLocations.slice(startIndex, endIndex); // slice(0, 6)
  };

  const totalPagesLocation = Math.ceil(
    uniqueLocations.length / locationPerPage
  );

  const handlePageLocation = (direction) => {
    if (direction === "prev" && currentPageLocation > 1) {
      setCurrentPageLocation((prev) => prev - 1);
    } else if (
      direction === "next" &&
      currentPageLocation < totalPagesLocation
    ) {
      setCurrentPageLocation((prev) => prev + 1);
    }
  };

  // filter
  const handelFilter = (event) => {
    const value = event.target.value;
    if (value === 0) {
      setFilter(1);
    }
    if (value === 1) {
      setFilter(1);
    }
    if (value === 2) {
      setFilter(2);
    }
    if (value === 3) {
      setFilter(3);
    }
  };
  return (
    <Box
      sx={{
        width: { sm: "left", md: "left" },
        textAlign: { sm: "left", md: "left" },
      }}>
      <Typography component='h2' variant='h4' color='text.primary'>
        Jobs List
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Box sx={{ display: "flex", width: "20%", mt: 2, mb: 2 }}>
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <Select
              labelId='location-select-label'
              id='location-select'
              value={filter === "" ? "" : filter}
              displayEmpty
              autoWidth
              startAdornment={
                <InputAdornment position='start'>
                  <FilterListIcon /> Filter by:
                </InputAdornment>
              }
              onChange={handelFilter}>
              <MenuItem value={0}>
                <em>All</em>
              </MenuItem>
              <MenuItem value={1}>location</MenuItem>
              <MenuItem value={2}>salary</MenuItem>
              <MenuItem value={3}>use</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "center", ml: 10 }}>
            {filter === 1 ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  overflowX: "auto",
                  maxWidth: "100%",
                }}>
                <IconButton onClick={() => handlePageLocation("prev")}>
                  <ArrowBackIosIcon />
                </IconButton>
                {getPaginatedLocation().map((comune, index) => (
                  <Button
                    color='error'
                    key={index}
                    sx={{
                      m: 2,
                      whiteSpace: "nowrap", // Nút co dãn chiều ngang
                      backgroundColor: "#f4f5f5",
                    }}>
                    {comune}
                  </Button>
                ))}
                <IconButton onClick={() => handlePageLocation("next")}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            ) : filter === 2 ? (
              <Button>ha</Button>
            ) : filter === 3 ? (
              <Button>hu</Button>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
