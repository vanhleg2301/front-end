import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
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
        throw error;
      }
    };
    fetchCompanyDetail();
  }, [companyId]);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Company Detail
      </Typography>
      <Typography variant="h4" gutterBottom>
        Company Name: {company.companyName}
      </Typography>
      <img
        src={company.logo}
        alt="Company Logo"
        style={{ maxWidth: "200px", marginBottom: "10px" }}
      />
      <Typography variant="body1" gutterBottom>
        Email:{company.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone Number:{company.phoneNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Location:{company.location}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tax Number:{company.taxNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Number of Employees:{company.NumberOfEmployees}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Business License:{company.businessLicense}
      </Typography>
    </Container>
  );
}
