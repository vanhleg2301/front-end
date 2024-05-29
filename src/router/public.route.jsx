import { Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import JobDetail from "../components/jobs/JobDetail";
import CompanyDetail from "../components/companies/CompanyDetail";
import CompanyList from "../components/companies/CompanyList";
import JobList from "../components/jobs/JobList";

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
      { path: "/jobs/", element: <JobList /> },
      { path: "/companies/", element: <CompanyList /> },
      { path: "/jobs/:id", element: <JobDetail /> },
      { path: "/companies/:id", element: <CompanyDetail /> },
    ],
  };
}
