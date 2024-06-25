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
  
  console.log(detailCom.logo);
  console.log(detailCom.numberOfEmployees);

  return (
    <Container maxWidth="lg">
      <Card>
        <CardContent>
          {/* Company Information */}
          <Box>
            <Typography variant="h4" align="center" gutterBottom>
              {detailCom.companyName}
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={12}>
                <Typography variant="body1" align="center" gutterBottom>
                  {detailCom.numberOfEmployees}
                </Typography>
              </Grid>
            </Grid>
            <Box textAlign="center" my={2}>
              <img
                src={detailCom.logo}
                alt="Company Logo"
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
                    <Typography variant="h6">Giới thiệu công ty</Typography>
                    <Typography variant="body1">
                      Tập đoàn Transcosmos chính thức thành lập Công ty TNHH
                      Transcosmos Việt Nam vào tháng 3 năm 2014 với trụ sở chính
                      tại Hà Nội, Việt Nam; Đại diện: Yohei Komura. Khai trương
                      Trung tâm Hồ Chí Minh số 1 vào tháng 10 năm 2015, tiếp
                      theo là Trung tâm Hồ Chí Minh số 2 vào tháng 3 năm 2017 và
                      Trung tâm Hồ Chí Minh số 3 vào tháng 6 năm 2019. Cùng với
                      việc khai trương Trung tâm mới tại Lâm Đồng, Transcosmos
                      Việt Nam có kế hoạch tuyển dụng 500 nhân sự mới trước năm
                      2022.
                    </Typography>
                    {!showMore && (
                      <Typography
                        onClick={handleShowMore}
                        sx={{ cursor: "pointer", color: "blue" }}>
                        Xem thêm
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Information connect */}
                <Card>
                  <CardContent>
                    <Typography variant="h6">Thông tin liên hệ</Typography>
                    <Typography variant="body1">
                      Địa chỉ công ty: Tầng 8 và tầng 10, Tòa nhà SCETPA, Số 19A
                      đường Cộng Hòa, Phường 12, Quận Tân Bình, Thành Phố Hồ Chí
                      Minh, Việt Nam
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          {/* Related work */}
          <Box mt={4}>
            <Typography variant="h4" color="textPrimary" gutterBottom>
              Related work
            </Typography>
            <Box>
              <Job />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
