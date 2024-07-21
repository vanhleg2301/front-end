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
import React, { useEffect } from "react";
import { APIINDUSTRY } from "../../util/apiEndpoint";
import { RequestGet } from "../../util/request";

export default function Industries() {
  const [industries, setIndustries] = React.useState([]);
  useEffect(() => {
    try {
      const getIndustries = async () => {
        const res = await RequestGet(`${APIINDUSTRY}`);
        setIndustries(res);
      };
      getIndustries();
    } catch (error) {
      console.error("Error industries:", error);
    }
  }, []);
  
  return (
    <Container>
      <Box sx={{ mt: 3, mb: 5 }}>
        <Box sx={{ textAlign: "left", marginBottom: 3 }}>
          <Typography component='h2' variant='h4' color='text.primary'>
            Top Industries
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {industries?.map((industry, index) => (
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
                }}>
                <CardMedia>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "16px 0",
                    }}>
                    <BusinessIcon sx={{ fontSize: 50 }} />
                  </Box>
                </CardMedia>
                <CardContent>
                  <Typography variant='h6' component='div'>
                    {industry.name}
                  </Typography>
                  <Typography variant='h9' component='div'>
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
