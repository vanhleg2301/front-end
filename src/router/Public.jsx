import React from "react";
import { Outlet } from "react-router-dom";
import ForgotPassword from "../components/forgotPassword/ForgotPassword";
import RulePage from "../pages/RulePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import Payment from "../pages/PaymentPage/Payment";
import Result from "../pages/PaymentPage/Result";
import Subscription from "../pages/SubscriptionPage/Subscription";
import { SocketProvider } from "../context/socket";
import Transactions from "../pages/PaymentComponents/Transactions";

export default function Public() {
  return {
    element: <Outlet />, // Render the Outlet component to render nested routes
    children: [
      { path: "/forgot", element: <ForgotPassword /> },
      { path: "/rules", element: <RulePage /> },
      { path: "/upgrade", element: <Subscription /> },

      {
        path: "/payment",
        element: (
          <SocketProvider>
            <Outlet />
          </SocketProvider>
        ),
        children: [
          { index: true, element: <PaymentPage /> },
          { path: "/payment/pay", element: <Payment /> },
          { path: "/payment/result", element: <Result /> },
          { path: "/payment/transactions", element: <Transactions /> },
        ],
      },

      // Define more child routes as needed
    ],
  };
}
