import React from "react";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Ad({ pictures }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {pictures.map(({ imagel, title }, index) => (
        <div key={index}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                src={imagel}
                alt={title}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </div>
      ))}
    </Slider>
  );
}
