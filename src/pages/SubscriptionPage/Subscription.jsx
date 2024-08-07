import React, { useState } from "react";
import { Paper, Typography, Button, Grid, Box, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

const packages = [
  {
    name: "Bronze",
    description: "Bronze package",
    create: 2,
    update: 2,
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
    create: 7,
    update: 7,
    price: "9000",
  },
];

const Subscription = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState({}); // State to store quantity for each package

  // Initialize quantity for each package to default of 1
  useState(() => {
    const initialQuantity = {};
    packages.forEach(pkg => {
      initialQuantity[pkg.name] = 1;
    });
    setQuantity(initialQuantity);
  });

  const handleBuyPackage = (pkg) => {
    navigate("/payment", {
      state: {
        packageName: pkg.name,
        pricePackage: pkg.price,
        descriptionPackage: pkg.description,
        quantity: quantity[pkg.name], // Include quantity for the selected package
      },
    });
  };

  const handleChangeQuantity = (event, pkg) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity({
        ...quantity,
        [pkg.name]: value,
      });
    } else {
      setQuantity({
        ...quantity,
        [pkg.name]: 1, // Default to 1 if invalid input
      });
    }
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
                <Box hidden>
                <TextField
                
                  type="number"
                  label="Quantity"
                  value={quantity[pkg.name]}
                  onChange={(event) => handleChangeQuantity(event, pkg)}
                  inputProps={{ min: 1 }} // Ensure quantity is positive
                  sx={{ marginTop: 2 }}
                /></Box>
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
