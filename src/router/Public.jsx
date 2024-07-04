import React from "react";
import { Outlet } from "react-router-dom";
import ForgotPassword from "../components/forgotPassword/ForgotPassword";
import RulePage from "../pages/RulePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import Payment from "../pages/PaymentPage/Payment";
import Result from "../pages/PaymentPage/Result";
import Subscription from "../pages/SubscriptionPage/Subscription";

export default function Public() {
  return {
    element: <Outlet />, // Render the Outlet component to render nested routes
    children: [
      { path: "/forgot", element: <ForgotPassword /> },
      { path: "/rules", element: <RulePage /> },
      { path: "/upgrade", element: <Subscription /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "/payment/pay", element: <Payment /> },
      { path: "/payment/result", element: <Result /> },
      // Define more child routes as needed
    ],
  };
}
