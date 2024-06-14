import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Button, Container, Grid, TextField } from "@mui/material";
import "./ManageAccount.css";
import { useState } from "react";
import CompanyManager from "./Admin/AccountsManager/ManagerCompany";
const ManageCompany = () => {
  return (
    <>
      <Header />
      <Container align="center">
        <h2>Company Manager</h2>
        <CompanyManager />
      </Container>
      <Footer />
    </>
  );
};

export default ManageCompany;
