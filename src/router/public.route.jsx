import { Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import JobDetail from "../components/jobs/JobDetail";
import CompanyDetail from "../components/companies/CompanyDetail";
import CompanyList from "../components/companies/CompanyList";
import JobList from "../components/jobs/JobList";
import JobPage from "../pages/JobPage";
import Job from "../components/jobs/Job";
import CompanyPage from "../pages/CompanyPage";
import ProfilePage from "../pages/ProfilePage";
import ManagerCv from "../components/profile/ManagerCv";
import UploadCv from "../components/profile/UploadCv";
import Info from "../components/profile/Info";
import RulePage from "../pages/RulePage";
import PaymentPage from "../pages/PaymentPage";
import JobApplied from "../components/jobs/JobApplied";
import JobSaved from "../components/jobs/JobSaved";
import MeetingPage from "../pages/MeetingPage";
import HomeMeeting from "../components/meeting/HomeMeeting";

export default function publicRoutes() {
  return {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/rules", element: <RulePage /> },
      { path: "/payment", element: <PaymentPage /> },
      {
        path: "/meeting",
        element: <MeetingPage />,
        children: [{ index: true, element: <HomeMeeting /> }],
      },

      {
        path: "/profile",
        element: <ProfilePage />,
        children: [
          { index: true, element: <Info /> },
          { path: "manager", element: <ManagerCv /> },
          { path: "upload", element: <UploadCv /> },
        ],
      },
      {
        path: "/companies",
        element: <CompanyPage />,
        children: [
          { path: "all", element: <CompanyList /> },
          { path: ":id", element: <CompanyDetail /> },
        ],
      },

      {
        path: "/jobs",
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
  };
}
