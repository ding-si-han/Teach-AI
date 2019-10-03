import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Grow from "@material-ui/core/Grow";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import avatar from "assets/img/faces/marc.jpg";
import { Link } from "react-router-dom";
import Danger from "components/Typography/Danger.jsx";
// material-ui Icons
import Accessibility from "@material-ui/icons/Accessibility";
import Warning from "@material-ui/icons/Warning";
import CardIcon from "components/Card/CardIcon.jsx";
import Battery from "@material-ui/icons/BatteryChargingFull";

import DateRange from "@material-ui/icons/DateRange";
import LiveClassroom from "./LiveClassroom";
import Seat from "./Seat";
import SeatBlock from "./SeatBlock";
import SeatBlock2 from "./SeatBlock2";
import sweetalertfunction1 from "../../components/Alerts/Alert1";
import sweetalertfunction2 from "../../components/Alerts/Alert2";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class LiveClassroomComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setInterval(() => {
        .then(res => res.json())
        .then(data => {
          this.setState({ database: data });
          console.log(this.state.database);
        })
        .catch(console.log);
    }, 1500);
  }

  // getRandomColor = () => {
  //   var hue_array = [
  //     "#6CC551",
  //     "#447604",
  //     "#43B929",
  //     "#43B929",
  //     "#43B929",
  //     "#FF1B1C",
  //     "#447604"
  //   ];
  //   var hue = hue_array[Math.floor(Math.random() * 5)];
  //   return hue;
  // };

  render() {
    // call for attendance alarm
    if (this.state) {
      if (this.state.database.person1 == 0) {
        sweetalertfunction2();
      }
    }

    return (
      <div>
        {/* <GridItem xs={12} sm={12} md={12}> */}
        <Grow in={true} timeout={1000}>
          <Card>
            <div
              class="allColumn"
              style={{ display: "flex", justifyContent: "spaceBetween" }}
            >
              <div class="leftColumn">
                {/* GRID FOR ATTENDANCE */}
                <GridItem xs={12} sm={12} md={12}>
                  <Card style={{ width: "250px" }}>
                    <CardHeader color="info" stats icon>
                      <CardIcon color="info" onClick={sweetalertfunction2}>
                        <Accessibility />
                      </CardIcon>
                      <p
                        className={this.props.classes.cardCategory}
                        style={{ color: "black" }}
                      >
                        {" "}
                        Attendance
                      </p>
                      <h3
                        className={this.props.classes.cardTitle}
                        style={{ color: "black" }}
                      >
                        {this.state ? (
                          <span>{this.state.database.numPerson}</span>
                        ) : (
                          <span>0</span>
                        )}
                        /40
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={this.props.classes.stats}>
                        <Danger>
                          <Warning />
                        </Danger>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          Reasons for absence
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <br />

                {/* GRID FOR ENGAGEMENT */}
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success" onClick={sweetalertfunction1}>
                        <Battery />
                      </CardIcon>
                      <p
                        style={{ color: "black" }}
                        className={this.props.classes.cardCategory}
                      >
                        Engagement
                      </p>
                      <h3
                        style={{ color: "black" }}
                        className={this.props.classes.cardTitle}
                      >
                        {this.state ? (
                          <span>{this.state.database.person1}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={this.props.classes.stats}>
                        Ranges from 1 to 5
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </div>

              {/* DIV FOR CLASSROOM LAYOUT */}
              <div style={{ float: "right", paddingTop: "30px" }}>
                <GridItem xs={12} sm={12} md={12} style={{}}>
                  <SeatBlock />
                  <SeatBlock />
                  <SeatBlock />
                  <SeatBlock2 />
                </GridItem>
                <div
                    style={{
                      marginLeft: "200px",
                      filter: "drop-shadow(0px 7px 1px black)",
                      
                    }}
                  >
                    <Link to="/students/JunJia">
                      <div
                        style={{
                          float: "left",
                          marginRight: "2px",
                          marginTop: "28px",
                          height: "43px",
                          marginLeft: "20%",
                          marginRight: "20%",
                          width: "60%",
                          background: "#972fb0",
                          color: "white",
                          textAlign: "center",
                          verticalAlign: "end",
                          position: "relative",
                          borderRadius: "2%"
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            marginTop: "12px",
                            fontSize: "13px"
                          }}
                        >
                          Whiteboard
                        </div>
                      </div>
                    </Link>
                  </div>
              </div>
            </div>
          </Card>
        </Grow>
      </div>
    );
  }
}

export default withStyles(styles)(LiveClassroomComponent);
