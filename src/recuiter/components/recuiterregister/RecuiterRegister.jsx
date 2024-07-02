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
  const roleID = 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecuiter = {
      username,
      password,
      email,
      fullName,
      roleID,
      phone,
    };
    console.log(newRecuiter);
    if (repassword !== password) {
      setPasswordErr("Re-password need same Password");
    } else {
      setPasswordErr("");
    }
    try {
      const response = await fetch("http://localhost:9999/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", Charset: "UTF8" },
        body: JSON.stringify(newRecuiter),
      });
      if (response.ok) {
        alert("Create successful");
        navigate("/");
      } else {
        throw new Error("Create failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container align={"center"}>
      <h3>Register for Recuiter</h3>
      <Grid container align={"start"}>
        <Grid item xs={12} className="margin-topbot-20px">
          <h4 className="">TÀI KHOẢN</h4>
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Tên đăng nhập
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            variant="outlined"
            label="Tên đăng nhập"
            className="width100pc"
            size="small"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Email đăng nhập
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            variant="outlined"
            label="Email"
            className="width100pc"
            size="small"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Mật khẩu
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            type={"password"}
            variant="outlined"
            label="Mật khẩu từ 6-25 ký tự"
            className="width100pc"
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Nhập lại mật khẩu
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            type={"password"}
            variant="outlined"
            label="Nhập lại mật khẩu"
            className="width100pc"
            size="small"
            onChange={(e) => setRePassword(e.target.value)}
          />
          <br />
          <label style={{ color: "red" }}>{passwordErr}</label>
        </Grid>

        <Grid item xs={12} className="margin-topbot-20px">
          <h4 className="">THÔNG TIN NHÀ TUYỂN DỤNG</h4>
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Họ tên
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            variant="outlined"
            label="Họ tên"
            className="width100pc"
            size="small"
            onChange={(e) => setFullName(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Số điện thoại
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            variant="outlined"
            label="Số điện thoại"
            className="width100pc"
            size="small"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} className="margin-topbot-20px">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Tôi đồng ý với điều khoản dịch vụ của Ace Interview"
            />
          </FormGroup>
        </Grid>

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

export default RecuiterRegister;
