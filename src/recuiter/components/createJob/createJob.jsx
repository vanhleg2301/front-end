import { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./createJob.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const CreateJob = () => {
  const navigate = useNavigate();
  const [industries, setIndustries] = useState([]);
  const { userLogin } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [JobDescription, setJobDescription] = useState("");
  const [CandidateRequirements, setCandidateRequirements] = useState("");
  const [Benefit, setBenefit] = useState("");
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
  const [typeOfWork, setTypeOfWork] = useState(true);
  const [level, setLevel] = useState(1);
  const [deadline, setDeadline] = useState(null);
  const [error, setError] = useState(null);
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
    const recruitersID = userLogin.user._id;
    const location = { address, district, province, commune };
    const description = { JobDescription, CandidateRequirements, Benefit };
    const applicantNumber = parseInt(inputapplicantNumber);
    const experience = parseInt(inputexperience);
    const minSalary = parseInt(inputminSalary);
    const maxSalary = parseInt(inputmaxSalary);
    const industry = inputindustry;

    if(minSalary > maxSalary) {
      setError("Min salary must be less than max salary");
      return;
    }

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
      recruitersID,
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
      deadline,
    };

    try {
      const response = await fetch("http://localhost:9999/job", {
        method: "POST",
        headers: { "Content-Type": "application/json", Charset: "UTF8" },
        body: JSON.stringify(newJob),
      });
      console.log(newJob);
      if (response.ok) {
        alert("Create successful");
        navigate("/recruiter/jobByRecruiter");
      } else {
        throw new Error("Create failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleLocationChange = (e) => {
  //   const { name, value } = e.target;
  //   setLocation((prevLocation) => ({
  //     ...prevLocation,
  //     [name]: value,
  //   }));
  // };

  // const handleDescriptionChange = (e) => {
  //   const { name, value } = e.target;
  //   setDescription((prevDescription) => ({
  //     ...prevDescription,
  //     [name]: value,
  //   }));
  // };

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
          <Grid item xs={10} marginBottom={2}>
            <TextField
              variant="standard"
              label="Mô tả công việc"
              size="small"
              className="width100pc"
              multiline
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={10} marginBottom={2}>
            <TextField
              variant="standard"
              label="Yêu cầu công việc"
              size="small"
              className="width100pc"
              multiline
              onChange={(e) => setCandidateRequirements(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              label="Quyền lợi"
              size="small"
              className="width100pc"
              multiline
              onChange={(e) => setBenefit(e.target.value)}
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
              onChange={(e) => setInputIndustry(e.target.value)}>
              {industries.map((i) => (
                <MenuItem key={i._id} value={i._id}>
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
              onChange={(e) =>
                setInputApplicantNumber(e.target.value)
              }></TextField>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Select
              size="small"
              value={inputtypeOfWork}
              className="width100pc"
              onChange={(e) => setInputTypeOfWork(e.target.value)}>
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
              onChange={(e) => setInputGender(e.target.value)}>
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
              onChange={(e) => setInputLevel(e.target.value)}>
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

          <Grid item xs={1}></Grid>
          <Grid item xs={10} className="padding-bot-10px padding-top-20px">
            <Typography>Deadline</Typography>
            <TextField
              variant="standard"
              type="datetime-local"
              size="small"
              className="width100pc"
              onChange={(e) => setDeadline(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1} />
          <Grid item xs={11} className="padding-bot-10px padding-top-20px">
            Mức lương {error}
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
              name="province"
              onChange={(e) => {
                setProvince(e.target.value);
              }}
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
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
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
              onChange={(e) => {
                setCommune(e.target.value);
              }}
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
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Grid>

        </Grid>
      </div>

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

export default CreateJob;
