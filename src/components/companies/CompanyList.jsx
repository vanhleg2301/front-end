import React from "react";
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

export default function CompanyList() {
  const companies = [
    {
      id: 1,
      name: "Công Ty TNHH TransCosmos Việt Nam",
      logo: "https://static.topcv.vn/company_logos/cong-ty-tnhh-transcosmos-viet-nam-63f70af7037aa.jpg",
      cover:
        "https://static.topcv.vn/company_covers/cong-ty-tnhh-transcosmos-viet-nam-f3db69d527d6a14f54ad705074c1ed94-645b060e963eb.jpg",
      description:
        "Tập đoàn Transcosmos chính thức thành lập Công ty TNHH Transcosmos Việt Nam vào tháng 3 năm 2014 với trụ sở chính tại Hà Nội, Việt Nam; Đại diện: Yohei Komura. Khai trương Trung tâm Hồ Chí Minh số 1 vào tháng 10 năm 2015, tiếp theo là Trung tâm Hồ Chí Minh số 2 vào tháng 3 năm 2017 và Trung tâm Hồ Chí Minh số 3 vào tháng...",
    },
    {
      id: 2,
      name: "Công Ty TNHH TransCosmos Việt Nam",
      logo: "https://static.topcv.vn/company_logos/cong-ty-tnhh-transcosmos-viet-nam-63f70af7037aa.jpg",
      cover:
        "https://static.topcv.vn/company_covers/cong-ty-tnhh-transcosmos-viet-nam-f3db69d527d6a14f54ad705074c1ed94-645b060e963eb.jpg",
      description:
        "Tập đoàn Transcosmos chính thức thành lập Công ty TNHH Transcosmos Việt Nam vào tháng 3 năm 2014 với trụ sở chính tại Hà Nội, Việt Nam; Đại diện: Yohei Komura. Khai trương Trung tâm Hồ Chí Minh số 1 vào tháng 10 năm 2015, tiếp theo là Trung tâm Hồ Chí Minh số 2 vào tháng 3 năm 2017 và Trung tâm Hồ Chí Minh số 3 vào tháng...",
    },
    {
      id: 3,
      name: "Công Ty TNHH TransCosmos Việt Nam",
      logo: "https://static.topcv.vn/top_lists/bd62a491b5292914a07c298894bb6a6c-5c3c137f89e62.jpg",
      cover:
        "https://static.topcv.vn/top_lists/bd62a491b5292914a07c298894bb6a6c-5c3c137f89e62.jpg",
      description:
        "Tập đoàn Transcosmos chính thức thành lập Công ty TNHH Transcosmos Việt Nam vào tháng 3 năm 2014 với trụ sở chính tại Hà Nội, Việt Nam; Đại diện: Yohei Komura. Khai trương Trung tâm Hồ Chí Minh số 1 vào tháng 10 năm 2015, tiếp theo là Trung tâm Hồ Chí Minh số 2 vào tháng 3 năm 2017 và Trung tâm Hồ Chí Minh số 3 vào tháng...",
    },
    // Add more company objects as needed
  ];

  return (
    <Container maxWidth={"lg"}>
      <Box p={3}>
        <Divider />
        <Typography textAlign={"center"} variant="h4" gutterBottom>
          List Companies
        </Typography>
        <Grid container spacing={3} mt={3}>
          {companies.map((company) => (
            <Grid item key={company.id} xs={12} sm={6} md={4}>
              <Box
                component={Link}
                to="/companies/:id"
                sx={{ textDecoration: "none" }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={company.cover}
                    alt={company.name}
                  />
                  <CardContent>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="h6"
                      component="div"
                      gutterBottom
                    >
                      {company.name}
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
