import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../../../context/AuthProvider";

export default function MainListItems() {
  return (
    <React.Fragment>
      <ListItemButton component={Link} to='/recruiter'>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItemButton>
      <ListItemButton component={Link} to='createjob'>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary='Create job' />
      </ListItemButton>

      <ListItemButton component={Link} to='companyregister'>
        <ListItemIcon>
          <AppRegistrationIcon />
        </ListItemIcon>
        <ListItemText primary='Company sign up' />
      </ListItemButton>

      <ListItemButton component={Link} to='jobByRecruiter'>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary='Job list' />
      </ListItemButton>
      <ListItemButton component={Link} to='companyByRecruiter'>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary='Your company' />
      </ListItemButton>
      <ListItemButton component={Link} to='profile'>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary='Your profile' />
      </ListItemButton>
    </React.Fragment>
  );
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component='div' inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Year-end sale' />
    </ListItemButton>
  </React.Fragment>
);
