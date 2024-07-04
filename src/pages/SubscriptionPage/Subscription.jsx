import React from "react";
import { Paper, Typography, Button, Grid, Box } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

const packages = [
  {
    name: "Bronze",
    description: "Bronze package",
    create: 3,
    update: 3,
    price: "3000",
  },
  {
    name: "Silver",
    description: "Silver package",
    create: 5,
    update: 5,
    price: "5000",
  },
  {
    name: "Gold",
    description: "Gold package",
    create: 9,
    update: 9,
    price: "9000",
  },
];

const Subscription = () => {
  const navigate = useNavigate();

  const handleBuyPackage = (pkg) => {
    navigate("/payment", {
      state: {
        packageName: pkg.name,
        pricePackage: pkg.price,
        descriptionPackage: pkg.description,
      },
    });
  };

  return (
    <Container>
      <Typography variant='h4' gutterBottom align='center' mt={5}>
        List Package
      </Typography>
      <Button variant="outlined" component={Link} to={'/recruiter'}>Back to dashboard</Button>
      <Grid container spacing={3} mt={3}>
        {packages.map((pkg, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='h5'>PaymentPack: {pkg.name}</Typography>
                <Typography variant='body1'>{pkg.description}</Typography>
                <Typography variant='body1'>
                  Number of create: {pkg.create}
                </Typography>
                <Typography variant='body1'>
                  Number of update: {pkg.update}
                </Typography>
                <Typography variant='body1'>Price: ${pkg.price}</Typography>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ marginTop: 2 }}
                  onClick={() => handleBuyPackage(pkg)}>
                  Buy {pkg.name}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Subscription;
