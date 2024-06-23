import { Outlet } from "react-router-dom";
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
import MeetingPage from "../pages/MeetingPage";
import HomeMeeting from "../components/meeting/HomeMeeting";
import Home from "../pages/Home";
import MeetingCall from "../components/meeting/MeetingCall";

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
            { path: "applied", element: <JobApplied /> },
            { path: "saved", element: <JobSaved /> },
            { path: "table", element: <JobList /> },
          ],
        },
      ],
    },
    { path: "/meeting/:id", element: <MeetingCall /> },
  ];
}
