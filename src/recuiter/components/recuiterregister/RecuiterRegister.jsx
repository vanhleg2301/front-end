import "./recuiterregister.css";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePhone } from "../../../util/Validation";
import { toast, ToastContainer } from "react-toastify";

const RecuiterRegister = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [checked, setChecked] = useState(false);
  const [Unchecked, setUnchecked] = useState(true);
  const [checkErr, setCheckErr] = useState("");
  const [error, setError] = useState(null);
  const [userNameCheck, setUserNameCheck]= useState("");
  const [emailCheck, setEmailCheck]= useState("");
  const [fullNameCheck, setFullNameCheck]= useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecuiter = {
      username,
      password,
      email,
      fullName,
      phone,
    };
    console.log(newRecuiter);

    if(!username){
      setUserNameCheck("username is required")
      toast.error("username is required");
      return;
    } else {
      setUserNameCheck("")
    }

    if(!email){
      setEmailCheck("Email is required")
      toast.error("Email is required");
      return;
    } else {
      setEmailCheck("")
    }

    if(!password) {
      setPasswordErr("Password is required");
      toast.error("Password is required");
      return;
    } else {
      setPasswordErr("");
    }

    if (repassword !== password) {
      setPasswordErr("Re-password need same Password");
      toast.error("Re-password need same Password");
      return;
    } else {
      setPasswordErr("");
    }

    if(!fullName){
      setFullNameCheck("Full name is required")
      toast.error("Full name is required");
      return;
    } else {
      setFullNameCheck("")
    }

    if (validatePhone(phone)) {
      // console.log(validatePhone(phone));
      setError(validatePhone(phone))
      toast.error(validatePhone(phone));
      return;
    }

    if (Unchecked) {
      setCheckErr("You need to agree with the terms of service");
      toast.error("You need to agree with the terms of service");
      return;
    } else {
      setCheckErr("");
    }

    try {
      const response = await fetch(
        "http://localhost:9999/user/regis-recruiter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Charset: "UTF8" },
          body: JSON.stringify(newRecuiter),
        }
      );
      if (response.ok) {
        toast.success("Create successful");
        alert("Create successful");
        navigate("/login");
      } else {
        toast.error("Create failed");
        throw new Error("Create failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAgree = () => {
    setChecked(!checked); // Toggle the value of checked state
    setUnchecked(!Unchecked); // Toggle the value of Unchecked state
  };

  const handleClearForm = () => {
    console.log("Clear form");
    setPhone("");
    setFullName("");
    setRePassword("");
    setPassword("");
    setEmail("");
    setUserName("");
    navigate("/register");
  };

  return (
    <Container align={"center"}>
    <ToastContainer  />
      <h3>Register for Recruiter</h3>
      <Grid container >
        <Grid item md={12}align={"center"}>
          <Grid item xs={12} className="margin-topbot-20px">
            <h2 className="">Information account</h2>
          </Grid>
          <Grid item xs={7} className="padding-topbot-10px">
            <TextField
              variant="outlined"
              label="Username"
              className="width100pc"
              size="small"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={7} className="padding-topbot-10px">
            <TextField
              variant="outlined"
              label="Email"
              className="width100pc"
              size="small"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={7} className="padding-topbot-10px">
            <TextField
              type={"password"}
              variant="outlined"
              label="Password"
              className="width100pc"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={7} className="padding-topbot-10px">
            <TextField
              type={"password"}
              variant="outlined"
              label="Confirm password"
              className="width100pc"
              size="small"
              onChange={(e) => setRePassword(e.target.value)}
            />
            <br />
            <label style={{ color: "red" }}>{passwordErr}</label>
          </Grid>
        </Grid>

        <Grid item md={12} align={"center"}>
          <Grid item xs={12} className="margin-topbot-20px">
            <h2 className="">Information recruiter</h2>
          </Grid>

          <Grid item xs={10} className="padding-topbot-10px">
            <TextField
              variant="outlined"
              label="Full name"
              className="width100pc"
              size="small"
              onChange={(e) => setFullName(e.target.value)}
            />
          </Grid>

          <Grid item xs={10} className="padding-topbot-10px">
            <TextField
              variant="outlined"
              label=" Phone number"
              className="width100pc"
              size="small"
              onChange={(e) => setPhone(e.target.value)}
            />
            <label style={{ color: "red" }}>{error}</label>
          </Grid>

          <Grid item xs={10} className="margin-topbot-20px" >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleAgree} />}
              label="I agree with rules of Ace Interview"
            />

            <label style={{ color: "red" }}>{checkErr}</label>
          </FormGroup>
        </Grid>
        </Grid>

        

        <Grid
          item
          xs={6}
          className="padding-topbot-10px padding-right-20px"
          align={"end"}>
          <Button variant="outlined" onClick={handleClearForm}>
            cancel
          </Button>
        </Grid>
        <Grid item xs={6} className="padding-topbot-10px" align={"start"}>
          <Button variant="contained" onClick={handleSubmit}>
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecuiterRegister;
