import { useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import "./ChooseCompany.css";
import { useNavigate, useParams } from "react-router-dom";

const ChooseCompany = () => {
  const navigate = useNavigate();
  const { recuiters } = useParams();

  const [companies, setCompanies] = useState("");
  const [company, setCompany] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [companyErr, setCompanyErr] = useState("");
  const [newCommune, setNewCommune] = useState("");
  const [newDistrict, setNewDistrict] = useState("");
  const [newProvince, setNewProvince] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [companyStatus, setCompanyStatus] = useState("Bronze");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");

  useEffect(() => {
    fetch("http://localhost:9999/company")
      .then((resp) => resp.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const NumberOfEmployees = parseInt(numberOfEmployees);
    const location = `${newAddress}, ${newCommune}, ${newDistrict}, ${newProvince}`;
    const newCompany = {
      companyName,
      email,
      phoneNumber,
      location,
      taxNumber,
      NumberOfEmployees,
      companyStatus,
      recuiters,
    };
    console.log(newCompany);
    if (company !== "" && newCompany !== "") {
      setCompanyErr("Need 1 of 2 empty");
    } else {
      setCompanyErr("");
    }
    try {
      const response = await fetch("http://localhost:9999/company", {
        method: "POST",
        headers: { "Content-Type": "application/json", Charset: "UTF8" },
        body: JSON.stringify(newCompany),
      });
      if (response.ok) {
        alert("Create successful");
        navigate("/createjob");
      } else {
        throw new Error("Create failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={5.5} className="part">
          Existed Company
          <Grid container>
            <Grid item xs={3} className="padding-top-20px">
              Company
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setCompany(e.target.value)}
                className="width100pc"
              ></TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={1}></Grid>

        <Grid item xs={5.5} className="part">
          New Company
          <Grid container>
            <Grid item xs={3} className="padding-top-20px">
              Name
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setCompanyName(e.target.value)}
                className="width100pc"
              ></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Email
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setEmail(e.target.value)}
                className="width100pc"
              ></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Phone number
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="width100pc"
              ></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Address
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNewAddress(e.target.value)}
                className="width100pc padding-top-20px"
              ></TextField>
            </Grid>
            <Grid item xs={3} className="padding-top-20px">
              Commune
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNewCommune(e.target.value)}
                className="width100pc padding-top-20px"
              ></TextField>
            </Grid>
            <Grid item xs={3} className="padding-top-20px">
              District
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNewDistrict(e.target.value)}
                className="width100pc padding-top-20px"
              ></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Province
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNewProvince(e.target.value)}
                className="width100pc padding-top-20px"
              ></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Tax Number
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setTaxNumber(e.target.value)}
                className="width100pc padding-top-20px"
              ></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Number of Employees
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNumberOfEmployees(e.target.value)}
                className="width100pc padding-top-20px"
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          xs={6}
          className="padding-topbot-10px padding-right-20px"
          align={"end"}
        >
          <Button variant="outlined">Hủy</Button>
        </Grid>
        <Grid item xs={6} className="padding-topbot-10px" align={"start"}>
          <Button variant="contained" onClick={handleSubmit}>
            Hoàn tất
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChooseCompany;
