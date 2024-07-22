import { Grid, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIJOB } from "../../../util/apiEndpoint";
import { RequestGet } from "../../../util/request";
import { formatSalary } from "../../../util/formatHelpers";

export default function Detail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await RequestGet(`${APIJOB}/${jobId}`);
      setJob(response);
    };

    fetchJob();
  }, [jobId]);

  const formatJobDescription = (description) => {
    return description.split("-").map(
      (item, index) =>
        item && (
          <React.Fragment key={index}>
            <span>&#8211; {item.trim()}</span>
            <br />
          </React.Fragment>
        )
    );
  };

  if (!job) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant='h3' gutterBottom>
        {job?.title}
      </Typography>
      
      <Box sx={{ mb: 3, borderBottom: '1px solid #ddd', pb: 2 }}>
        <Typography variant='h6' gutterBottom>
          Job Description
        </Typography>
        <Typography variant='body1'>
          {formatJobDescription(job?.description?.JobDescription)}
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3, borderBottom: '1px solid #ddd', pb: 2 }}>
        <Typography variant='h6' gutterBottom>
          Candidate Requirements
        </Typography>
        <Typography variant='body1'>
          {formatJobDescription(job?.description?.CandidateRequirements)}
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3, borderBottom: '1px solid #ddd', pb: 2 }}>
        <Typography variant='h6' gutterBottom>
          Benefits
        </Typography>
        <Typography variant='body1'>
          {formatJobDescription(job?.description?.Benefit)}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Industry:
          </Typography>
          <Typography variant='body2'>
            {job?.industry}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Type of Work:
          </Typography>
          <Typography variant='body2'>
            {job?.typeOfWork === 0 ? "Full-time" : "Part-time"}
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant='body2' fontWeight='bold'>
            Location:
          </Typography>
          <Typography variant='body2'>
            {`${job?.location?.address}, ${job?.location?.district}, ${job?.location?.commune}, ${job?.location?.province}`}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Salary Range:
          </Typography>
          <Typography variant='body2'>
            {formatSalary(job?.minSalary, job?.maxSalary)}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Experience Required:
          </Typography>
          <Typography variant='body2'>
            {`${job?.experience} years`}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Deadline:
          </Typography>
          <Typography variant='body2'>
            {new Date(job?.deadline).toLocaleDateString()}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Number of Applicants:
          </Typography>
          <Typography variant='body2'>
            {job?.numberOfApplicants}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Status:
          </Typography>
          <Typography variant='body2'>
            {job?.status === 0 ? "Active" : "Inactive"}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Created At:
          </Typography>
          <Typography variant='body2'>
            {new Date(job?.createdAt).toLocaleDateString()}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Last Updated:
          </Typography>
          <Typography variant='body2'>
            {new Date(job?.updatedAt).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
