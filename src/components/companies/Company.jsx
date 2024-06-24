import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RequestGet } from "../../util/request";

export default function Company() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await RequestGet(`company`);
      console.log("response:", response.name)
        setCompanies(response);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);
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
              <Link
                to={`/companies/${company._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    textDecoration: "none",
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
                    style={{
                      width: "100%",
                      
                      objectFit: "contain",
                    }}
                    image={`http://localhost:9999/${company.logo}`}
                    alt={`${company.name} logo`}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" component="div">
                      {company.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
