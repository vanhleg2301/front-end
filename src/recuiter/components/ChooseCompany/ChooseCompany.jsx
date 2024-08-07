import { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "./ChooseCompany.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { UploadFile } from "@mui/icons-material";
import { AuthContext } from "../../../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const ChooseCompany = () => {
  const { userLogin, setUserLogin } = useContext(AuthContext);
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
  const [logoFile, setLogoFile] = useState(null);
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async (name) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:9999/company/search?name=${name}`
      );
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
    const formData = new FormData();
    formData.append("recruiterID", userLogin.user._id);
    formData.append("logo", logoFile); // Thêm file logo vào FormData
    formData.append("businessLicense", businessLicenseFile); // Thêm file businessLicense vào FormData
    formData.append("companyName", selectedCompany?.companyName || companyName); // Thêm tên công ty vào FormData
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("location", location);
    formData.append("taxNumber", taxNumber);
    formData.append("numberOfEmployees", numberOfEmployees);
    formData.append("companyStatus", companyStatus);

    try {
      const response = await fetch("http://localhost:9999/company", {
        method: "POST",
        body: formData, // Gửi FormData chứa các trường và file
      });

      const result = await response.json();
      console.log("result: ", result);
      if (response.ok) {
        const companyID = result?._id;
        const updatedUser = {
          ...userLogin,
          user: {
            ...userLogin?.user,
            companyID,
          },
        };
        setUserLogin(updatedUser);
        Cookies.set("user", JSON.stringify(updatedUser));

        alert("Create successful");
        navigate("/recruiter/companyByRecruiter");
      } else {
        throw new Error("Create failed");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const handlePatchCompany = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyId", selectedCompany?._id); // Thêm tên công ty vào FormData
    formData.append("recruiterID", userLogin.user._id);

    console.log("selectedCompany: ", formData);
    try {
      const response = await fetch("http://localhost:9999/company", {
        method: "PATCH",
        body: formData, // Gửi FormData chứa các trường và file
      });
      if (response.ok) {
        console.log("response: ", response);

        const updatedUser = {
          ...userLogin,
          user: {
            ...userLogin?.user,
            companyID: selectedCompany?._id,
          },
        };
        setUserLogin(updatedUser);
        Cookies.set("user", JSON.stringify(updatedUser));
        window.location.reload();

        alert("Select successful");
        navigate("/recruiter/companyByRecruiter");
      } else {
        toast.error("Select failed");
        throw new Error("Patch failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    setSelectedCompany(null);
    setCompanyName("");
    setNewAddress("");
    setNewCommune("");
    setNewDistrict("");
    setNewProvince("");
    setEmail("");
    setPhoneNumber("");
    setTaxNumber("");
    setNumberOfEmployees("");
    setLogoFile(null);
    setBusinessLicenseFile(null);
  };

  const truncateFileName = (name, maxLength) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  };

  return (
    <Container>
      <ToastContainer />
      <Grid container>
        <Grid item xs={12} className='part' textAlign={"center"}>
          <Box hidden={Boolean(companyName || logoFile || businessLicenseFile)}>
            <Typography variant='h4'>Existed Company</Typography>
            <Autocomplete
              value={selectedCompany}
              onChange={(_, newValue) => setSelectedCompany(newValue)}
              options={companies}
              getOptionLabel={(option) => option?.companyName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Select a company'
                  variant='outlined'
                />
              )}
              fullWidth
            />
          </Box>
        </Grid>

        <Grid container hidden={Boolean(selectedCompany)}>
          <Grid item xs={12} hidden={Boolean(selectedCompany)}>
            <Typography variant='h4' textAlign={"center"}>
              New Company
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={5}
            className='padding-bot-10px padding-top-20px'
            hidden={Boolean(selectedCompany)}>
            <Typography>Format support: .png,.jpg,.jpeg</Typography>
            <Typography>
              Selected file: {truncateFileName(logoFile?.name || "", 20)}
              {logoFile && (
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt='Selected File'
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginTop: "10px",
                  }}
                />
              )}
            </Typography>

            <Button
              sx={{
                whiteSpace: "nowrap",
                color: "white",
              }}
              variant='outlined'
              component='label'
              startIcon={<UploadFile />}>
              Choose your logo
              <input
                name='logo'
                type='file'
                accept='.png,.jpg,.jpeg'
                hidden
                onChange={(e) => setLogoFile(e.target.files[0])}
                disabled={Boolean(selectedCompany)}
              />
            </Button>
          </Grid>

          <Grid
            item
            xs={5}
            className='padding-bot-10px padding-top-20px'
            hidden={Boolean(selectedCompany)}>
            <Typography>Format support: .pdf</Typography>
            <Typography>
              Selected file:{" "}
              {truncateFileName(businessLicenseFile?.name || "", 20)}
            </Typography>
            <Button
              sx={{
                whiteSpace: "nowrap",
                color: "white",
              }}
              variant='outlined'
              component='label'
              startIcon={<UploadFile />}>
              Choose your Business LicenseFile
              <input
                name='businessLicense'
                type='file'
                hidden
                accept='.pdf'
                onChange={(e) => setBusinessLicenseFile(e.target.files[0])}
                disabled={Boolean(selectedCompany)}
              />
            </Button>
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={12}
            className='part'
            textAlign={"center"}
            hidden={Boolean(selectedCompany)}>
            <Grid container>
              <Grid item xs={3} className='padding-top-20px'>
                Name
              </Grid>
              <Grid item xs={9} className='padding-top-20px'>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    setSelectedCompany(null); // Reset selectedCompany khi người dùng thay đổi companyName
                  }}
                  className='width100pc'
                  disabled={Boolean(selectedCompany)}
                />
              </Grid>

              <Grid item xs={3} className='padding-top-20px'>
                Website
              </Grid>
              <Grid item xs={9} className='padding-top-20px'>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={Boolean(selectedCompany)}
                  className='width100pc'></TextField>
              </Grid>

              <Grid item xs={3} className='padding-top-20px'>
                Phone number
              </Grid>
              <Grid item xs={9} className='padding-top-20px'>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={Boolean(selectedCompany)}
                  className='width100pc'></TextField>
              </Grid>

              <Grid item xs={3} className='padding-top-20px'>
                Address
              </Grid>
              <Grid item xs={9} className='padding-top-20px'>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => setNewAddress(e.target.value)}
                  disabled={Boolean(selectedCompany)}
                  className='width100pc padding-top-20px'></TextField>
              </Grid>
              <Grid item xs={3} className='padding-top-20px'>
                Commune
              </Grid>
              <Grid item xs={9} className='padding-top-20px'>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => setNewCommune(e.target.value)}
                  disabled={Boolean(selectedCompany)}
                  className='width100pc padding-top-20px'></TextField>
              </Grid>
              <Grid item xs={3} className='padding-top-20px'>
                District
              </Grid>
              <Grid item xs={9} className='padding-top-20px'>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => setNewDistrict(e.target.value)}
                  disabled={Boolean(selectedCompany)}
                  className='width100pc padding-top-20px'></TextField>
              </Grid>

              <Grid item xs={3} className='padding-top-20px'>
                Province
              </Grid>
              <Grid item xs={9} className='padding-top-20px'>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => setNewProvince(e.target.value)}
                  disabled={Boolean(selectedCompany)}
                  className='width100pc padding-top-20px'></TextField>
              </Grid>

              <Grid item xs={3} className='padding-top-20px'>
                Tax Number
              </Grid>
              <Grid item xs={9} className='padding-top-20px'>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => setTaxNumber(e.target.value)}
                  disabled={Boolean(selectedCompany)}
                  className='width100pc padding-top-20px'></TextField>
              </Grid>

              <Grid item xs={3} className='padding-top-20px'>
                Number of Employees
              </Grid>
              <Grid item xs={9} className='padding-top-20px'>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => setNumberOfEmployees(e.target.value)}
                  disabled={Boolean(selectedCompany)}
                  className='width100pc padding-top-20px'></TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          xs={6}
          className='padding-topbot-10px padding-right-20px'
          align={"end"}>
          <Button variant='outlined' onClick={handleCancel}>
            Hủy
          </Button>
        </Grid>
        <Grid item xs={6} className='padding-topbot-10px' align={"start"}>
          <Button
            variant='contained'
            onClick={
              Boolean(selectedCompany) ? handlePatchCompany : handleSubmit
            }>
            Hoàn tất
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChooseCompany;
