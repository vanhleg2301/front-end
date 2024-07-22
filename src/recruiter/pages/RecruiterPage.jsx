import React from "react";
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const StyledCopyright = styled(Copyright)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(2),
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.info.dark,
  },
}));

export default function RecruiterPage() {
  return (
    <StyledContainer>
      <StyledTypography variant='h6' gutterBottom>
        Welcome to Recruiter Page
      </StyledTypography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant='h6' gutterBottom>
          First, register your company and wait for approval from the company.
        </Typography>
        <Stack
          direction='row'
          spacing={2}
          mt={2}
          component={Link}
          to='companyregister'
          sx={{ textDecoration: "none" }}
        >
          <StyledButton variant='contained' color="info">Register company Now</StyledButton>
        </Stack>
      </Box>
      <StyledCopyright sx={{ pt: 4 }} />
    </StyledContainer>
  );
}
