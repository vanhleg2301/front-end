import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Act from "../action/Act";

export default function JobDetail() {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Act />
        </Box>
      </Container>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8}>
            <Box sx={{ width: "100%" }}>
              <Card sx={{ p: 3 }}>
                <Typography>
                  Nhân Viên Kiến Trúc, Tư Vấn, Thiết Kế - Thu Nhập Từ 10-30
                  Triệu
                </Typography>
                <Box></Box>
                <Typography>Hạn nộp</Typography>
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
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ width: "100%" }}>
              <Card sx={{ p: 3 }}>
                <Typography>Công ty</Typography>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
