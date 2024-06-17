import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ManageAccount from "../adminPage/ManageAccount";
import ManageCompany from "../adminPage/ManageCompany";
import Home from "../pages/Home";
import ManageReport from "../adminPage/ManageReport";
import CVManage from "../adminPage/Admin/CVManage";
import reportDetails from "../adminPage/Admin/reportDetail";
import RecuiterRegister from "../recuiter/components/recuiterregister/RecuiterRegister";
import CreateJob from "../recuiter/components/createJob/createJob";
// import AccountManagerRecuiter from "../Admin/AccountsManager/AccountManagerRecuiter";
const AuthLayout = () => {};

export default createBrowserRouter([
  { element: <Home />, path: "/" },
  {
    element: <ManageAccount />,
    path: "/accountmanager",
    // children: {
    //   {element: <AccountManagerRecuiter />,
    //   path: "/"},
    //   ,
    // },
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
  {
    element: <reportDetails />,
    path: "/reportdetail",
  },
  {
    element: <RecuiterRegister />,
    path: "/recuiterregister",
  },
  {
    element: <CreateJob />,
    path: "/createjob",
  },
]);
