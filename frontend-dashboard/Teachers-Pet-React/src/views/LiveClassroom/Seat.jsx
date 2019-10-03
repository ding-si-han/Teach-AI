import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

export default function Seat() {
  return (
    <div
      style={{
              marginLeft: "200px",
              filter: "drop-shadow(0px 7px 1px black)"
            }}
      >
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
  );
}
