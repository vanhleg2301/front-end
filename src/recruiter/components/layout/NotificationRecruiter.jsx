import React from "react";
import { useSocket } from "../../../context/socket";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../../util/formatHelpers";

export default function NotificationRecruiter() {
  const [isOpentNotification, setIsOpenNotification] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [countNotification, setCountNotification] = React.useState(0);
  const [notificationDetail, setNotificationDetail] = React.useState([]);

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

  const socket = useSocket();

  React.useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      console.log(data);
      console.log(data.message); // Display notification message

      // Save notification in session storage
      const storedNotifications =
        JSON.parse(sessionStorage.getItem("notifications")) || [];
      storedNotifications.push(data);
      sessionStorage.setItem(
        "notifications",
        JSON.stringify(storedNotifications)
      );

      setCountNotification(storedNotifications.length); // Update notification count
      setNotificationDetail(storedNotifications); // Update notification detail
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  React.useEffect(() => {
    // Retrieve notifications from session storage on component mount
    const storedNotifications =
      JSON.parse(sessionStorage.getItem("notifications")) || [];
    setCountNotification(storedNotifications.length);
    setNotificationDetail(storedNotifications);
  }, []);

  return (
    <>
      <IconButton
        color='inherit'
        onClick={handleNotificationClick}
        onMouseEnter={() => handleMouseEnter("notification")}
        onMouseLeave={handleMouseLeave}>
        <Badge badgeContent={countNotification} color='secondary'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
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
                  sx={{ p: 3 }}
                  component={Link}
                  to={`jobByRecruiter/${notification.jobId}`}>
                  {message} at {formatDate(notification.updatedAt)}
                </MenuItem>
              );
            })
        ) : (
          <MenuItem sx={{ p: 3 }}>No notifications now</MenuItem>
        )}
      </Menu>
    </>
  );
}
