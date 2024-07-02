import React from "react";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/system";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      style={{
        ...style,
        display: "flex",
        width: 50,
        height: 50,
        right: -25, // Half of the width to make it half outside
        zIndex: 1,
        position: "absolute",
        background: "rgba(255, 255, 255, 0.5)",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    ></Box>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      style={{
        ...style,
        display: "flex",
        width: 50,
        height: 50,
        left: -25, // Half of the width to make it half outside
        zIndex: 1,
        position: "absolute",
        background: "rgba(255, 255, 255, 0.5)",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    ></Box>
  );
}

export default function Ad({ pictures }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings} style={{ position: "relative" }}>
      {pictures.map(({ imagel, title }, index) => (
        <div key={index}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                src={imagel}
                alt={title}
                style={{ width: "100%", height: "200px" }}
              />
            </Grid>
          </Grid>
        </div>
      ))}
    </Slider>
  );
}
