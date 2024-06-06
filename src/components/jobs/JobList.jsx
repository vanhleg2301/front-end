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
import { RequestGet } from "../../util/request";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:9999/jobs")
      .then((response) => {
        setJobs(response.data);
        // Ban đầu, khi component được render, hiển thị tất cả công việc
        setSearchedJobs(response.data);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div>
      <div>
        <Action
          onSearch={(searchedJobs) => {
            setSearchedJobs(searchedJobs);
            // Khi có tìm kiếm, đặt giá trị của searched thành true
            setSearched(true);
          }}
        />
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
            {/* Kiểm tra nếu đã có tìm kiếm thì hiển thị danh sách công việc đã tìm kiếm, ngược lại hiển thị tất cả công việc */}
            {searched
              ? searchedJobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.desciprtion}</TableCell>
                    <TableCell>{job.location.city}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                    <TableCell>{job.deadline}</TableCell>
                  </TableRow>
                ))
              : jobs.map((job) => (
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
