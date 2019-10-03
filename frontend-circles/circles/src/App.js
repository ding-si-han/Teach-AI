import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
import { isTemplateElement } from "@babel/types";

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      fetch("http://localhost:5005/")
        .then(res => res.json())
        .then(data => {
          this.setState({ location: data });
          console.log(this.state.location);
        })
        .catch(console.log);
    }, 250);
  }
  render() {
    if (this.state) {
      // console.log(this.state.location);
      const data = this.state.location
      console.log(data)

      let arr = []
      Object.keys(data).forEach(function(key){
        arr.push(data[key]);
        console.log(arr)
      })
      return <div style={{background: "white"}} ><Stage width={window.innerWidth} height={window.innerHeight}>{arr.map(item =>               
              <Layer>               
                <Circle
    
                  x={(this.state) ? (1200 - Number(item.latest_left)+30) : (300)}
                  y= {(this.state) ? (Number(item.latest_top) + 200) : (150)}
                  radius={100}
                  fill="#1C89BF"
                />
                <Text text={item.name} fontSize={15} 
                x ={(this.state) ? (1200 - Number(item.latest_left)-9) : (150)}
                y={(this.state) ? (Number(item.latest_top) + 200) : (150)}
                fill = "white"
                fontSize = {30}
                />        
              </Layer>
      )}</Stage></div>;
    }

    return (
      <div>

        {/* {(this.state) ? (<div>{this.state.location.y}</div>) : (<div>Not defined</div>)} */}
      </div>
    );
  }
}

export default App;
