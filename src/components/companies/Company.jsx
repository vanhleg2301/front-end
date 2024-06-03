import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import React from "react";

const companies = [
  {
    name: "Company 1",
    logo: "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/iposvn-61a6eab341dba.jpg",
  },
  {
    name: "Company 2",
    logo: "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/iposvn-61a6eab341dba.jpg",
  },
  {
    name: "Company 3",
    logo: "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/iposvn-61a6eab341dba.jpg",
  },
  {
    name: "Company 4",
    logo: "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/iposvn-61a6eab341dba.jpg",
  },
];

export default function Company() {
  return (
    <Container>
      <Box
        sx={{
          mt: 5,
          textAlign: "left",
          mb: 6,
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          color="text.primary"
          gutterBottom
        >
          Top Companies
        </Typography>
        <Grid container spacing={3}>
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                    border: "1px solid blue",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={company.logo}
                  alt={`${company.name} logo`}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" component="div">
                    {company.name}
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
