import React from "react";
import { Outlet } from "react-router-dom";
import RecruiterPage from "../recruiter/pages/RecruiterPage";
import Layout from "../recruiter/components/layout/Layout";
import RecuiterRegister from "../recuiter/components/recuiterregister/RecuiterRegister";
import ChooseCompany from "../recuiter/components/ChooseCompany/ChooseCompany";
import CreateJob from "../recuiter/components/createJob/createJob";
import JobList from "../recuiter/components/JobList/JobList";
import CompanyList from "../recuiter/components/companyList/CompanyList";

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
      {
        path: "jobByRecruiter",
        element: <JobList />,
      },
      {
        path: "companyByRecruiter",
        element: <CompanyList />,
      },
    ],
  };
}
