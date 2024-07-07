import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/socket";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/formatHelpers";

export default function Notification() {
  const socket = useSocket();
  const [isOpentNotification, setIsOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [countNotification, setCountNotification] = useState(0);
  const [notificationDetail, setNotificationDetail] = useState([]);

  const handleMouseEnter = (section) => {
    if (section === "notification") {
      setIsOpenNotification(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpenNotification(false);
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log("socket from notification:", socket);
    if (!socket) return;

    const handleNotificationApplicant = (data) => {
      console.log("Received notification:", data);
      // Save notification in session storage
      const storedNotifications =
        JSON.parse(sessionStorage.getItem("notification_applicant")) || [];
      storedNotifications.push(data);
      sessionStorage.setItem(
        "notification_applicant",
        JSON.stringify(storedNotifications)
      );

      setCountNotification(storedNotifications.length); // Update notification count
      setNotificationDetail(storedNotifications); // Update notification detail
    };

    socket.on("notification_for_applicant", handleNotificationApplicant);

    return () => {
      socket.off("notification_for_applicant", handleNotificationApplicant);
    };
  }, [socket]);

  useEffect(() => {
    // Retrieve notifications from session storage on component mount
    const storedNotifications =
      JSON.parse(sessionStorage.getItem("notification_applicant")) || [];
    setCountNotification(storedNotifications.length);
    setNotificationDetail(storedNotifications);
  }, []);

  return (
    <>
      <IconButton
        color='primary'
        onClick={handleNotificationClick}
        onMouseEnter={() => handleMouseEnter("notification")}
        onMouseLeave={handleMouseLeave}>
        <Badge badgeContent={countNotification} color='primary'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        sx={{ mt: 1 }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleNotificationClose}
        onMouseEnter={() => handleMouseEnter("notification")}
        onMouseLeave={handleMouseLeave}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        {notificationDetail.length > 0 ? (
          notificationDetail
            .slice()
            .reverse()
            .map((notification, index) => {
              const message =
                notification.message.length > 30
                  ? notification.message.slice(0, 30) + "..."
                  : notification.message;
              return (
                <MenuItem
                  title={`${notification.message}`}
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}>
                  <Typography variant='body2'>{message} </Typography>
                  <Typography variant='body2'>
                    And you have a meeting at:{" "}
                    {formatDate(notification.timeMeeting)}
                  </Typography>

                  <Button
                    variant='outlined'
                    color='primary'
                    size='small'
                    component={Link}
                    to={`/meet/${notification.linkMeeting}`}>
                    Meet link
                  </Button>
                </MenuItem>
              );
            })
        ) : (
          <MenuItem sx={{ p: 5 }}>No notifications</MenuItem>
        )}
      </Menu>
    </>
  );
}
