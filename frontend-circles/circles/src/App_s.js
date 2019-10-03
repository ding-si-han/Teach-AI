import React, { Component } from "react";
import { motion } from "framer-motion";

const styles = {
  background: "blue",
  borderRadius: "50%",
  width: 100,
  height: 100,
  margin: "auto"
};

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    setInterval(() => {
      if (this.state) {
        this.setState({oldState: this.state.location})
      }
      
      fetch("http://localhost:5005/")
        .then(res => res.json())
        .then(data => {
          // this.setState({ location: data });
          // console.log("ASSIGNED CURRENT STATE")
          // console.log(this.state.location);
          this.setState({
            location: data 
          });
          
        })
        .catch(console.log);
    }, 380);
  }

  render() {   
    if (this.state){
      console.log(this.state.location)

    } 
    return (
      <div>
        {/* <div> CLASSROOM</div> */}
        <div >Jun Jia</div>
        <motion.div
          style={styles}
          animate={{ 
            x: (this.state) ? (600 - this.state.location.Junjia.latest_left) : (0),
            y: (this.state) ? (this.state.location.Junjia.latest_top) : (0), 
          }}
          transition={{ duration: 2 }}
        ><div style={{color: "white", verticalAlign: "center", paddingTop: 30}}>Jun Jia</div></motion.div>
        <div >Vedant</div>
        <motion.div
          style={styles}
          animate={{ 
            x: (this.state) ? (600 - this.state.location.Vedant.latest_left) : (0),
            y: (this.state) ? (this.state.location.Vedant.latest_top) : (0), 
          }}
          transition={{ duration: 2 }}
        ><div style={{color: "white", verticalAlign: "center", paddingTop: 30}}>Jun Jia</div></motion.div>
      </div>
    );
  }
}

export default App;










