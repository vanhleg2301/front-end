import { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import "./createJob.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { Box } from "@mui/system";

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
  const [comune, setComune] = useState("");
  const [address, setAddress] = useState("");
  const [inputminSalary, setInputMinSalary] = useState(0);
  const [inputmaxSalary, setInputMaxSalary] = useState(0);
  const [gender, setGender] = useState(true);
  const [typeOfWork, setTypeOfWork] = useState(true);
  const [level, setLevel] = useState(1);
  const [deadline, setDeadline] = useState(null);
  const [error, setError] = useState(null);

  const checkCompanyId = userLogin?.user?.companyID

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
    const location = { address, district, province, comune };
    const description = { JobDescription, CandidateRequirements, Benefit };
    const numberOfApplicants = parseInt(inputapplicantNumber);
    const experience = parseInt(inputexperience);
    const minSalary = parseInt(inputminSalary);
    const maxSalary = parseInt(inputmaxSalary);
    const industry = inputindustry;

    if (minSalary > maxSalary) {
      setError("Min salary must be less than max salary");
      return;
    }

    if (inputgender === "Male") {
      setGender(true);
    } else if (inputgender === "None") {
      setGender(null);
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
      numberOfApplicants,
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
      if (response.status === 403) {
        toast.error(
          <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/upgrade")}>
            Your post limit has been reached. click here and go to upgrade now!
          </Box>,
          {
            autoClose: 5000, // Automatically close the toast after 5 seconds
          }
        );
        return;
      }
      if (response.ok) {
        toast.success("Create successful");
        navigate("/recruiter/jobByRecruiter");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!checkCompanyId ? (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant='contained'
            color='info'
            sx={{
              width: "30%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#115293",
              },
              textTransform: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
            component={Link}
            to='/recruiter/companyregister'>
            <Icon sx={{ marginRight: "8px" }}>business</Icon>
            Register Company Now
          </Button>
        </Container>
      ) : (
        <Container>
          <ToastContainer />
          <div className='part'>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} className='padding-bot-20px'>
                Tiêu đề tuyển dụng
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <TextField
                  variant='standard'
                  label='Tiêu đề'
                  size='small'
                  className='width100pc'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </div>

          <div className='part'>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} className='padding-bot-20px'></Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} marginBottom={2}>
                <InputLabel shrink htmlFor='job-description'>
                  Mô tả công việc
                </InputLabel>
                <TextareaAutosize
                  aria-label='maximum height'
                  id='job-description'
                  className='width100pc'
                  minRows={4}
                  onChange={(e) => setJobDescription(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    backgroundColor: "gray",
                    color: "white",
                    border: "1px solid #ccc", // Optional: add a border for better visibility
                  }}
                />
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={10} marginBottom={2}>
                <TextField
                  variant='standard'
                  label='Yêu cầu công việc'
                  size='small'
                  className='width100pc'
                  multiline
                  onChange={(e) => setCandidateRequirements(e.target.value)}
                />
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <TextField
                  variant='standard'
                  label='Quyền lợi'
                  size='small'
                  className='width100pc'
                  multiline
                  onChange={(e) => setBenefit(e.target.value)}
                />
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </div>

          <div className='part'>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} className='padding-bot-20px'>
                Ngành nghề
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Select
                  size='small'
                  value={inputindustry}
                  className='width100pc'
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

          <div className='part'>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} className='padding-bot-20px'>
                Thông tin chung
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={4} className='padding-bot-10px'>
                Số lượng tuyển
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4} className='padding-bot-10px'>
                Loại công việc
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <TextField
                  size='small'
                  className='width100pc'
                  onChange={(e) =>
                    setInputApplicantNumber(e.target.value)
                  }></TextField>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Select
                  size='small'
                  value={inputtypeOfWork}
                  className='width100pc'
                  onChange={(e) => setInputTypeOfWork(e.target.value)}>
                  <MenuItem value={"Full time"}>Full time</MenuItem>
                  <MenuItem value={"Part time"}>Part time</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={3} className='padding-bot-10px padding-top-20px'>
                Giới tính
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={3} className='padding-bot-10px padding-top-20px'>
                Cấp bậc
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={3} className='padding-bot-10px padding-top-20px'>
                Kinh nghiệm (năm)
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <Select
                  size='small'
                  value={inputgender}
                  className='width100pc'
                  onChange={(e) => setInputGender(e.target.value)}>
                  <MenuItem value={"None"}>None</MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <Select
                  size='small'
                  value={inputlevel}
                  className='width100pc'
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
                  variant='outlined'
                  label='Kinh nghiệm'
                  className='width100pc'
                  size='small'
                  onChange={(e) =>
                    setInputExperience(e.target.value.replace(/\D/g, ""))
                  }
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={10} className='padding-bot-10px padding-top-20px'>
                <Typography>Deadline</Typography>
                <TextField
                  variant='standard'
                  type='datetime-local'
                  size='small'
                  className='width100pc'
                  onChange={(e) => setDeadline(e.target.value)}
                  inputProps={{
                    min: new Date().toISOString().slice(0, 16),
                  }}
                />
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1} />
              <Grid item xs={11} className='padding-bot-10px padding-top-20px'>
                Mức lương <Typography color='error'>{error}</Typography>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={4} className='padding-bot-10px'>
                Từ
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4} className='padding-bot-10px'>
                Đến
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <TextField
                  size='small'
                  className='width100pc'
                  onChange={(e) => setInputMinSalary(e.target.value)}
                />
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <TextField
                  size='small'
                  className='width100pc'
                  onChange={(e) => setInputMaxSalary(e.target.value)}
                />
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1} />
              <Grid item xs={11} className='padding-bot-10px padding-top-20px'>
                Địa điểm làm việc
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={3} className='padding-bot-10px padding-top-20px'>
                Tỉnh/thành phố
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={3} className='padding-bot-10px padding-top-20px'>
                Quận/huyện
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={3} className='padding-bot-10px padding-top-20px'>
                Xã/phường
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <TextField
                  variant='outlined'
                  label='Tỉnh/thành'
                  className='width100pc'
                  size='small'
                  name='province'
                  onChange={(e) => {
                    setProvince(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <TextField
                  variant='outlined'
                  label='Quận/huyện'
                  className='width100pc'
                  size='small'
                  name='district'
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <TextField
                  variant='outlined'
                  label='Xã/phường'
                  className='width100pc'
                  size='small'
                  name='comune'
                  onChange={(e) => {
                    setComune(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={11} className='padding-bot-10px padding-top-20px'>
                Địa chỉ
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                <TextField
                  variant='outlined'
                  label='Địa chỉ'
                  className='width100pc'
                  size='small'
                  name='address'
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
              className='padding-topbot-10px padding-right-20px'
              align={"end"}>
              <Button variant='outlined'>Hủy</Button>
            </Grid>
            <Grid item xs={6} className='padding-topbot-10px' align={"start"}>
              <Button variant='contained' onClick={handleSubmit}>
                Hoàn tất
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default CreateJob;
