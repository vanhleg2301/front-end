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
} from "@mui/material";
import "./JobList.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { formatDate } from "../../../util/formatHelpers";

const JobList = () => {
  // const { recuiterId } = useParams();
  const { userLogin } = useContext(AuthContext);

  const recruiterID = userLogin.user._id; // 611c9c198208053c147edc79
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9999/job/recruiter/${recruiterID}`)
      .then((resp) => resp.json())
      .then((data) => {
        const sortedCompanies = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobs(sortedCompanies);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(jobs.map((j) => j.deadline));

  return (
    <Container>
      <h2>List Job of Recuiter</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>MinSalary</TableCell>
              <TableCell>MaxSalary</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((j) => (
              <TableRow hover>
                <TableCell>
                  <Link style={{ textDecoration: "none" }} to={j._id}>
                    {j._id}
                  </Link>
                </TableCell>
                <TableCell>{j.title}</TableCell>
                <TableCell>{j.minSalary}</TableCell>
                <TableCell>{j.maxSalary}</TableCell>
                <TableCell>{formatDate(j.deadline)}</TableCell>
                <TableCell>
                  <Button color="error" variant="contained">
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
