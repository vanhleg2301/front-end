import { Box, Typography, InputBase, Button, Grid, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function ActCompany() {
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={12}>
            <Paper
              component="form"
              elevation={0}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <SearchIcon sx={{ mr: 1 }} />
              <InputBase
                placeholder="Nhập tên công ty"
                inputProps={{ "aria-label": "search company" }}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ whiteSpace: "nowrap" }}
              >
                Tìm kiếm
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
