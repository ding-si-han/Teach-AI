import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import DynamicSeat1 from "./DynamicSeats/DynamicSeat1";
import DynamicSeat2 from "./DynamicSeats/DynamicSeat2";

export default function SeatBlock() {
  return (
                  <div
                    style={{
                      marginLeft: "100px",
                      filter: "drop-shadow(0px 7px 1px black)"
                    }}
                  >
                    <div
                      style={{
                        float: "left",
                        marginRight: "10px",
                        marginTop: "40px",
                        height: "60px",
                        width: "70px",
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
                        marginRight: "60px",
                        marginTop: "40px",
                        height: "60px",
                        width: "70px",
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
                    <DynamicSeat1 />
                    <DynamicSeat2 />
                    <div
                      style={{
                        float: "left",
                        marginRight: "10px",
                        marginTop: "40px",
                        height: "60px",
                        width: "70px",
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
                        marginRight: "60px",
                        marginTop: "40px",
                        height: "60px",
                        width: "70px",
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
