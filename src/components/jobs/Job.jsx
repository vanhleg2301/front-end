import { Height } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const data = [
  {
    id: 1,
    title: "Company 1",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hi",
    salary: "12",
    location: "Ha Noi",
  },
  {
    id: 2,
    title: "Company 2",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "hello",
    salary: "12",
    location: "Ha Noi",
  },
  {
    id: 3,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12",
    location: "Ha Noi",
  },
  {
    id: 4,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12",
    location: "Ha Noi",
  },
  {
    id: 5,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12",
    location: "Ha Noi",
  },
  {
    id: 6,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12",
    location: "Ha Noi",
  },
  {
    id: 7,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12",
    location: "Ha Noi",
  },
  {
    id: 8,
    title: "Company 3",
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg",
    text: "welcome",
    salary: "12",
    location: "Ha Noi",
  },
];

export default function Job() {
  return (
    <Container>
      <Box
        sx={{
          width: { sm: "100%", md: "100%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Jobs List
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find your job here
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {data.map((item) => (
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
              <Box sx={{ display: "flex", width: "30%", height: "auto" }}>
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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
                  <Box>
                    <Button variant="outlined" color="error">
                      {item.salary}
                    </Button>
                    <Button variant="outlined" sx={{ ml: 1 }}>
                      {item.location}
                    </Button>
                  </Box>
                  <Box>
                    <IconButton aria-label="favorite">
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
