import { Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";

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
      { path: "/test", element: <Home /> },
    ],
  };
}
