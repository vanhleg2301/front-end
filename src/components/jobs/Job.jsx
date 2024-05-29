import React, { useState } from "react";
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
const data = [
  {
    id: 1,
    title: "Company 1",
    logo: "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/iposvn-61a6eab341dba.jpg",
    text: "hi",
    salary: "12000000",
    location: "Ha Noi",
  },
  {
    id: 2,
    title: "Company 2",
    logo: "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/N7Cyu93fFe7J5NpFyKgIohep1TOBqzOn_1695110290____4b7dabf325927ea8303f627f31c956ad.jpg",
    text: "hello",
    salary: "12000000",
    location: "Ho Chi Minh",
  },
  {
    id: 3,
    title: "Company 3",
    logo: "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg",
    text: "welcome",
    salary: "12000000",
    location: "Hue",
  },
  {
    id: 4,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12000000",
    location: "Da Nang",
  },
  {
    id: 5,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12000000",
    location: "Nam Dinh",
  },
  {
    id: 6,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12000000",
    location: "Hoan Kiem",
  },
  {
    id: 7,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12000000",
    location: "Ba Dinh",
  },
  {
    id: 8,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12000000",
    location: "Cau Giay",
  },
  {
    id: 9,
    title: "Company 1",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hi",
    salary: "12000000",
    location: "Ha Dong",
  },
  {
    id: 10,
    title: "Company 1",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hi",
    salary: "12000000",
    location: "Thanh Xuan",
  },
  {
    id: 11,
    title: "Company 1",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hi",
    salary: "12000000",
    location: "Dong Da",
  },
  {
    id: 12,
    title: "Company 1",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hi",
    salary: "12000000",
    location: "Ha Noi",
  },
  {
    id: 13,
    title: "Company 1",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hi",
    salary: "12000000",
    location: "Ha Noi",
  },
  {
    id: 14,
    title: "Company 1",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hi",
    salary: "12000000",
    location: "Ha Noi",
  },
  {
    id: 15,
    title: "Company 1",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hi",
    salary: "12000000",
    location: "Ha Noi",
  },
  {
    id: 16,
    title: "Company 1",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hi",
    salary: "12000000",
    location: "Ha Noi",
  },
];

// format salary
const formatSalary = (salary) => {
  if (isNaN(salary)) {
    return salary;
  } else {
    const millionSalary = salary / 1000000;
    return `${millionSalary} - triệu`;
  }
};

// format location
const formatLocation = (location) => {
  const locations = location.split(",");
  if (locations.length > 1) {
    return `${locations[0]}, ...`;
  } else {
    return location;
  }
};

const itemsPerPage = 9;

const locationPerPage = 4;
export default function Job() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPageLocation, setCurrentPageLocation] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  // Heart
  const [isFavoriteList, setIsFavoriteList] = useState(
    Array(data.length).fill(false)
  );

  const toggleFavorite = (index) => {
    setIsFavoriteList((prev) => {
      const newList = [...prev];
      newList[index] = !newList[index];
      return newList;
    });
  };

  // Paginated
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // location
  const getUniqueLocations = () => {
    // reduce - trích xuất các location duy nhất
    const locations = data.reduce((acc, curr) => {
      const locationArr = curr.location.split(",");
      locationArr.forEach((loc) => {
        if (!acc.includes(loc.trim())) {
          acc.push(loc.trim());
        }
      });
      return acc;
    }, []);

    return locations;
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
    if (direction === "prev") {
      setCurrentPageLocation((prevPage) => Math.max(prevPage - 1, 1));
    } else if (direction === "next") {
      setCurrentPageLocation((prevPage) =>
        Math.min(prevPage + 1, totalPagesLocation)
      );
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
                  {getPaginatedLocation().map((location, index) => (
                    <Button
                      color="error"
                      key={index}
                      sx={{
                        m: 2,
                        whiteSpace: "nowrap", // Nút co dãn chiều ngang
                        backgroundColor: "#f4f5f5",
                      }}
                    >
                      {location}
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
      <Grid container spacing={2}>
        {getPaginatedData().map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex" }}
            key={item.id}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexGrow: 1,
                p: 1,
              }}
            >
              <Box
                component={Link}
                to="/apply"
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
                    to="/apply"
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component={Link}
                    to="/companies"
                    sx={{ textDecoration: "none" }}
                  >
                    {item.text}
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
                      {formatLocation(item.location)}
                    </Box>
                  </Box>

                  <Box className="icon">
                    <IconButton
                      aria-label="favorite"
                      onClick={() => toggleFavorite(index)}
                    >
                      {isFavoriteList[index] ? (
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

      <Paginations
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
}
