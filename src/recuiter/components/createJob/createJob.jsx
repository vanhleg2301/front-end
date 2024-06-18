import { useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./createJob.css";
import { useState } from "react";

const CreateJob = () => {
  const [industries, setIndustries] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [gender, setGender] = useState("");
  const [applicantNumber, setApplicantNumber] = useState(0);
  const [typeofwork, setTypeofWork] = useState("");
  const [level, setLevel] = useState("");
  const [experience, setExperience] = useState(0);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [address, setAddress] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);

  useEffect(() => {
    fetch("http://localhost:9999/industry")
      .then((resp) => resp.json())
      .then((data) => {
        setIndustries(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJob = {
      title,
      description,
      industry,
      gender,
      applicantNumber,
      typeofwork,
      level,
      experience,
      province,
      district,
      commune,
      address,
      minSalary,
      maxSalary,
    };

    console.log(newRecuiter);
    try {
      const response = await fetch("http://localhost:9999/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json", Charset: "UTF8" },
        body: JSON.stringify(newJob),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
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
            <Select
              size="small"
              value={industry}
              className="width100pc"
              onChange={(e) => setIndustry(e.target.value)}
            >
              {industries.map((i) => (
                <MenuItem key={i._id} value={i.name}>
                  {i.name}
                </MenuItem>
              ))}
            </Select>
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
            <TextField
              size="small"
              className="width100pc"
              onChange={(e) => setApplicantNumber(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Select
              size="small"
              value={typeofwork}
              className="width100pc"
              onChange={(e) => setTypeofWork(e.target.value)}
            >
              <MenuItem value={"Full time"}>Full time</MenuItem>
              <MenuItem value={"Part time"}>Part time</MenuItem>
            </Select>
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
              value={gender}
              className="width100pc"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={"Nam"}>Nam</MenuItem>
              <MenuItem value={"Nữ"}>Nữ</MenuItem>
              <MenuItem value={"Không yêu cầu"}>Không yêu cầu</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Select
              size="small"
              value={level}
              className="width100pc"
              onChange={(e) => setLevel(e.target.value)}
            >
              <MenuItem value={"Intern"}>Intern</MenuItem>
              <MenuItem value={"Fresher"}>Fresher</MenuItem>
              <MenuItem value={"Junior"}>Junior</MenuItem>
              <MenuItem value={"Middle"}>Middle</MenuItem>
              <MenuItem value={"Senior"}>Senior</MenuItem>
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
            Mức lương
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={4} className="padding-bot-10px">
            Từ
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4} className="padding-bot-10px">
            Đến
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="width100pc"
              onChange={(e) => setMinSalary(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="width100pc"
              onChange={(e) => setMaxSalary(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}></Grid>

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

export default CreateJob;
