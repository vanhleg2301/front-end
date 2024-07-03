import { Outlet } from "react-router-dom";
import { SocketProvider } from "../context/socket";
import Layout from "../components/layout/Layout";
import JobDetail from "../components/jobs/JobDetail";
import CompanyDetail from "../components/companies/CompanyDetail";
import CompanyList from "../components/companies/CompanyList";
import JobList from "../components/jobs/JobList";
import JobPage from "../pages/JobPage";
import Job from "../components/jobs/Job";
import CompanyPage from "../pages/CompanyPage";
import JobApplied from "../components/jobs/JobApplied";
import JobSaved from "../components/jobs/JobSaved";
import Home from "../pages/Home";
import HomeMeeting from "../pages/MeetingPages/HomeMeeting";
import Room from "../pages/MeetingPages/Room";

export default function publicRoutes() {
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
            { path: ":jobId", element: <JobDetail /> },
            { path: "applied", element: <JobApplied /> },
            { path: "saved", element: <JobSaved /> },
            { path: "table", element: <JobList /> },
          ],
        },
      ],
    },
  ];
}
