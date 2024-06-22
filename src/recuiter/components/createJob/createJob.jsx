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
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();
  const [industries, setIndustries] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputindustry, setInputIndustry] = useState("");
  const [inputgender, setInputGender] = useState("");
  const [inputapplicantNumber, setInputApplicantNumber] = useState(0);
  const [inputtypeOfWork, setInputTypeOfWork] = useState("");
  const [inputlevel, setInputLevel] = useState("");
  const [inputexperience, setInputExperience] = useState(0);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [address, setAddress] = useState("");
  const [inputminSalary, setInputMinSalary] = useState(0);
  const [inputmaxSalary, setInputMaxSalary] = useState(0);
  const [gender, setGender] = useState(true);
  const [applicantNumber, setApplicantNumber] = useState(0);
  const [typeOfWork, setTypeOfWork] = useState(true);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [industry, setIndustry] = useState("");

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
    const location = { address, district, province, commune };
    setApplicantNumber(inputapplicantNumber);
    setExperience(inputexperience);
    setMinSalary(inputminSalary);
    setMaxSalary(inputmaxSalary);
    setIndustry(inputindustry);
    if (inputgender === "Male") {
      setGender(true);
    } else {
      setGender(false);
    }

    if (inputlevel === "Intern") {
      setLevel(1);
    } else if (inputlevel === "Fresher") {
      setLevel(2);
    } else if (inputlevel === "Junior") {
      setLevel(3);
    } else if (inputlevel === "Middle") {
      setLevel(4);
    } else {
      setLevel(5);
    }

    if (inputtypeOfWork === "Full time") {
      setTypeOfWork(true);
    } else {
      setTypeOfWork(false);
    }
    const newJob = {
      title,
      description,
      industry,
      gender,
      applicantNumber,
      typeOfWork,
      level,
      experience,
      location,
      minSalary,
      maxSalary,
    };

    console.log(newJob);
    try {
      const response = await fetch("http://localhost:9999/job", {
        method: "POST",
        headers: { "Content-Type": "application/json", Charset: "UTF8" },
        body: JSON.stringify(newJob),
      });
      if (response.ok) {
        alert("Create successful");
        navigate("/choosecompany");
      } else {
        throw new Error("Create failed");
      }
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
              value={inputindustry}
              className="width100pc"
              onChange={(e) => setInputIndustry(e.target.value)}
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
              onChange={(e) => setInputApplicantNumber(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Select
              size="small"
              value={inputtypeOfWork}
              className="width100pc"
              onChange={(e) => setInputTypeOfWork(e.target.value)}
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
              value={inputgender}
              className="width100pc"
              onChange={(e) => setInputGender(e.target.value)}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Select
              size="small"
              value={inputlevel}
              className="width100pc"
              onChange={(e) => setInputLevel(e.target.value)}
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
              onChange={(e) => setInputExperience(e.target.value)}
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
              onChange={(e) => setInputMinSalary(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="width100pc"
              onChange={(e) => setInputMaxSalary(e.target.value)}
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
