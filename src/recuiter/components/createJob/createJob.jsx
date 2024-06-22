import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./createJob.css";
import { RequestPost } from "../../../util/request";
import { APIJOB } from "../../../util/apiEndpoint";

const CreateJob = () => {
  const [industries, setIndustries] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState({
    JobDescription: "",
    CandidateRequirements: "",
    Benefit: "",
  });
  const [industry, setIndustry] = useState("");
  const [gender, setGender] = useState("");
  const [applicantNumber, setApplicantNumber] = useState(0);
  const [typeofwork, setTypeofWork] = useState("");
  const [level, setLevel] = useState("");
  const [experience, setExperience] = useState(0);
  const [location, setLocation] = useState({
    province: "",
    district: "",
    commune: "",
    address: "",
  });
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
      location,
      minSalary,
      maxSalary,
    };

    try {
      console.log(newJob)
      const response = await RequestPost(`${APIJOB}`, newJob);
      if (response) {
        console.log("Job created successfully: ", newJob);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setDescription((prevDescription) => ({
      ...prevDescription,
      [name]: value,
    }));
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
              name="JobDescription"
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>

      <div className="part">
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              label="Yêu cầu ứng viên"
              size="small"
              className="width100pc"
              multiline
              name="CandidateRequirements"
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>

      <div className="part">
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              label="Quyền lợi"
              size="small"
              className="width100pc"
              multiline
              name="Benefit"
              onChange={handleDescriptionChange}
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
              name="province"
              onChange={handleLocationChange}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              label="Quận/huyện"
              className="width100pc"
              size="small"
              name="district"
              onChange={handleLocationChange}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              label="Xã/phường"
              className="width100pc"
              size="small"
              name="commune"
              onChange={handleLocationChange}
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
              label="Địa chỉ"
              className="width100pc"
              size="small"
              name="address"
              onChange={handleLocationChange}
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
