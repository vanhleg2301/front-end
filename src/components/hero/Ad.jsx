import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Carousel, CarouselSlide } from "material-ui-carousel";

export default function Ad() {
  return (
    <Carousel>
      {this.pictures.map(({ imagel, imager, title }) => (
        <CarouselSlide key={title}>
          <GridList cellHeight={160} cols={2}>
            <GridListTile key={title} style={{ height: "auto" }}>
              <img src={imagel} alt={title} />
            </GridListTile>
          </GridList>
          {/* <Card width="100%" key={title}>
      <CardMedia
        image={imagel}
        title={title}
        style={{
        height: 0,
        width: '50%',
        paddingTop: '75%',
        }}
      />
      <CardMedia
        image={imager}
        title={title}
        style={{
        height: 0,
        width: '50%',
        paddingTop: '75%',
        }}
      />
      <CardContent>
        <Typography>{title}</Typography>
      </CardContent>
    </Card> */}
        </CarouselSlide>
      ))}
    </Carousel>
  );
}
