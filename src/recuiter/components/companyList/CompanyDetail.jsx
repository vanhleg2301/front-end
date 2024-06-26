import React from 'react';
import { Container, Typography } from '@mui/material';

export default function CompanyDetail() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Company Detail
      </Typography>
      <Typography variant="h4" gutterBottom>
        Name
      </Typography>
      <img src={""} alt="Company Logo" style={{ maxWidth: '200px', marginBottom: '10px' }} />
      <Typography variant="body1" gutterBottom>
        Email: 
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone Number: 
      </Typography>
      <Typography variant="body1" gutterBottom>
        Location: 
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tax Number: 
      </Typography>
      <Typography variant="body1" gutterBottom>
        Number of Employees:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Business License: 
      </Typography>
    </Container>
  );
}
