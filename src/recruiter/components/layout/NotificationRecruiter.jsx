import React from "react";
import { useSocket } from "../../../context/socket";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../../util/formatHelpers";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";
import { RequestGet } from "../../../util/request";
import { NOTIFICATION } from "../../../util/apiEndpoint";

export default function NotificationRecruiter() {
  const { userLogin } = React.useContext(AuthContext);
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

  const getSaveNotification = async (userId) => {
    try {
      const response = await RequestGet(`${NOTIFICATION}/${userId}`);
      return response;
    } catch (error) {
      console.log("SaveNotification fail:", error);
    }
  };

  React.useEffect(() => {
    const fetchInitialNotifications = async () => {
      const savedNotification = await getSaveNotification(userLogin.user._id);
      if (savedNotification) {
        setCountNotification(savedNotification.length);
        setNotificationDetail(savedNotification);
      }
    };

    fetchInitialNotifications();
  }, [userLogin.user._id]);

  React.useEffect(() => {
    if (!socket) return;

    const handleNotification = async (data) => {
      console.log(data);
      console.log(data.message); // Display notification message

      const savedNotification = await getSaveNotification(userLogin.user._id);

      toast.info("You have a new notification", { autoClose: 3000 });

      setCountNotification((prevCount) => prevCount + 1); // Update notification count
      setNotificationDetail((prevNotifications) => [
        ...prevNotifications,
        ...savedNotification,
      ]); // Update notification detail
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket, userLogin.user._id]);

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
                <MenuItem key={index} sx={{ p: 0 }}>
                  <Card variant='outlined' sx={{ p: 2 }}>
                    <CardContent>
                      <Typography
                      sx={{textDecoration: 'none'}}
                      title={notification.message}
                        color='white'
                        variant='body2'
                        component={Link}
                        to={`jobByRecruiter/${notification.jobId}`}>
                        {message} at {formatDate(notification.updatedAt)}
                      </Typography>
                    </CardContent>
                  </Card>
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
