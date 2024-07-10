import { Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import JobDetail from "../components/jobs/JobDetail";
import CompanyDetail from "../components/companies/CompanyDetail";
import CompanyList from "../components/companies/CompanyList";
import JobList from "../components/jobs/JobList";
import JobPage from "../pages/JobPage";
import Job from "../components/jobs/Job";
import CompanyPage from "../pages/CompanyPage";
import Home from "../pages/Home";
import CheckRole23 from "./CheckRole23";
import React from "react";
import { SocketProvider } from "../context/socket";
import Room from "../pages/MeetingPages/Room";
import CheckRole13 from "./CheckRole13";
import HomeMeeting from "../pages/MeetingPages/HomeMeeting";
import WaitingAccepted from "../pages/WaitingAccepted";

export default function publicRoutes() {
  return [
    {
      element: <CheckRole23 roles={[2, 3]} />,
      children: [
        {
          path: "/",
          element: (
            <Layout>
              <Outlet />
            </Layout>
          ),

          children: [
            { index: true, element: <Home /> },
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
                {
                  path: ":jobId",
                  element: (
                    <SocketProvider>
                      <Outlet />
                    </SocketProvider>
                  ),
                  children: [{ index: true, element: <JobDetail /> }],
                },
                { path: "table", element: <JobList /> },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/meet",
      element: (
        <SocketProvider>
          <Outlet />
        </SocketProvider>
      ),
      children: [
        {
          element: <CheckRole13 roles={[0]} />,
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
      ],
    },
    {
      path: "/waiting-accepted",
      element: <WaitingAccepted />,
    },
  ];
}
