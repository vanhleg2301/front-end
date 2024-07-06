import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="managercv">
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Manager cv" />
    </ListItemButton>
    <ListItemButton component={Link} to="managerjob">
      <ListItemIcon>
        <AppRegistrationIcon />
      </ListItemIcon>
      <ListItemText primary="Manager job" />
    </ListItemButton>
    <ListItemButton component={Link} to="managercompanies">
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Manager companies" />
    </ListItemButton>
    <ListItemButton component={Link} to="managerrecruiter">
    <ListItemIcon>
      <BusinessIcon />
    </ListItemIcon>
    <ListItemText primary="Manager recruiter" />
  </ListItemButton>
    <ListItemButton component={Link} to="managerapplicant">
    <ListItemIcon>
      <BusinessIcon />
    </ListItemIcon>
    <ListItemText primary="Manager applicant" />
  </ListItemButton>
  <ListItemButton component={Link} to="profile">
    <ListItemIcon>
      <AccountCircleIcon />
    </ListItemIcon>
    <ListItemText primary="Your profile" />
  </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
