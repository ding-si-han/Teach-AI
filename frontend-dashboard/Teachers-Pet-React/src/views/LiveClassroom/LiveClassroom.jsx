import React from "react";
import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import CardIcon from "components/Card/CardIcon.jsx";
import Iframe from "react-iframe";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// @material-ui/core components
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
import ClassroomLayout from "./ClassromLayoutSubComponent";
import Danger from "components/Typography/Danger.jsx";
import Accessibility from "@material-ui/icons/Accessibility";
import Warning from "@material-ui/icons/Warning";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
    // width: 500,
  }
});

const stylesCard = {
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

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
     <br></br>
     <GridContainer >
       <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
             <h2 className={classes.cardTitleWhite} style={{textAlign:"center"}}>Class 1A</h2>
             <h4 className={classes.cardCategoryWhite} style={{textAlign:"center"}}>Mathematics | Friday Morning</h4>
          </CardHeader>      
          <CardHeader style = {{margin:"0px", padding:"0px"}} >
          <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Classroom" />
            <Tab label="Engagement Tracker" />
          </Tabs>
        </AppBar>
          </CardHeader>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          style={{padding: '0px'}}
        >
          <TabContainer dir={theme.direction} style={{padding: '0px'}}>

            <GridItem xs={12} sm={12} md={12}>
            <ClassroomLayout />
            </GridItem>
          </TabContainer>
          <TabContainer dir={theme.direction} style={{padding: '0px', margin:'-100px'}}>
            {/* <GridItem xs={12} sm={12} md={12}> */}
              {/* <Card> */}
                <Iframe
                  styles={{padding: '0px'}}
                  url="http://127.0.0.1:8050/"
                  width="100%"
                  height="700px"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"
                  allowFullScreen
                />
              {/* </Card> */}
            {/* </GridItem> */}
          </TabContainer>
        </SwipeableViews>
        </GridItem>
    </GridContainer>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(stylesCard, { withTheme: true })(FullWidthTabs);

// import React from "react";
// // @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// import InputLabel from "@material-ui/core/InputLabel";
// import Iframe from 'react-iframe'
// // core components
// import GridItem from "components/Grid/GridItem.jsx";
// import GridContainer from "components/Grid/GridContainer.jsx";
// import CustomInput from "components/CustomInput/CustomInput.jsx";
// import Button from "components/CustomButtons/Button.jsx";
// import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
// import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
// import avatar from "assets/img/faces/marc.jpg";
// import { Link } from "react-router-dom";

// const styles = {
//   cardCategoryWhite: {
//     color: "rgba(255,255,255,.62)",
//     margin: "0",
//     fontSize: "16px",
//     marginTop: "0",
//     marginBottom: "0"
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "500",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none"
//   }
// };

// function UserProfile(props) {
//   const { classes } = props;
//   function getRandomColor() {
//     // var hue = 'rgba(' + (Math.floor(Math.random() * 70)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 50)) + ',' + (1-(Math.random())*0.07) + ')';
//     var hue_array = ['#6CC551', '#447604', '#43B929', '#43B929', '#43B929', '#FF1B1C', '#447604']
//     var hue = hue_array[Math.floor(Math.random() * 5)]
//     return hue;
//   }
//   return (
//     <div>
//      <br></br>
//      <GridContainer>
//        <GridItem xs={12} sm={12} md={12}>
//           <CardHeader color="primary">
//              <h2 className={classes.cardTitleWhite} style={{textAlign:"center"}}>Class 1A</h2>
//              <h4 className={classes.cardCategoryWhite} style={{textAlign:"center"}}>Mathematics | Friday Morning</h4>
//           </CardHeader>

//         <GridItem xs={12} sm={12} md={12}>
//           <Card>

//           <Iframe url="http://127.0.0.1:8050/"
//                   width="100%"
//                   height="750px"
//                   id="myId"
//                   className="myClassname"
//                   display="initial"
//                   position="relative"
//                   allowFullScreen/>
//           </Card>
//           </GridItem>
//     </GridItem>
//     </GridContainer>

//     </div>
//   );
// }

// export default withStyles(styles)(UserProfile);
