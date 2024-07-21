import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import Git from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import { Link } from "@mui/material";

const logoStyle = {
  width: "140px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' mt={1}>
      {"Copyright © "}
      <Typography
        color='text.secondary'
        sx={{ textDecoration: "none" }}
        component={Link}
        to='/'>
        AceInterview&nbsp;
      </Typography>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}>
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Box sx={{ ml: "-15px" }}>
              <img src={""} style={logoStyle} alt='logo of AceInterview' />
            </Box>

            <Typography
              variant='body2'
              color='text.secondary'
              mb={2}
              sx={{ mt: 5 }}>
              Go to Ace Interview.
            </Typography>
            <Stack direction='column' spacing={1} useFlexGap sx={{ mt: 5 }}>
              <Typography color='text.secondary'>
                Hotline:
                <span style={{ fontWeight: "bold" }}> 0975662339</span>
              </Typography>
              <Typography color='text.secondary'>
                Email:
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  acesuportw@gmail.com
                </span>
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}>
          <Typography variant='body2' fontWeight={600}>
            About Ace Interview
          </Typography>
          <Link color='text.secondary' href='#'>
            Features
          </Link>
          <Link color='text.secondary' href='#'>
            Testimonials
          </Link>
          <Link color='text.secondary' href='#'>
            Highlights
          </Link>
          <Link color='text.secondary' href='#'>
            Pricing
          </Link>
          <Link color='text.secondary' href='#'>
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}>
          <Typography variant='body2' fontWeight={600}>
            Company
          </Typography>
          <Link color='text.secondary' href='#'>
            About us
          </Link>
          <Link color='text.secondary' href='#'>
            Careers
          </Link>
          <Link color='text.secondary' href='#'>
            Press
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}>
          <Typography variant='body2' fontWeight={600}>
            Legal
          </Typography>
          <Link color='text.secondary' href='#'>
            Terms
          </Link>
          <Link color='text.secondary' href='#'>
            Privacy
          </Link>
          <Link color='text.secondary' href='#'>
            Contact
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}>
        <div>
          <Link color='text.secondary' href='#'>
            Privacy Policy
          </Link>
          <Typography display='inline' sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color='text.secondary' href='#'>
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction='row'
          justifyContent='left'
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}>
          <IconButton
            color='inherit'
            href='https://github.com/TanHE176226/AceInterview/tree/Tan'
            aria-label='GitHub'
            sx={{ alignSelf: "center" }}>
            <Git />
          </IconButton>
          <IconButton
            color='inherit'
            href='https://x.com/home?lang=en'
            aria-label='X'
            sx={{ alignSelf: "center" }}>
            <TwitterIcon />
          </IconButton>
          <IconButton
            color='inherit'
            href='https://www.facebook.com/'
            aria-label='LinkedIn'
            sx={{ alignSelf: "center" }}>
            <FacebookIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
