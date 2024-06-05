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
import ManagerCv from "../components/profile.jsx/ManagerCv";
import UploadCv from "../components/profile.jsx/UploadCv";
import Info from "../components/profile.jsx/Info";

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
          { path: "/companies/:id", element: <CompanyDetail /> },
        ],
      },

      {
        path: "/jobs",
        element: <JobPage />,
        children: [
          { index: true, element: <Job /> },
          { path: ":id", element: <JobDetail /> },
          { path: "table", element: <JobList /> },
        ],
      },
    ],
  };
}
