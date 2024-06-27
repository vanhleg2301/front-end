import { Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import JobDetail from "../components/jobs/JobDetail";
import CompanyDetail from "../components/companies/CompanyDetail";
import CompanyList from "../components/companies/CompanyList";
import JobList from "../components/jobs/JobList";
import JobPage from "../pages/JobPage";
import Job from "../components/jobs/Job";
import CompanyPage from "../pages/CompanyPage";
import MeetingPage from "../pages/MeetingPage";
import HomeMeeting from "../components/meeting/HomeMeeting";
import Home from "../pages/Home";
import MeetingCall from "../components/meeting/MeetingCall";
import CheckRole23 from "./CheckRole23";
import React from "react";

export default function publicRoutes() {
  return [
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          element: <CheckRole23 roles={[2, 3]} />,
          children: [
            { index: true, element: <Home /> },
            {
              path: "meeting",
              element: <MeetingPage />,
              children: [{ index: true, element: <HomeMeeting /> }],
            },
            {
              path: "companies",
              element: <CompanyPage />,
              children: [
                { index: true, element: <CompanyList /> },
                { path: ":companyID", element: <CompanyDetail /> },
              ],
            },
            {
              path: "jobs",
              element: <JobPage />,
              children: [
                { index: true, element: <Job /> },
                { path: ":jobId", element: <JobDetail /> },
                { path: "table", element: <JobList /> },
              ],
            },
          ],
        },
      ],
    },
    { path: "/meeting/:id", element: <MeetingCall /> },
  ];
}
