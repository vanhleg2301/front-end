import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Business, People, Add } from "@mui/icons-material";
import Job from "../jobs/Job";
import { RequestGet } from "../../util/request";
import { APICOMPANY } from "../../util/apiEndpoint";
import { useParams } from "react-router-dom";

export default function CompanyDetail() {
  const { companyID } = useParams();
  const [showMore, setShowMore] = useState("");
  const [detailCom, setDetailCom] = useState({});

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await RequestGet(`${APICOMPANY}/${companyID}`);
        setDetailCom(response);
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    })();
  }, [companyID]);

  const handleOpenFile = (fileURL) => {
    console.log("decodedURL:", fileURL);
    window.open(fileURL, "_blank");
  };

  return (
    <Container maxWidth='lg'>
      <Card sx={{ backgroundColor: "#F0F0F0", margin: -1, paddingTop: -4 }}>
        <CardContent>
          {/* Company Information */}
          <Box>
            <Typography variant='h4' align='center' gutterBottom>
              {detailCom.companyName}
            </Typography>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} md={12}>
                <Typography variant='body1' align='center' gutterBottom>
                  Number of employees:s {detailCom.numberOfEmployees}
                </Typography>
              </Grid>
            </Grid>
            <Box textAlign='center' my={2}>
              <img
                src={detailCom.logo}
                alt='Company Logo'
                style={{ maxWidth: "200px", maxHeight: "100px" }}
              />
            </Box>
          </Box>

          {/* Grid for Company Introduction and Contact Information */}
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                {/* Introduce company */}
                <Card>
                  <CardContent>
                    <Typography variant='h6'>Giới thiệu công ty</Typography>
                    <Typography variant='body1'>
                      Text number: {detailCom.taxNumber}
                    </Typography>
                    {!showMore && (
                      <Typography
                        onClick={handleShowMore}
                        sx={{ cursor: "pointer", color: "blue" }}>
                        Show more
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Information connect */}
                <Card>
                  <CardContent>
                    <Typography variant='h6'>Thông tin liên hệ</Typography>

                    <Typography
                      color='primary'
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleOpenFile(detailCom.email)}>
                      Website: {detailCom.email}
                    </Typography>
                    <Typography variant='body1'>
                      Hotline: {detailCom.phoneNumber}
                    </Typography>
                    <Typography variant='body1'>
                      Location: {detailCom.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      {/* Related work */}
      <Box mt={4}>
        <Typography variant='h4' color='textPrimary' gutterBottom>
          Related work
        </Typography>
        <Box>
          <Job />
        </Box>
      </Box>
    </Container>
  );
}
