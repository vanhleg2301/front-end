import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export default function ProfilePage() {
  const [jobSearchEnabled, setJobSearchEnabled] = useState(false);
  const [profileSearchEnabled, setProfileSearchEnabled] = useState(false);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Outlet />
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Box position="relative" display="inline-block">
                <Avatar
                  alt="Hoang Cao Viet Anh"
                  src="/path/to/avatar.jpg" // Đường dẫn đến ảnh avatar của bạn
                  sx={{ width: 100, height: 100, mx: "auto" }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "green",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: "0 4px 0 4px",
                  }}
                >
                  VERIFIED
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Chào bạn trở lại, Hoang Cao Viet Anh (K16_HL)
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Tài khoản đã xác thực
                </Typography>
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={jobSearchEnabled}
                      onChange={(e) => setJobSearchEnabled(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Đang Tắt tìm việc"
                  labelPlacement="end"
                  sx={{ display: "block", textAlign: "left", mb: 2 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={profileSearchEnabled}
                      onChange={(e) =>
                        setProfileSearchEnabled(e.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label="Cho phép NTD tìm kiếm hồ sơ"
                  labelPlacement="end"
                  sx={{ display: "block", textAlign: "left", mb: 2 }}
                />
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Khởi tạo TopCV Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
