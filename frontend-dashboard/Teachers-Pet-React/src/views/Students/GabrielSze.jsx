import React from "react";
// @material-ui/core
import Icon from "@material-ui/core/Icon";
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
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
import ChartistGraph from "react-chartist";

// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
//other new stuff
import {
 dailyEngagementValue,
 monthlyEngagementValue,
 completedTasksChart
} from "variables/charts.jsx";

import avatar from "assets/img/faces/Gabriel_Sze_Compressed.jpg";

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
   textDecoration: "none",
 },
};

function UserProfile(props) {
 const { classes } = props;
 return (
   <div>
     <br></br>
     <GridContainer>
       <GridItem xs={12} sm={12} md={12}>
         <Card profile>
           <CardAvatar profile>
             <a href="#pablo" onClick={e => e.preventDefault()}>
               <img src={avatar} alt="..." />
             </a>
           </CardAvatar>
           <br></br>
           <CardHeader color="primary">
             <h2 className={classes.cardTitleWhite}>GABRIEL SZE</h2>
             <h4 className={classes.cardCategoryWhite}>Personalized Profile Report</h4>
           </CardHeader>
           <CardBody profile style = {{marginTop: "0px"}} >
             <h3 className={classes.cardCategory}style = {{marginTop:"5px"}}> Character Summary</h3>

             <p className={classes.description} >
               Gabriel is generally well behaved with a few exceptions.
               He is very vocal in class and and participates in all lessons, most in Chinese. <br/>
               Gabriel Sze has many friends of both genders with no particular close friend.
             </p>
             <Button color="primary" round>
               Print
             </Button>
           </CardBody>
         </Card>
       </GridItem>
       <GridItem xs={12} sm={12} md={6}>
         <Card profile>
           <CardHeader color="primary">
           <h3 className={classes.cardTitleWhite}>MATHEMATICS</h3>
           <h6 className={classes.cardCategoryWhite} style = {{fontWeight: "500"}}>MR. GABRIEL SZE</h6>
           </CardHeader>
           <CardBody profile style = {{marginTop: "0px"}} >
             <GridItem xs={12} sm={12} md={12}>
           <Card chart>
             <CardHeader color="warning">
               <ChartistGraph
                 className="ct-chart"
                 data={monthlyEngagementValue.data}
                 type="Bar"
                 options={monthlyEngagementValue.options}
                 responsiveOptions={monthlyEngagementValue.responsiveOptions}
                 listener={monthlyEngagementValue.animation}
               />
             </CardHeader>
             <CardBody>
               <h4 className={classes.cardTitle} style = {{marginTop:"0px" ,marginBottom:"0px"}}>Montly Engagement</h4>
               <p className={classes.cardCategory} style = {{marginTop:"0px" ,marginBottom:"0px"}}>
                 No significant pattern. Average of 67% across past 12 months.
               </p>
             </CardBody>
             <CardFooter chart>
               <div className={classes.stats}>
                 <AccessTime /> last updated 3 days ago
               </div>
             </CardFooter>
           </Card>
         </GridItem>
           <GridItem xs={12} sm={12} md={12}>
             <Card chart>
             <CardHeader color="success">
               <ChartistGraph
                 className="ct-chart"
                 data={dailyEngagementValue.data}
                 type="Line"
                 options={dailyEngagementValue.options}
                 listener={dailyEngagementValue.animation}
               />
             </CardHeader>
             <CardBody>
               <h4 className={classes.cardTitle} style = {{marginTop:"0px" ,marginBottom:"0px"}}>Daily Engagement</h4>
               <p className={classes.cardCategory} style = {{marginTop:"0px" ,marginBottom:"0px"}}>
                 <span className={classes.successText} >
                   <ArrowUpward className={classes.upArrowCardCategory} /> 5%
                 </span>{" "}
                 increase in engagement value over the week
               </p>
             </CardBody>
             <CardFooter chart>
               <div className={classes.stats}>
                 <AccessTime /> last updated 2 days ago
               </div>
             </CardFooter>
           </Card>
          </GridItem>
            
             <Table
             tableHeaderColor="primary"
             tableHead={["Test", "Exam Grade", "Test Score", "Test Weightage"]}
             tableData={[
               ["CT1", "A+", "100.0", "20%"],
               ["CT2", "A-", "78.0", "20%"],
               ["Final Exam", "B-", "63.5", "60%"],
             ]}
           />
           <p className={classes.description}>
             <br></br>
             SOME INSIGHTS ABOUT MATHEMATICS TO BE FILLED.
              
             </p>
             <Button color="primary" round>
               PRINT MATHEMATICS
             </Button>
           </CardBody>
         </Card>
       </GridItem>
       <GridItem xs={12} sm={12} md={6}>
         <Card profile>
           <CardHeader color="primary">
             <h3 className={classes.cardTitleWhite}>CHINESE</h3>
             <h6 className={classes.cardCategoryWhite} style = {{fontWeight: "500"}}>MRS. YAU PWEE HAR</h6>
           </CardHeader>
           <CardBody profile style = {{marginTop: "0px"}} >
           <GridItem xs={12} sm={12} md={12}>
           <Card chart>
             <CardHeader color="warning">
               <ChartistGraph
                 className="ct-chart"
                 data={monthlyEngagementValue.data}
                 type="Bar"
                 options={monthlyEngagementValue.options}
                 responsiveOptions={monthlyEngagementValue.responsiveOptions}
                 listener={monthlyEngagementValue.animation}
               />
             </CardHeader>
             <CardBody>
               <h4 className={classes.cardTitle} style = {{marginTop:"0px" ,marginBottom:"0px"}}>Montly Engagement</h4>
               <p className={classes.cardCategory} style = {{marginTop:"0px" ,marginBottom:"0px"}}>
                 No significant pattern. Average of 67% across past 12 months.
               </p>
             </CardBody>
             <CardFooter chart>
               <div className={classes.stats}>
                 <AccessTime /> last updated 2 days ago
               </div>
             </CardFooter>
           </Card>
         </GridItem>
           <GridItem xs={12} sm={12} md={12}>
             <Card chart>
             <CardHeader color="success">
               <ChartistGraph
                 className="ct-chart"
                 data={dailyEngagementValue.data}
                 type="Line"
                 options={dailyEngagementValue.options}
                 listener={dailyEngagementValue.animation}
               />
             </CardHeader>
             <CardBody>
               <h4 className={classes.cardTitle} style = {{marginTop:"0px" ,marginBottom:"0px"}}>Daily Engagement</h4>
               <p className={classes.cardCategory} style = {{marginTop:"0px" ,marginBottom:"0px"}}>
                 <span className={classes.successText} >
                   <ArrowUpward className={classes.upArrowCardCategory} /> 5%
                 </span>{" "}
                 increase in engagement value over the week
               </p>
             </CardBody>
             <CardFooter chart>
               <div className={classes.stats}>
                 <AccessTime /> last updated 2 days ago
               </div>
             </CardFooter>
           </Card>
          </GridItem>
            
            
             <Table
             tableHeaderColor="primary"
             tableHead={["Test", "Exam Grade", "Test Score", "Test Weightage"]}
             tableData={[
               ["CT1", "D+", "40.0", "20%"],
               ["CT2", "C-", "55.0", "20%"],
               ["Final Exam", "B-", "63.5", "60%"],
             ]}
           />
           <p className={classes.description}>
             <br></br>
             SOME INSIGHTS ABOUT CHINESE TO BE FILLED.
              
             </p>
             <Button color="primary" round>
               PRINT CHINESE
             </Button>
           </CardBody>
         </Card>
       </GridItem>
     </GridContainer>
   </div>
 );
}

export default withStyles(styles)(UserProfile);


