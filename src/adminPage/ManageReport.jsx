import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Button, Container, Grid, TextField } from "@mui/material";
import "./ManageAccount.css";
import { useState } from "react";
import ReportManager from "./Admin/AccountsManager/ReportManager";
const ManageReport = () => {
  return (
    <>
      <Header />
      <Container align="center">
        <h2>Report Manager</h2>
        <ReportManager />
      </Container>
      <Footer />
    </>
  );
};

export default ManageReport;
