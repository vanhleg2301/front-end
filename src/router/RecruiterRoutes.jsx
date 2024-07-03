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
import { SocketProvider } from "../context/socket";
import HomeMeeting from "../pages/MeetingPages/HomeMeeting";
import Room from "../pages/MeetingPages/Room";

export default function RecruiterRoutes() {
  return [
    {
      path: "/meet",
      element: (
        <SocketProvider>
          <Outlet />
        </SocketProvider>
      ),
      children: [
        {
          index: true,
          element: <HomeMeeting />,
        },
        {
          path: ":roomId",
          element: <Room />,
        },
      ],
    },
    {
      path: "/recruiter",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { index: true, element: <RecruiterPage /> },
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
          path: "jobByRecruiter/:jobId",
          element: <JobDetail />,
        },
        {
          path: "companyByRecruiter",
          element: <CompanyList />,
        },
        {
          path: "companyByRecruiter/:companyId",
          element: <CompanyDetail />,
        },
        {
          path: "profile",
          element: <ProfileRecruiter />,
        },
      ],
    },
  ];
}
