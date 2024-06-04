import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Action from "../action/Action";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/job")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div>
      <div>
        <Action />
      </div>
      <h2>Job List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.desciprtion}</TableCell>
                <TableCell>{job.location.city}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{job.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
