import React from "react";
import { Outlet } from "react-router-dom";
import RecruiterPage from "../recruiter/pages/RecruiterPage";
import Layout from "../recruiter/components/layout/Layout";
import RecuiterRegister from "../recuiter/components/recuiterregister/RecuiterRegister";
import ChooseCompany from "../recuiter/components/ChooseCompany/ChooseCompany";
import CreateJob from "../recuiter/components/createJob/createJob";

export default function RecruiterRoutes() {
  return {
    path: "/recruiter",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <RecruiterPage /> },
      {
        path: "recruitertest",
        element: <RecuiterRegister />,
      },
      {
        path: "companyregister",
        element: <ChooseCompany />,
      },
      {
        path: "createjob",
        element: <CreateJob />,
      },
    ],
  };
}
