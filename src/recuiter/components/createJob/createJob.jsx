import { useEffect } from "react";
import { Container, Grid, MenuItem, Select, TextField } from "@mui/material";
import "./createJob.css";
import { useState } from "react";

const CreateJob = () => {
  const [industries, setIndustries] = useState([]);

  const [title, setTitle] = useState("");
  const [desciption, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [gender, setGender] = useState(null);
  const [applicantNumber, setApplicantNumber] = useState(0);
  const [typeofwork, setTypeofWork] = useState("");
  const [level, setLevel] = useState("");
  const [experience, setExperience] = useState(0);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [address, setAddress] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:9999/auth")
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setRecuiters(data.filter((a) => a.roleID === 2));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <Container>
      <div className="part">
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className="padding-bot-20px">
            Tiêu đề tuyển dụng
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              label="Tiêu đề"
              size="small"
              className="width100pc"
            />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>

      <div className="part">
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className="padding-bot-20px">
            Mô tả công việc
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              label="Mô tả công việc"
              size="small"
              className="width100pc"
              multiline
            />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>

      <div className="part">
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className="padding-bot-20px">
            Ngành nghề
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Select size="small" value={""} className="width100pc"></Select>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>

      <div className="part">
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className="padding-bot-20px">
            Thông tin chung
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={4} className="padding-bot-10px">
            Số lượng tuyển
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4} className="padding-bot-10px">
            Loại công việc
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <TextField size="small" className="width100pc"></TextField>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Select size="small" value={""} className="width100pc"></Select>
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={3} className="padding-bot-10px padding-top-20px">
            Giới tính
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={3} className="padding-bot-10px padding-top-20px">
            Cấp bậc
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3} className="padding-bot-10px padding-top-20px">
            Kinh nghiệm (năm)
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Select
              size="small"
              value={""}
              className="width100pc"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={true}>Nam</MenuItem>
              <MenuItem value={false}>Nữ</MenuItem>
              <MenuItem value={null}>Không yêu cầu</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Select
              size="small"
              value={""}
              className="width100pc"
              onChange={(e) => setLevel(e.target.value)}
            >
              <MenuItem value={1}>Intern</MenuItem>
              <MenuItem value={2}>Fresher</MenuItem>
              <MenuItem value={3}>Junior</MenuItem>
              <MenuItem value={4}>Middle</MenuItem>
              <MenuItem value={5}>Senior</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              label="Kinh nghiệm"
              className="width100pc"
              size="small"
              onChange={(e) => setExperience(e.target.value)}
            />
          </Grid>

          <Grid item xs={1} />
          <Grid item xs={11} className="padding-bot-10px padding-top-20px">
            Địa điểm làm việc
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={3} className="padding-bot-10px padding-top-20px">
            Tỉnh/thành phố
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={3} className="padding-bot-10px padding-top-20px">
            Quận/huyện
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3} className="padding-bot-10px padding-top-20px">
            Xã/phường
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              label="Tỉnh/thành"
              className="width100pc"
              size="small"
              onChange={(e) => setProvince(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              label="Quận/huyện"
              className="width100pc"
              size="small"
              onChange={(e) => setDistrict(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              label="Xã/phường"
              className="width100pc"
              size="small"
              onChange={(e) => setCommune(e.target.value)}
            />
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={11} className="padding-bot-10px padding-top-20px">
            Địa chỉ
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <TextField
              variant="outlined"
              label="Xã/phường"
              className="width100pc"
              size="small"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default CreateJob;
