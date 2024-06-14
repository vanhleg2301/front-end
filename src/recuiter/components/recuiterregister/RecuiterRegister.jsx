import {} from "react";
import "./recuiterregister.css";
import {
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";

const RecuiterRegister = () => {
  return (
    <Container align={"center"}>
      <h3>Register for Recuiter</h3>
      <Grid container align={"start"}>
        <Grid item xs={12} className="margin-topbot-20px">
          <h4 className="">TÀI KHOẢN</h4>
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
          />
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Mật khẩu
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            variant="outlined"
            label="Mật khẩu từ 6-25 ký tự"
            className="width100pc"
            size="small"
          />
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Nhập lại mật khẩu
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            variant="outlined"
            label="Nhập lại mật khẩu"
            className="width100pc"
            size="small"
          />
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
          />
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Công ty
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            variant="outlined"
            label="Công ty"
            className="width100pc"
            size="small"
          />
        </Grid>
        <Grid item xs={2} className="padding-topbot-10px">
          Địa điểm làm việc
        </Grid>
        <Grid item xs={10} className="padding-topbot-10px">
          <TextField
            variant="outlined"
            label="Địa điểm làm việc"
            className="width100pc"
            size="small"
          />
        </Grid>

        <Grid item xs={12} className="margin-topbot-20px">
          <FormGroup>
            <FormControlLabel
              control={<CheckBox />}
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
          <Button variant="contained">Hoàn tất</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecuiterRegister;
