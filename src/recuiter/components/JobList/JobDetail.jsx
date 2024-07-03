import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { RequestGet } from "../../../util/request";
import { APIJOB } from "../../../util/apiEndpoint";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../util/formatHelpers";

const JobDetail = () => {
  const { jobId } = useParams(); // Get the jobId from the URL params
  const [job, setJob] = useState(null); // Declare a state variable for job, initialize with null
  const [dataJob, setDataJob] = useState(null);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    const fetchJob = async () => {
      const response = await RequestGet(`${APIJOB}/${jobId}`);
      setJob(response);
    };

    const fetchCvOfJob = async () => {
      const response = await RequestGet(`${APIJOB}/jobCv/${jobId}`);
      setDataJob(response);
    };

    fetchJob();
    fetchCvOfJob();
  }, [jobId, reload]); // Add jobId as a dependency


  const handleReload = () => {
    setReload(!reload);
  };

  const handleOpenFile = (fileURL) => {
    console.log("decodedURL:", fileURL);
    window.open(fileURL, "_blank");
  };

  if (!job) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Box mt={3} p={3} boxShadow={3} borderRadius={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom>
              {job.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' paragraph>
              {job.description.JobDescription}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' paragraph>
              <strong>Candidate Requirements:</strong>
              {job.description.CandidateRequirements}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' paragraph>
              <strong>Benefits:</strong> {job.description.Benefit}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2'>
              <strong>Industry:</strong> {job.industry}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2'>
              <strong>Type of Work:</strong>
              {job.typeOfWork === 0 ? "Full-time" : "Part-time"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2'>
              <strong>Location:</strong>
              {`${job.location?.address}, ${job.location?.district}, ${job.location?.comune}, ${job.location?.province}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2'>
              <strong>Salary Range:</strong>
              {`${job.minSalary} - ${job.maxSalary}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2'>
              <strong>Experience Required:</strong> {`${job.experience} years`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2'>
              <strong>Deadline:</strong>
              {new Date(job.deadline).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2'>
              <strong>Number of Applicants:</strong> {job.numberOfApplicants}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2'>
              <strong>Status:</strong>
              {job.status === 0 ? "Active" : "Inactive"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2'>
              <strong>Created At:</strong>
              {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2'>
              <strong>Last Updated:</strong>
              {new Date(job.updatedAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3} p={3} boxShadow={3} borderRadius={2}>
        {/*View Cv List*/}
        <Typography variant='h4'>List cv of job</Typography>
        <IconButton size='small' aria-label='reload' onClick={handleReload}>
          <RefreshIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Update at</TableCell>
                    <TableCell>FullName</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Cv</TableCell>
                    <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                      Function
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataJob ? (
                    dataJob.map((j, index) => (
                      <TableRow hover key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{formatDate(j.updatedAt)}</TableCell>
                        <TableCell>{j.applicantID.fullName}</TableCell>
                        <TableCell>{j.applicantID.email}</TableCell>
                        <TableCell onClick={() => handleOpenFile(j.fileURL)}>
                          <Button color='primary' variant='contained'>
                            View Cv
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button color='primary' variant='contained'>
                            Pick
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button color='error' variant='contained'>
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        No CVs found for this job.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default JobDetail;
