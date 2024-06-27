import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Grid } from "@mui/material"; // Import necessary Material-UI components
import {  RequestGet } from "../../../util/request";
import { APIJOB } from "../../../util/apiEndpoint";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { jobId } = useParams(); // Get the jobId from the URL params
  const [job, setJob] = useState(null); // Declare a state variable for job, initialize with null

  useEffect(() => {
    const fetchJob = async () => {
      const response = await RequestGet(`${APIJOB}/${jobId}`);
      setJob(response);

      console.log(response.numberOfApplicants);
    };
    fetchJob();
  }, [jobId]); // Add jobId as a dependency

  if (!job) {
    return <Typography>Loading...</Typography>;
  }


  return (
    <Container>
      <Box mt={3} p={3} boxShadow={3} borderRadius={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {job.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              {job.description.JobDescription}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              <strong>Candidate Requirements:</strong>
              {job.description.CandidateRequirements}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              <strong>Benefits:</strong> {job.description.Benefit}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Industry:</strong> {job.industry}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Type of Work:</strong>
              {job.typeOfWork === 0 ? "Full-time" : "Part-time"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Location:</strong>
              {`${job.location?.address}, ${job.location?.district}, ${job.location?.comune}, ${job.location?.province}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Salary Range:</strong>
              {`${job.minSalary} - ${job.maxSalary}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Experience Required:</strong> {`${job.experience} years`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Deadline:</strong>
              {new Date(job.deadline).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Number of Applicants:</strong> {job.numberOfApplicants}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Status:</strong>
              {job.status === 0 ? "Active" : "Inactive"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Created At:</strong>
              {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Last Updated:</strong>
              {new Date(job.updatedAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default JobDetail;
