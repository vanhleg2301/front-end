import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
const SOCKET_SERVER_URL = "http://localhost:9999"; // Extracted as a constant for easier maintenance

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let connection;
    try {
      connection = io(SOCKET_SERVER_URL);
      console.log("socket connection", connection);
      setSocket(connection);
    } catch (error) {
      console.error("Socket connection error:", error);
    }

    return () => {
      if (connection) {
        connection.disconnect();
        console.log("socket disconnected");
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
