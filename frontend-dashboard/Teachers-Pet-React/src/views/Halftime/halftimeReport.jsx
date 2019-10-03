import React from "react";
import { AutoRotatingCarousel } from "material-auto-rotating-carousel";
import { Slide } from "material-auto-rotating-carousel";
import { indigo, blue, deepOrange, green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Logo1 from "./FrontendIcons/Halftime1.png";
import Logo2 from "./FrontendIcons/students.png";
import Logo3 from "./FrontendIcons/TeachingPed.png";
import Logo4 from "./FrontendIcons/TopicsToCover.png";

export default class halftimeReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  render() {
    return (
      <div style={{ position: "relative", width: "100%", height: 500 }}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ open: true })}
        >
          Click here to open Halftime Report!
        </Button>
        <AutoRotatingCarousel
          label="Close"
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          onStart={() => this.setState({ open: false })}
          style={{ position: "absolute" }}
        >
          <Slide
            media={<img src={Logo1} />}
            mediaBackgroundStyle={{ backgroundColor: indigo[400] }}
            style={{ backgroundColor: indigo[600] }}
            title="Average Engagement Value:"
            subtitle="4.68"
          />
          <Slide
            media={<img src={Logo2} />}
            mediaBackgroundStyle={{ backgroundColor: deepOrange[400] }}
            style={{ backgroundColor: deepOrange[600] }}
            title="Least Engaged Students"
            subtitle="Jun Jia | Suyash"
          />
          <Slide
            media={<img src={Logo3} />}
            mediaBackgroundStyle={{ backgroundColor: green[400] }}
            style={{ backgroundColor: green[600] }}
            title="Teaching Pedagogy"
            subtitle="We recommend more discussion activities!"
          />
          <Slide
            media={<img src={Logo4} />}
            mediaBackgroundStyle={{ backgroundColor: blue[400] }}
            style={{ backgroundColor: blue[600] }}
            title="Recap These Topics"
            subtitle="Recursion Functions | Time Complexity of Recursion"
          />
        </AutoRotatingCarousel>
      </div>
    );
  }
}
