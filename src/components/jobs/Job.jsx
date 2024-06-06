import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Paginations from "../paginations/Paginations";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ENDPOINT } from "../../util/constants";
import {
  formatDescription,
  formatLocation,
  formatSalary,
} from "../../util/formatHelpers";
import JobWish from "../profile.jsx/JobWish";
import { RequestGet } from "../../util/request";

const itemsPerPage = 9;

const locationPerPage = 4;

export default function Job() {
  const [jobs, setJobs] = useState([]);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const [currentPageLocation, setCurrentPageLocation] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(1);
  const [favoriteJobs, setFavoriteJobs] = useState([]);

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
  }, [jobs]);

  // Heart
  const [isFavoriteList, setIsFavoriteList] = useState({});

  const toggleFavorite = (jobId, job) => {
    // Modified toggleFavorite function
    setIsFavoriteList((prev) => {
      const newList = { ...prev };
      newList[jobId] = !newList[jobId];
      return newList;
    });

    if (isFavoriteList[jobId]) {
      setFavoriteJobs((prev) => prev.filter((item) => item._id !== jobId)); // Remove job from favorite list
    } else {
      setFavoriteJobs((prev) => [...prev, job]); // Add job to favorite list
    }
  };

  // Paginated
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return jobs.slice(startIndex, endIndex);
  };

  // location
  const getUniqueLocations = () => {
    const locations = jobs.map((job) => job.location.city);
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
    <Container sx={{ mt: 2, mb: 2 }}>
      {/*Filter*/}
      <Box
        sx={{
          width: { sm: "left", md: "left" },
          textAlign: { sm: "left", md: "left" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Jobs List
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", width: "20%", mt: 2, mb: 2 }}>
            <FormControl sx={{ m: 1, minWidth: "100%" }}>
              <Select
                labelId="location-select-label"
                id="location-select"
                value={filter === "" ? "" : filter}
                displayEmpty
                autoWidth
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon /> Filter by:
                  </InputAdornment>
                }
                onChange={handelFilter}
              >
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
                  }}
                >
                  <IconButton onClick={() => handlePageLocation("prev")}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  {getPaginatedLocation().map((city, index) => (
                    <Button
                      color="error"
                      key={index}
                      sx={{
                        m: 2,
                        whiteSpace: "nowrap", // Nút co dãn chiều ngang
                        backgroundColor: "#f4f5f5",
                      }}
                    >
                      {city}
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
      {/* content list job */}
      <Grid container spacing={2}>
        {getPaginatedData().map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex" }}
            key={item._id}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexGrow: 1,
                p: 1,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                  border: "1px solid gray",
                },
              }}
            >
              <Box
                component={Link}
                to={`/jobs/${item._id}`}
                sx={{ display: "flex", width: "30%", height: "auto" }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={item.logo}
                  alt={`Logo ${item.id}`}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "70%",
                  pr: 2,
                }}
              >
                <CardContent>
                  <Box
                    sx={{ textDecoration: "none" }}
                    component={Link}
                    to={`/jobs/${item._id}`}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {formatDescription(item.desciprtion)}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component={Link}
                    to={`/companies/${item._id}`}
                    sx={{ textDecoration: "none" }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className="salaryLocation"
                    sx={{
                      display: "flex",
                      height: "24px",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#f4f5f5",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        mr: 1,
                        display: "flex",
                        alignItems: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap", // co dãn ngang
                        textOverflow: "ellipsis",
                      }}
                    >
                      {formatSalary(item.salary)}
                    </Box>
                    <Box
                      sx={{
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        backgroundColor: "#f4f5f5",
                        display: "flex",
                        alignItems: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {formatLocation(item.location.city)}
                    </Box>
                  </Box>

                  <Box className="icon">
                    <IconButton
                      aria-label="favorite"
                      onClick={() => toggleFavorite(item._id, item)}
                    >
                      {isFavoriteList[item._id] ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* pagination */}
      <Paginations
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {/* Render JobWish component */}
      <JobWish favoriteJobs={favoriteJobs} />
    </Container>
  );
}
