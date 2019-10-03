import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
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
import Accessibility from "@material-ui/icons/Accessibility";
import Warning from "@material-ui/icons/Warning";
import CardIcon from "components/Card/CardIcon.jsx";
import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LiveClassroom from "./LiveClassroom";
import Seat from "./Seat";

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
    setInterval(()=> {
      fetch('http://localhost:5000/')
      .then(res => res.json())
      .then((data) => {
        this.setState({ database: data })
        console.log(this.state.database)
      })
      .catch(console.log)
    }, 1500)

  }
  
  

  getRandomColor = () => {
    var hue_array = [
      "#6CC551",
      "#447604",
      "#43B929",
      "#43B929",
      "#43B929",
      "#FF1B1C",
      "#447604"
    ];
    var hue = hue_array[Math.floor(Math.random() * 5)];
    return hue;
  } 
    // var hue = 'rgba(' + (Math.floor(Math.random() * 70)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 50)) + ',' + (1-(Math.random())*0.07) + ')';

  
  render() {
    return (
      <div>
        {/* <GridItem xs={12} sm={12} md={12}> */}
  
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
                    <CardIcon color="info">
                      <Accessibility />
                    </CardIcon>
                    <p
                      className={this.props.classes.cardCategory}
                      style={{ color: "black" }}
                    >
                      {" "}
                      Attendance
                    </p>
                    <h3 className={this.props.classes.cardTitle} style={{ color: "black" }}>
                    {(this.state) ? (<span>{this.state.database.numPerson}</span>) : (<span>0</span>)}
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
                    <CardIcon color="success">
                      <Store />
                    </CardIcon>
                    <p
                      style={{ color: "black" }}
                      className={this.props.classes.cardCategory}
                    >
                      Engagement
                    </p>
                    <h3 style={{ color: "black" }} className={this.props.classes.cardTitle}>
                    {(this.state) ? (<span>{this.state.database.average}</span>) : (<span>0</span>)}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={this.props.classes.stats}>
                      <DateRange />
                      Last 1 Minute
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </div>
  
            {/* DIV FOR CLASSROOM LAYOUT */}
            <div style={{ float: "right", paddingTop: "30px" }}>
              <GridItem xs={12} sm={12} md={12} style={{}}>
                <div class="studentRow">
                  <div
                    style={{
                      marginLeft: "200px",
                      filter: "drop-shadow(0px 7px 1px black)"
                    }}
                  >
                    <Link to="/students/JunJia">
                      <div
                        style={{
                          float: "left",
                          marginRight: "2px",
                          marginTop: "14px",
                          height: "63px",
                          width: "73px",
                          background: this.getRandomColor(),
                          color: "white",
                          textAlign: "center",
                          verticalAlign: "end",
                          position: "relative",
                          borderRadius: "7%"
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            marginTop: "20px",
                            fontSize: "13px"
                          }}
                        >
                          Er Jun Jia
                        </div>
                      </div>
                    </Link>
                    <Link to="/students/GabrielSze">
                      <div
                        style={{
                          float: "left",
                          marginRight: "35px",
                          marginTop: "14px",
                          height: "63px",
                          width: "73px",
                          background: this.getRandomColor(),
                          color: "white",
                          textAlign: "center",
                          verticalAlign: "end",
                          position: "relative",
                          borderRadius: "7%"
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            marginTop: "20px",
                            fontSize: "13px"
                          }}
                        >
                          Gabriel Sze
                        </div>
                      </div>
                      <div
                        style={{
                          float: "left",
                          marginRight: "2px",
                          marginTop: "14px",
                          height: "63px",
                          width: "73px",
                          background: "#808080",
                          color: "white",
                          textAlign: "center",
                          verticalAlign: "end",
                          position: "relative",
                          borderRadius: "7%"
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            marginTop: "20px",
                            fontSize: "13px"
                          }}
                        >
                          Empty
                        </div>
                      </div>
                    </Link>
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
                <div class="studentRow">
                  <div
                    style={{
                      marginLeft: "200px",
                      filter: "drop-shadow(0px 7px 1px black)"
                    }}
                  >
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
                <div class="studentRow">
                  <div
                    style={{
                      marginLeft: "200px",
                      filter: "drop-shadow(0px 7px 1px black)"
                    }}
                  >
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
                <div class="studentRow">
                  <div
                    style={{
                      marginLeft: "200px",
                      filter: "drop-shadow(0px 7px 1px black)"
                    }}
                  >
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                    <div
                      style={{
                        float: "left",
                        marginRight: "2px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
  
                    <div
                      style={{
                        float: "left",
                        marginRight: "35px",
                        marginTop: "14px",
                        height: "63px",
                        width: "73px",
                        background: "#808080",
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "end",
                        position: "relative",
                        borderRadius: "7%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "20px",
                          fontSize: "13px"
                        }}
                      >
                        Empty
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
                <div class="studentRow">
                  <div
                    style={{
                      marginLeft: "200px",
                      filter: "drop-shadow(0px 7px 1px black)"
                    }}
                  >
                    <Link to="/students/JunJia">
                      <div
                        style={{
                          float: "left",
                          marginRight: "2px",
                          marginTop: "14px",
                          height: "43px",
                          marginLeft: "20%",
                          marginRight: "20%",
                          width: "60%",
                          background: "#FB8B24",
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
              </GridItem>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  
  }
  
export default withStyles(styles)(LiveClassroomComponent);
