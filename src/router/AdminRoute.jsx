import React from "react";
import Layout from "../adminPage/layout/Layout";
import { Outlet } from "react-router-dom";
import CVManage from "../adminPage/Admin/AccountsManager/CVManage";
import ManageJob from "../adminPage/Admin/AccountsManager/ManageJob";
import CompanyManager from "../adminPage/Admin/AccountsManager/ManagerCompany";
import AccountManagerRecuiter from "../adminPage/Admin/AccountsManager/AccountManagerRecuiter";
import AccountsManagerApplicant from "../adminPage/Admin/AccountsManager/AccoutManagerApllicant";
import AdminPage from "../adminPage/page/AdminPage";

export default function AdminRoute() {
  return {
    path: "/admin",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <AdminPage /> },
      { path: "managercv", element: <CVManage /> },
      { path: "managerjob", element: <ManageJob /> },
      { path: "managercompanies", element: <CompanyManager /> },
      { path: "managerrecruiter", element: <AccountManagerRecuiter /> },
      { path: "managerapplicant", element: <AccountsManagerApplicant /> },
      { path: "profile", element: <CVManage /> },
    ],
  };
}
