import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import React from "react";

const industries = [
  { name: "Industry 1", icon: <BusinessIcon sx={{ fontSize: 50 }} /> },
  { name: "Industry 2", icon: <BusinessIcon sx={{ fontSize: 50 }} /> },
  { name: "Industry 3", icon: <BusinessIcon sx={{ fontSize: 50 }} /> },
  { name: "Industry 4", icon: <BusinessIcon sx={{ fontSize: 50 }} /> },
  { name: "Industry 5", icon: <BusinessIcon sx={{ fontSize: 50 }} /> },
  { name: "Industry 6", icon: <BusinessIcon sx={{ fontSize: 50 }} /> },
  { name: "Industry 7", icon: <BusinessIcon sx={{ fontSize: 50 }} /> },
  { name: "Industry 8", icon: <BusinessIcon sx={{ fontSize: 50 }} /> },
];

export default function Industries() {
  return (
    <Container>
      <Box sx={{ mt: 3, mb: 5 }}>
        <Box sx={{ textAlign: "left", marginBottom: 3 }}>
          <Typography component="h2" variant="h4" color="text.primary">
            Top Industries
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {industries.map((industry, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: 2,
                  borderRadius: "16px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s",
                  },
                }}
              >
                <CardMedia>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "16px 0",
                    }}
                  >
                    {industry.icon}
                  </Box>
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {industry.name}
                  </Typography>
                  <Typography variant="h9" component="div">
                    3000 jobs
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
