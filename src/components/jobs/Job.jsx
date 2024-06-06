import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Paginations from "../paginations/Paginations";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  formatDescription,
  formatLocation,
  formatSalary,
} from "../../util/formatHelpers";
import JobWish from "../profile/JobWish";
import { RequestGet } from "../../util/request";
import Act from "../action/Act";
import FilterJob from "./FilterJob";

const itemsPerPage = 9;

export default function Job() {
  const [jobs, setJobs] = useState([]);

  // search
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [searched, setSearched] = useState(false);

  //page
  const [currentPage, setCurrentPage] = useState(1);

  // favorite
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
  }, []);

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
  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const paginatedData = searched
    ? getPaginatedData(searchedJobs)
    : getPaginatedData(jobs);
  const totalPages = searched
    ? Math.ceil(searchedJobs.length / itemsPerPage)
    : Math.ceil(jobs.length / itemsPerPage);

  return (
    <>
      <Container>
        <Box sx={{ width: "100%" }}>
          <Act
            onSearch={(searchedJobs) => {
              setSearchedJobs(searchedJobs);
              // Khi có tìm kiếm, đặt giá trị của searched thành true
              setSearched(true);
              setCurrentPage(1);
            }}
          />
        </Box>
      </Container>

      <Container sx={{ mt: 2, mb: 2 }}>
        {/*Filter*/}
        <FilterJob />
        {/* content list job */}
        <Grid container spacing={2}>
          {paginatedData.map((item) => (
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
    </>
  );
}
