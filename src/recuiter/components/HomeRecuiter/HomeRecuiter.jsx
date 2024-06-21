import { useState } from "react";
import { Container, Grid } from "@mui/material";
import "./HomeRecuiter.css";

const HomeRecuiter = () => {
  const [rank, setRank] = useState("");

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <div>
            <img
              src="https://blog.topcv.vn/wp-content/uploads/2020/02/Banner-blog-TopCV.jpg"
              className="width100pc height-auto"
            />
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7} className="part">
          Dashboard
        </Grid>
        <Grid item xs={5} className="part">
          <Grid container className="height-100pc">
            <Grid item xs={6}>
              User profile
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5} className="color-white bg-black">
              {rank} &nbsp; Recuiter Rank
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeRecuiter;
