import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Card, CardContent, Grid, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { RequestGet } from "../../../util/request";
import { APICOMPANY } from "../../../util/apiEndpoint";

export default function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await RequestGet(`${APICOMPANY}/${companyId}`);
        setCompany(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCompanyDetail();
  }, [companyId]);

  const handleOpenFile = (fileURL) => {
    console.log("decodedURL:", fileURL);
    window.open(fileURL, "_blank");
  };

  return (
    <Container>
      <Typography variant='h2' gutterBottom align='center'>
        Company Detail
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} container alignItems="center" justifyContent="center">
              <Avatar 
                src={company?.logo} 
                alt='Company Logo' 
                sx={{ width: 120, height: 120, mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant='h4' gutterBottom>
                {company?.companyName}
              </Typography>
              <Typography variant='h6' gutterBottom>
                Status: 
                {company?.companyStatus === 0 
                  ? " Active" 
                  : company?.companyStatus === 1 
                    ? " Waiting for approval by Admin" 
                    : " Rejected"}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Website:</strong>{" "}
                <Typography 
                  color='primary' 
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => handleOpenFile(company?.email)}
                >
                  {company?.email}
                </Typography>
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Phone Number:</strong> {company?.phoneNumber}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Location:</strong> {company?.location}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Tax Number:</strong> {company?.taxNumber}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Number of Employees:</strong> {company?.numberOfEmployees}
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => handleOpenFile(company?.businessLicense)}
              >
                View Business License
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
