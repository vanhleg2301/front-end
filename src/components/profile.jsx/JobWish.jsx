import { Container } from "@mui/material";
import React from "react";

export default function JobWish({ favoriteJobs }) {
  return (
    <Container>
      <h2>Job Saved</h2>
      {favoriteJobs.map((job) => (
        <div key={job._id}>
          <p>{job.title}</p>
          {/* Display other job details as needed */}
        </div>
      ))}
    </Container>
  );
}
