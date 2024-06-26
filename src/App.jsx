import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Cookies from "js-cookie"; // Make sure to import Cookies
import router from "./router";


export default function App() {

  return <RouterProvider router={router} />;
};

