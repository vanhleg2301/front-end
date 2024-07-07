import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import Avatar from "@mui/material/Avatar";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import HeaderRight from "./HeaderRight";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { AuthContext } from "../../context/AuthProvider";
import Applicant from "./subHeader/applicant";
import Recruiter from "./subHeader/recruiter";
import Admin from "./subHeader/admin";
import "./header.css";
import Notification from "./Notification";

const logoStyle = {
  width: "30px",
  height: "auto",
  cursor: "pointer",
};

function Header() {
  // Open
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCompany, setIsOpenCompany] = React.useState(false);
  const [isOpenProfile, setIsOpenProfile] = React.useState(false);
  const [isOpenTools, setIsOpenTools] = React.useState(false);

  const handleMouseEnter = (section) => {
    if (section === "jobs") {
      setIsOpen(true);
      setIsOpenCompany(false);
      setIsOpenProfile(false);
      setIsOpenTools(false);
    } else if (section === "companies") {
      setIsOpen(false);
      setIsOpenCompany(true);
      setIsOpenProfile(false);
      setIsOpenTools(false);
    } else if (section === "info") {
      setIsOpen(false);
      setIsOpenCompany(false);
      setIsOpenProfile(true);
      setIsOpenTools(false);
    } else if (section === "tools") {
      setIsOpen(false);
      setIsOpenCompany(false);
      setIsOpenProfile(false);
      setIsOpenTools(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setIsOpenCompany(false);
    setIsOpenProfile(false);
    setIsOpenTools(false);
  };

  const { login, userLogin } = React.useContext(AuthContext);

  const [role, setRole] = React.useState("");
  React.useEffect(() => {
    if (userLogin && userLogin.user) {
      if (userLogin.user.roleID === 3) {
        setRole("admin");
      } else if (userLogin.user.roleID === 2) {
        setRole("recruiter");
      } else if (userLogin.user.roleID === 1) {
        setRole("applicant");
      }
    }
  }, [userLogin]);

  return (
    <AppBar
      position='fixed'
      sx={{
        boxShadow: 0,
        backgroundColor: "transparent",
        backgroundImage: "none",
        width: "101vw",
      }}>
      <Container maxWidth={false} sx={{ px: 0 }}>
        <Toolbar
          sx={(theme) => ({
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            backdropFilter: "blur(20px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 1px rgba(0, 0, 0, 0.1), 1px 1.5px 2px -1px rgba(0, 0, 0, 0.15), 4px 4px 12px -2.5px rgba(0, 0, 0, 0.15)`
                : "0 0 1px rgba(255, 255, 255, 0.1), 1px 1.5px 2px -1px rgba(255, 255, 255, 0.15), 4px 4px 12px -2.5px rgba(255, 255, 255, 0.15)",
          })}>
          {/* Header top */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              px: 0,
            }}>
            <Box
              sx={{ ml: 2, textDecoration: "none", color: "blue" }}
              component={Link}
              to='/'>
              <img src={"mon.png"} style={logoStyle} alt='logo' />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 7 }}>
              {/*Job*/}
              <MenuItem
                onMouseEnter={() => handleMouseEnter("jobs")}
                onMouseLeave={handleMouseLeave}
                sx={{ py: "6px", px: "12px" }}
                className='menu-item'>
                <Typography variant='body2' color='text.primary'>
                  Jobs
                </Typography>
                {isOpen && (
                  <Box className='dropdown-content'>
                    <Link to='/jobs' className='dropdown-item'>
                      <IconButton disabled>
                        <SearchIcon />
                      </IconButton>
                      Find job
                    </Link>
                    <Link to='/jobs/applied' className='dropdown-item'>
                      <IconButton disabled>
                        <WorkOutlineIcon />
                      </IconButton>
                      Job applied
                    </Link>
                    <Link to='/jobs/saved' className='dropdown-item'>
                      <IconButton disabled>
                        <FavoriteBorderIcon />
                      </IconButton>
                      Job saved
                    </Link>
                  </Box>
                )}
              </MenuItem>
              {/*Companies*/}
              <MenuItem
                onMouseEnter={() => handleMouseEnter("companies")}
                onMouseLeave={handleMouseLeave}
                sx={{ py: "6px", px: "12px" }}
                className='menu-item'>
                <Typography variant='body2' color='text.primary'>
                  Companies
                </Typography>
                {isOpenCompany && (
                  <Box className='dropdown-content'>
                    <Link to='/companies' className='dropdown-item'>
                      <IconButton disabled>
                        <EmojiTransportationIcon />
                      </IconButton>
                      Companies
                    </Link>
                    <Link to='/companies' className='dropdown-item'>
                      <IconButton disabled>
                        <AutoAwesomeOutlinedIcon />
                      </IconButton>
                      Top Company
                    </Link>
                  </Box>
                )}
              </MenuItem>
              {/*Tools*/}
              <MenuItem
                onMouseEnter={() => handleMouseEnter("tools")}
                onMouseLeave={handleMouseLeave}
                sx={{ py: "6px", px: "12px" }}
                className='menu-item'>
                <Typography variant='body2' color='text.primary'>
                  Tools
                </Typography>
                {isOpenTools && (
                  <Box className='dropdown-content'>
                    <Link to='/' className='dropdown-item'>
                      <IconButton disabled>
                        <BuildCircleIcon />
                      </IconButton>
                      MBTI test
                    </Link>
                    <Link to='/' className='dropdown-item'>
                      <IconButton disabled>
                        <BuildCircleIcon />
                      </IconButton>
                      MI test
                    </Link>
                  </Box>
                )}
              </MenuItem>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
            p={4}>
            {login ? (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}>
                <MenuItem
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "inherit", // Keeps the background color unchanged
                    },
                  }}>
                  <Badge badgeContent={5} color='primary'>
                    <MailIcon color='action' />
                  </Badge>
                </MenuItem>
                <Notification/>
                {/* Avatar */}
                <MenuItem
                  sx={{
                    py: "6px",
                    px: "12px",
                  }}
                  onMouseEnter={() => handleMouseEnter("info")}
                  onMouseLeave={handleMouseLeave}>
                  <Avatar alt='User Avatar' src='' />
                  {isOpenProfile &&
                    (role === "applicant" ? (
                      <Applicant />
                    ) : role === "recruiter" ? (
                      <Recruiter />
                    ) : role === "admin" ? (
                      <Admin />
                    ) : null)}
                </MenuItem>
              </Box>
            ) : (
              <Box>
                <Button
                  color='primary'
                  variant='text'
                  size='small'
                  component={Link}
                  to='/login'>
                  Sign in
                </Button>
                <Button
                  color='info'
                  variant='contained'
                  size='small'
                  component={Link}
                  to='/register'>
                  Sign up
                </Button>
              </Box>
            )}
          </Box>
          {/* Header right */}
          <HeaderRight />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
