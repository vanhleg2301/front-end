import { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { formatDate } from "../../../util/formatHelpers";
import { RequestDelete } from "../../../util/request";
import { APIJOB } from "../../../util/apiEndpoint";
import "./JobList.css";

const JobList = () => {
  const { userLogin } = useContext(AuthContext);
  const recruiterID = userLogin.user._id;
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [amountCv, setAmountCv] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/${APIJOB}/recruiter/${recruiterID}`
        );
        const data = await response.json();
        const sortedJobs = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobs(sortedJobs);
        // console.log(sortedJobs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const getAmountCv = async () => {
      try {
        const cvsData = {};
        for (let job of jobs) {
          const res = await fetch(`http://localhost:9999/job/jobCv/${job._id}`);
          const data = await res?.json();
          cvsData[job?._id] = data?.length;
        }
        console.log(amountCv);
        setAmountCv(cvsData);
      } catch (error) {
        console.log(error);
      }
    };
    if (jobs.length > 0) {
      getAmountCv();
    }
  }, [jobs]);


  const filteredJobs = jobs.filter((job) =>
    job?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : title;
  };

  const handleDelete = async (id) => {
    const comfirmDelete = window.confirm("Are you sure to delete this job?");
    try {
      if(!comfirmDelete) return;
      await RequestDelete(`${APIJOB}/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job?._id !== id));
    } catch (error) {
      console.error("Failed to delete the job:", error);
    }
  };

  return (
    <Container>
      <h2>List Job of Recruiter</h2>
      <TextField
        label="Search Jobs"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell sx={{ textAlign: "center" }}>MinSalary - MaxSalary</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>CvApplied</TableCell>
              <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                Function
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs?.map((j, index) => (
              <TableRow hover key={j?._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link style={{ textDecoration: "none", color: 'white' }} to={j?._id}>
                    {truncateTitle(j?.title)}
                  </Link>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{j?.minSalary} - {j?.maxSalary}</TableCell>
                <TableCell>{formatDate(j.deadline)}</TableCell>
                <TableCell>{amountCv[j?._id] || 0}</TableCell>
                <TableCell>
                  <Button color="primary" variant="contained">
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(j?._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default JobList;
