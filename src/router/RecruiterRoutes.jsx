import React from "react";
import { Outlet } from "react-router-dom";
import RecruiterPage from "../recruiter/pages/RecruiterPage";
import Layout from "../recruiter/components/layout/Layout";
import ChooseCompany from "../recuiter/components/ChooseCompany/ChooseCompany";
import CreateJob from "../recuiter/components/createJob/createJob";
import JobList from "../recuiter/components/JobList/JobList";
import CompanyList from "../recuiter/components/companyList/CompanyList";
import CompanyDetail from "../recuiter/components/companyList/CompanyDetail";
import JobDetail from "../recuiter/components/JobList/JobDetail";
import ProfileRecruiter from "../recuiter/components/profile/ProfileRecruiter";
import WaitActiveCompany from "../recuiter/components/companyList/WaitActiveCompany";
import { SocketProvider } from "../context/socket";
import WaitingAccepted from "../pages/WaitingAccepted";

export default function RecruiterRoutes() {
  return [
    {
      path: "/recruiter",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { index: true, element: <RecruiterPage /> },
        { path: "companyregister", element: <ChooseCompany /> },
        { path: "waiting", element: <WaitActiveCompany /> },
        { path: "createjob", element: <CreateJob /> },
        { path: "jobByRecruiter", element: <JobList /> },
        { path: "jobByRecruiter/:jobId", element: <JobDetail /> },
        { path: "companyByRecruiter", element: <CompanyList /> },
        { path: "companyByRecruiter/:companyId", element: <CompanyDetail /> },
        { path: "profile", element: <ProfileRecruiter /> },
      ],
    }
  ];
}
