import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Button, Container, Grid, TextField } from "@mui/material";
import "./ManageAccount.css";
import { useState } from "react";
import AccountManagerRecuiter from "../components/Admin/AccountsManager/AccountManagerRecuiter";
import AccountsManagerApplicant from "../components/Admin/AccountsManager/AccoutManagerApllicant";
const ManageAccount = () => {
  const [recuiter, setRecuiter] = useState(true);

  const updateRecuiter = (e) => {
    let value = e.target.value;
    e.preventDefault();
    if (value === "true") {
      setRecuiter(true);
      console.log(value);
    } else {
      setRecuiter(false);
      console.log(value);
    }
  };

  return (
    <>
      <Header />
      <Container align="center">
        <h2>Account Manager</h2>
        <Grid container columnSpacing={0}>
          <Grid item xs={6} className="button">
            <Button
              variant="text"
              fullWidth
              onClick={(e) => updateRecuiter(e)}
              value="true"
            >
              Recuiter
            </Button>
          </Grid>
          <Grid item xs={6} className="button">
            <Button
              variant="text"
              fullWidth
              onClick={(e) => updateRecuiter(e)}
              value="false"
            >
              Applicant
            </Button>
          </Grid>
          <Grid item xs={12} display={{ display: recuiter ? "block" : "none" }}>
            <AccountManagerRecuiter />
          </Grid>
          <Grid item xs={12} display={{ display: recuiter ? "none" : "block" }}>
            <AccountsManagerApplicant />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ManageAccount;
