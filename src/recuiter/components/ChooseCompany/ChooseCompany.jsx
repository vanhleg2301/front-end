import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import "./ChooseCompany.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const ChooseCompany = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null); // Tách biến company thành selectedCompany
  const [companyName, setCompanyName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [companyErr, setCompanyErr] = useState("");
  const [newCommune, setNewCommune] = useState("");
  const [newDistrict, setNewDistrict] = useState("");
  const [newProvince, setNewProvince] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [companyStatus, setCompanyStatus] = useState(1);
  const [NumberOfEmployees, setNumberOfEmployees] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async (name) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:9999/company/search?name=${name}`);
      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue.length >= 3) {
      fetchCompanies(searchValue);
    }
  }, [searchValue]);

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
    const numberOfEmployees = parseInt(NumberOfEmployees);
    const location = `${newAddress}, ${newCommune}, ${newDistrict}, ${newProvince}`;
    const newCompany = {
      companyName: selectedCompany?.companyName || companyName,
      email,
      phoneNumber,
      location,
      taxNumber,
      numberOfEmployees: numberOfEmployees,
      companyStatus,
    };
    console.log(newCompany);
    try {
      const response = await fetch("http://localhost:9999/company", {
        method: "POST",
        headers: { "Content-Type": "application/json", Charset: "UTF8" },
        body: JSON.stringify(newCompany),
      });
      if (response.ok) {
        alert("Create successful");
        navigate("/recruiter/createjob");
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
        <Grid item xs={12} className="part" textAlign={"center"}>
          <Box>
            Existed Company
            <Autocomplete
            disabled={Boolean(companyName)}
              value={selectedCompany}
              onChange={(_, newValue) => setSelectedCompany(newValue)}
              options={companies}
              getOptionLabel={(option) => option?.companyName || ""}
              renderInput={(params) => (
                <TextField {...params} label="Select a company" variant="outlined" 
                
                />
              )}
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item xs={1}></Grid>

        <Grid item xs={12} className="part" textAlign={"center"}>
          New Company
          <Grid container>
            <Grid item xs={3} className="padding-top-20px">
              Name
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setSelectedCompany(null); // Reset selectedCompany khi người dùng thay đổi companyName
                }}
                className="width100pc"
                disabled={Boolean(selectedCompany)}
                />
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Email
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setEmail(e.target.value)}
                className="width100pc"></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Phone number
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="width100pc"></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Address
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNewAddress(e.target.value)}
                className="width100pc padding-top-20px"></TextField>
            </Grid>
            <Grid item xs={3} className="padding-top-20px">
              Commune
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNewCommune(e.target.value)}
                className="width100pc padding-top-20px"></TextField>
            </Grid>
            <Grid item xs={3} className="padding-top-20px">
              District
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNewDistrict(e.target.value)}
                className="width100pc padding-top-20px"></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Province
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNewProvince(e.target.value)}
                className="width100pc padding-top-20px"></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Tax Number
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setTaxNumber(e.target.value)}
                className="width100pc padding-top-20px"></TextField>
            </Grid>

            <Grid item xs={3} className="padding-top-20px">
              Number of Employees
            </Grid>
            <Grid item xs={9} className="padding-top-20px">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => setNumberOfEmployees(e.target.value)}
                className="width100pc padding-top-20px"></TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          xs={6}
          className="padding-topbot-10px padding-right-20px"
          align={"end"}>
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
