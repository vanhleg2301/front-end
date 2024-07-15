import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { RequestGet } from "../../util/request";
import { NOTIFICATION } from "../../util/apiEndpoint";

export default function Notification() {
  const { userLogin } = useContext(AuthContext);
  const socket = useSocket();
  const [isOpentNotification, setIsOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [countNotification, setCountNotification] = useState(0);
  const [notificationDetail, setNotificationDetail] = useState([]);
const [meetTamp, setMeetTamp] = useState(null);

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

  const getSaveNotification = async (userId) => {
    const response = await RequestGet(
      `${NOTIFICATION}/${userId}`
    );
    console.log("SavedNotification:", response);
    return response;
  };

  useEffect(() => {
    const fetchInitialNotifications = async () => {
      const savedNotification = await getSaveNotification(userLogin.user._id);
      if (savedNotification) {
        setCountNotification(savedNotification.length);
        setNotificationDetail(savedNotification);
      }
    };

    fetchInitialNotifications();
  }, [userLogin.user._id]);

  useEffect(() => {
    if (!socket) return;

    const handleNotificationApplicant = async (data) => {
      if (data.userId !== userLogin.user._id) {
        return;
      }
      setMeetTamp(data.linkMeeting);
      const savedNotification = await getSaveNotification(data.userId);
      console.log("SavedNotification:", savedNotification);

      if (savedNotification) {
        toast.info("You have a new notification", { autoClose: 3000 });

        setCountNotification((prevCount) => prevCount + 1); // Update notification count
        setNotificationDetail((prevNotifications) => [
          ...prevNotifications,
          ...savedNotification, // Assuming the response contains an array of notifications
        ]); 
      }
    };

    socket.on("notification_for_applicant", handleNotificationApplicant);

    return () => {
      socket.off("notification_for_applicant", handleNotificationApplicant);
    };
  }, [socket, userLogin.user._id]);

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
                  {!notification.rejected && (
                    <>
                      <Typography variant='body2'>
                        And you have a meeting at:{" "}
                        {formatDate(notification.timeMeeting)}
                      </Typography>
                      <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        component={Link}
                        to={`/meet/${meetTamp}`}>
                        Meet link
                      </Button>
                    </>
                  )}
                </MenuItem>
              );
            })
        ) : (
          <MenuItem sx={{ p: 5 }}>No notifications now</MenuItem>
        )}
      </Menu>
    </>
  );
}
