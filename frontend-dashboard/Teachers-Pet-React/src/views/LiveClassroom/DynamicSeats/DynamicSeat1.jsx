import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
 
export default class DynamicSeat1 extends React.Component {
  constructor(props) {
    super(props);
    this.value1 = 0;
  }
 
  componentDidMount() {
    setInterval(() => {
      fetch("http://localhost:500/")
        .then(res => res.json())
        .then(data => {
          this.setState({ database: data });
          console.log(this.state.database);
        })
        .catch(console.log);
    }, 1500);
  }
 
  getColor = value => {
    var hue_array = ["#00BF2C", "#ACFF4F", "#C6C013", "#EF8A17", "#EF2917"];
    switch (value) {
      case 5:
        return hue_array[0];
      case 4:
        return hue_array[1];
      case 3:
        return hue_array[2];
      case 2:
        return hue_array[3];
      case 1:
        return hue_array[4];
      default:
        return "FFFFFF";
    }
  };
 
  render() {
    if (this.state) {
      this.value1 = this.state.database.person6;
    }
    return (
      <div
        style={{
          filter: "drop-shadow(0px 7px 1px black)"
        }}
      >
        <div
          style={{
            float: "left",
            marginRight: "2px",
            marginTop: "40px",
            height: "63px",
            width: "73px",
            // background: (this.state) ? (this.getColor(this.state.database.person6)) : ("grey"),
            background: "green",
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
            Gabriel
            
          </div>
        </div>
      </div>
    );
  }
}
