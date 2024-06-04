import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Act from "../action/Act";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Image } from "@mui/icons-material";
import ScaleIcon from "@mui/icons-material/Scale";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function JobDetail() {
  return (
    <Container>
      <Grid container spacing={0} sx={{ mb: 5 }}>
        {/*left*/}
        <Grid item xs={12} md={8}>
          <Box sx={{ width: "100%" }}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography>
                  Nhân Viên Kiến Trúc, Tư Vấn, Thiết Kế - Thu Nhập Từ 10-30
                  Triệu
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <Grid container spacing={0} alignItems={"center"}>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <AttachMoneyIcon />
                      <Typography variant="body1">Salary</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        12m
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <LocationSearchingIcon />
                      <Typography variant="body1">Location</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Ha Noi, Ho Chi Minh
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <IconButton
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <HourglassEmptyIcon />
                      <Typography variant="body1">Exp</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        1-2 year
                      </Typography>
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>

              <Grid container>
                <Grid item xs={12} md={12} sx={{ textAlign: "end" }}>
                  <IconButton>
                    <AccessTimeIcon />
                    <Typography>
                      Hạn nộp:
                      <span style={{ color: "black" }}>12-10-2002</span>
                    </Typography>
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={9}>
                  <Button
                    sx={{ width: "90%", mr: 1 }}
                    color="secondary"
                    variant="contained"
                  >
                    Apply
                  </Button>
                </Grid>
                <Grid item md={3}>
                  <Button
                    sx={{ width: "80%", mr: 1 }}
                    color="secondary"
                    variant="outlined"
                    startIcon={<FavoriteBorderIcon />}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Grid>
        {/*right*/}
        <Grid item xs={12} md={4}>
          <Box sx={{ width: "100%", ml: 6 }}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Box>
                    <img
                      src="https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/iposvn-61a6eab341dba.jpg"
                      alt="Company Logo"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                </Grid>
                <Grid item md={8} display="flex">
                  <Typography
                    title="CompanyCompanyCompanyCompanyCompanyCompany
                            CompanyCompanyCompanyCompanyCompanyCompany"
                    variant="h6"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    CompanyCompanyCompanyCompanyCompanyCompany
                    CompanyCompanyCompanyCompanyCompanyCompany
                  </Typography>
                </Grid>

                <Grid item md={12}>
                  <CardContent>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Box display="flex" alignItems="center" mb={2}>
                        <IconButton>
                          <ScaleIcon />
                        </IconButton>
                        <Box ml={1}>
                          <Typography variant="body1">Scale</Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            100 - 200
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <IconButton>
                          <LocationSearchingIcon />
                        </IconButton>
                        <Box ml={1}>
                          <Typography variant="body1">Location:</Typography>
                          <Typography
                            title="Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh"
                            variant="body2"
                            style={{
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "20%", // Adjust this value as needed
                            }}
                          >
                            Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho
                            Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh,
                            Ha Noi, Ho Chi Minh
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Grid>
                <Grid item md={12} textAlign={"center"}>
                  <Button>View company</Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Grid>
        <Grid container spacing={0}>
          {/*right description*/}
          <Grid item xs={12} md={8}>
            <Box sx={{ width: "100%" }}>
              <Card sx={{ width: "100%", p: 3, borderTop: "1px solid gray" }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Detail Job
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Job description
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    - Tìm kiếm mới khách hàng doanh nghiệp (Khách hàng B2B) là
                    các công ty, tổ chức có chế độ khám sức khỏe hàng năm cho
                    Cán bộ nhân viên
                    <br />
                    - Tư vấn, ký kết các hợp đồng với KH doanh nghiệp về dịch vụ
                    khám sức khỏe
                    <br />
                    - Chăm sóc các khách hàng cũ để tái ký hợp đồng, chăm sóc
                    các khách hàng từ Ban lãnh đạo đưa về
                    <br />
                    - Liên tục mở rộng mạng lưới khách hàng của các nguồn khách
                    hàng khác nhau
                    <br />
                    - Tham gia các khóa đào tạo, trao đổi kiến thức, phát triển
                    nâng cao chuyên môn
                    <br />
                    - Thực hiện các công việc khác theo sự phân công của cấp
                    trên
                    <br />
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Yêu cầu ứng viên
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    - Tốt nghiệp Cao đẳng, Đại học trở lên chuyên ngành Kinh
                    doanh, Tiếp thị, Thương mại, Y tế hoặc các ngành liên quan
                    <br />
                    - Thành thạo tin học văn phòng (Word, Excel, Powerpoint)
                    <br />
                    - Đã có từ 01 năm kinh nghiệm ở lĩnh vực khách hàng doanh
                    nghiệp (B2B)
                    <br />
                    - Ưu tiên ứng viên có network với các bộ phận Mua hàng, HCNS
                    tại các doanh nghiệp.
                    <br />
                    - Độ tuổi: 25-35 tuổi
                    <br />
                    - Kỹ năng:
                    <br />
                    + Kỹ năng quản lý công việc
                    <br />
                    + Kỹ năng lắng nghe, giao tiếp, đàm phán, thuyết phục
                    <br />
                    + Khả năng làm việc nhóm, làm việc độc lập
                    <br />
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Quyền lợi
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    - Lương cứng: 10.000.000 VNĐ - 15.000.000 VNĐ + thưởng KPI +
                    thưởng hoa hồng kinh doanh; thu nhập không giới hạn
                    <br />
                    - Thưởng KPI hàng tháng, thưởng hoa hồng kinh doanh hàng
                    tháng; thưởng hoa hồng kinh doanh năm.
                    <br />
                    - Chính sách phúc lợi rõ ràng, được tham gia bảo hiểm xã hội
                    theo đúng quy định
                    <br />
                    - Chính sách khám sức khỏe cho bản thân và gia đình
                    <br />
                    - Chế độ thưởng các dịp Lễ (30/04 - 01/05, Quốc Khánh 02/09,
                    Ngày thầy thuốc 27/02), Tết Dương lịch, Tết Âm lịch;
                    <br />
                    - Môi trường làm việc chuyên nghiệp, trẻ trung và năng động.
                    <br />
                    - Có cơ hội tham gia các khóa đào tạo để phát triển năng lực
                    <br />
                    - Được tham gia Teambuilding, year-end party, du lịch hàng
                    năm theo quy định của Công ty
                    <br />
                    - Cung cấp đầy đủ trang thiết bị làm việc (laptop, điện
                    thoại bàn,...)
                    <br />
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Địa điểm làm việc
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    - Hà Nội: PHÒNG KHÁM ĐA KHOA MIRAI: Tầng 2, Tòa 901B, Chung
                    cư Starlake, Xuân Tảo, Bắc Từ Liêm
                    <br />
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Thời gian làm việc
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    - Thứ 2 - Thứ 7 (từ 08:00 đến 17:00)
                    <br />
                    - Nghỉ 2 thứ 7 trong tháng
                    <br />
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Cách thức ứng tuyển
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    - Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay
                    dưới đây.
                    <br />
                    - Hạn nộp hồ sơ: 04/07/2024
                    <br />
                  </Typography>

                  <Grid container justifyContent="left">
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Ứng tuyển ngay
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, ml: 3 }}
                    >
                      Save
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          {/*right more information*/}
          <Grid item xs={12} md={4}>
            <Box sx={{ width: "100%", mt: 5, ml: 6 }}>
              <Card sx={{ p: 3, borderTop: "1px solid gray" }}>
                <Grid container spacing={2}>
                  <Grid item md={12} display="flex">
                    <Typography
                      variant="h6"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      More information
                    </Typography>
                  </Grid>

                  <Grid item md={12}>
                    <CardContent>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <Box display="flex" alignItems="center" mb={2}>
                          <IconButton>
                            <ScaleIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">
                              Job position
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Job position
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                          <IconButton>
                            <LocationSearchingIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">Location</Typography>
                            <Typography
                              title="Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh"
                              variant="body2"
                              style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "20%", // Adjust this value as needed
                              }}
                            >
                              Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi,
                              Ho Chi Minh, Ha Noi, Ho Chi Minh, Ha Noi, Ho Chi
                              Minh, Ha Noi, Ho Chi Minh
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                          <IconButton>
                            <LocationSearchingIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">Exp</Typography>
                            <Typography
                              variant="body2"
                              style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Exp
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                          <IconButton>
                            <LocationSearchingIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">
                              Amount position
                            </Typography>
                            <Typography
                              variant="body2"
                              style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              1
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <IconButton>
                            <LocationSearchingIcon />
                          </IconButton>
                          <Box ml={1}>
                            <Typography variant="body1">Gender</Typography>
                            <Typography
                              variant="body2"
                              style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              None
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
