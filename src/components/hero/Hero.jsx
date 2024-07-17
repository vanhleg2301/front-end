import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Ad from "./Ad";
import { logoText } from "./logo";

const pictures = [
  {
    imagel: "https://static.topcv.vn/img/T1%201100x220.png",
    title: "Image 2",
  }
];

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box id="hero" >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            <Typography
              component="span"
              variant="h1"
              sx={logoText}
            >
             Ace Interview
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Discover opportunities that align with your skills and aspirations.
            Our platform connects you with top employers and offers tools to
            enhance your career journey.
          </Typography>
        </Stack>
        <Box>
         {/* <Ad pictures={pictures} />*/}
        </Box>
      </Container>
    </Box>
  );
}
