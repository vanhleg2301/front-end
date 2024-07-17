import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Divider,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RequestGet } from "../../util/request";
import ActCompany from "../action/ActCompany";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await RequestGet(`company`);
        setCompanies(response);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <Container maxWidth={"lg"}>
      <Box p={3}>
        <Box sx={{ width: "100%", mb: 4 }}>
          <ActCompany
            onSearch={(company) => {
              setCompanies(company);
              setSearched(true);
            }}
          />
        </Box>
        <Divider />
        <Typography textAlign={"center"} variant="h4" gutterBottom>
          List Companies
        </Typography>
        <Grid container spacing={3} mt={3}>
          {companies.map((company, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Box
                component={Link}
                to={`/companies/${company._id}`}
                sx={{ textDecoration: "none" }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={company.logo}
                    alt={company.companyName}
                  />
                  <CardContent>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="h6"
                      component="div"
                      gutterBottom
                    >
                      {company.companyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {company.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
