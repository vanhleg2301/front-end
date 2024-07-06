import { useState, useEffect } from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Table,
  Link,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import {} from "@mui/icons-material";
const ManageJob = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/job")
      .then((resp) => resp.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:9999/job/${id}/reject`, {
        method: "PATCH",
      });

      if (response.ok) {
        window.alert("Reject successful");
      } else {
        window.alert("Failed to Reject job");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred");
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:9999/job/${id}/approve`, {
        method: "PATCH",
      });

      if (response.ok) {
        window.alert("Approve successful");
      } else {
        window.alert("Failed to Approve job");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred");
    }
  };
  return (
    <Container className="text-align-center">
      <h2>Manage Jobs</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Min Salary</TableCell>
              <TableCell>Max Salary</TableCell>
              <TableCell colspan={2}>Action</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((j) => (
              <TableRow hover>
                <TableCell>
                  <Link style={{ textDecoration: "none" }} to={`job/${j._id}`}>
                    {j._id}
                  </Link>
                </TableCell>
                <TableCell>{j.title}</TableCell>
                <TableCell>{j.minSalary}</TableCell>
                <TableCell>{j.maxSalary}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={(e) => handleApprove(e.target.value)}
                    value={j._id}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => handleReject(e.target.value)}
                    value={j._id}
                  >
                    Reject
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

export default ManageJob;
