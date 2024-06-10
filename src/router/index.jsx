import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ManageAccount from "../adminPage/ManageAccount";
import ManageCompany from "../adminPage/ManageCompany";
import Home from "../pages/Home";
import AccountManagerRecuiter from "../components/Admin/AccountsManager/AccountManagerRecuiter";
import AccountsManagerApplicant from "../components/Admin/AccountsManager/AccoutManagerApllicant";
import ManageReport from "../adminPage/ManageReport";
import CVManage from "../components/Admin/CVManage";
const AuthLayout = () => {};

export default createBrowserRouter([
  { element: <Home />, path: "/" },
  {
    element: <ManageAccount />,
    path: "/accountmanager",
  },
  {
    element: <ManageCompany />,
    path: "/companymanager",
  },
  {
    element: <ManageReport />,
    path: "/reportmanager",
  },
  {
    element: <CVManage />,
    path: "/cvmanager",
  },
]);
