import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Link } from "react-router-dom";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function Watchlist(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Emotional Well-being</h4>
            <p className={classes.cardCategoryWhite}>
              At-Risk Students to look out for
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Class", "Risk-Factor", "Priority Level"]}
              tableData={[
                [<Link to="/students/JunJia">Er Jun Jia</Link>, "1A", "Bullying", '9'],
                [<Link to="/students/GabrielSze">Gabriel Sze</Link>, "1A", "Bullying", '7'],
                ["Tony Stones", "2A", "Bullying", '7'],
                ["Philip Lee", "1G", "Child-Abuse", '6'],
                ["Song Hu Jun", "3B", "Child-Abuse", '4'],
                ["Wilson Tang", "2A", "Bullying", '3']
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              Academic Monitoring
            </h4>
            <p className={classes.cardCategoryWhite}>
              Students that may need academic guidance
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Class", "Subject(s) at Risk", "Predicted Grade"]}
              tableData={[
                [ <Link to="/students/JunJia">Er Jun Jia</Link>, "1A", "Chinese", 'E'],
                [<Link to="/students/GabrielSze">Gabriel Sze</Link>, "1A", "Chinese", 'E'],
                ["Tony Stones", "2A", "English", 'E'],
                ["Philip Lee", "1G", "Mathematics", 'D+'],
                ["Song Hu Jun", "3B", "Chinese", 'C'],
                ["Wilson Tang", "2A", "English", 'D']
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(Watchlist);
