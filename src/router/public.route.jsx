import { Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import JobDetail from "../components/jobs/JobDetail";
import CompanyDetail from "../components/companies/CompanyDetail";
import CompanyList from "../components/companies/CompanyList";
import JobList from "../components/jobs/JobList";
import JobPage from "../pages/JobPage";
import Job from "../components/jobs/Job";

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
      { path: "/companies/", element: <CompanyList /> },
      { path: "/companies/:id", element: <CompanyDetail /> },
      {
        path: "/jobs",
        element: <JobPage />,
        children: [
          { path: "all", element: <Job /> },
          { path: ":id", element: <JobDetail /> },
        ],
      },
    ],
  };
}
