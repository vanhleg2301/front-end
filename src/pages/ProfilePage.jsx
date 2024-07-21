import {
  Container,
  Grid,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function ProfilePage() {
  const [jobSearchEnabled, setJobSearchEnabled] = useState(false);
  const [profileSearchEnabled, setProfileSearchEnabled] = useState(false);

  const { userLogin } = useContext(AuthContext);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 4,
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
                  Chào {userLogin.user.fullName}
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
                  label="Finding job"
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
                  label="Recruiter find your CV"
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
                  ---
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
