import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ManageAccount from "../adminPage/ManageAccount";
import ManageCompany from "../adminPage/ManageCompany";
import Home from "../pages/Home";
import AccountManagerRecuiter from "../components/Admin/AccountsManager/AccountManagerRecuiter";
import AccountsManagerApplicant from "../components/Admin/AccountsManager/AccoutManagerApllicant";
const AuthLayout = () => {};

export default createBrowserRouter([
  { element: <Home />, path: "/" },
  {
    element: <ManageAccount />,
    path: "/accountmanager",
    children: [
      { path: "recuiter", element: <AccountManagerRecuiter /> },
      { path: "applicant", element: <AccountsManagerApplicant /> },
    ],
  },
  {
    element: <ManageCompany />,
    path: "/companymanager",
  },
]);
