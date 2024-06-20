import {} from "react";
import { Container, Grid } from "@mui/material";

const reportDetails = () => {
  return (
    <Container className="text-align-center">
      <h2>Report Detail</h2>
      <Grid>
        <Grid item xs={4}>
          Report ID
        </Grid>
        <Grid item xs={8}>
          1234567
        </Grid>
      </Grid>
    </Container>
  );
};

export default reportDetails;
