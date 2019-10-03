import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import JunJia from "views/Students/JunJia.jsx";
import GabrielSze from "views/Students/GabrielSze.jsx";
import Vedant from "views/Students/Vedant.jsx";
import SignIn from "views/SignIn/SignIn.js";
import SignInProgress from "./views/SignIn/SignInProgress";
import "assets/css/material-dashboard-react.css?v=1.6.0";


const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist} path="/">
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Route path="/students/JunJia" component={JunJia} />
      <Route path="/students/GabrielSze" component={GabrielSze} />
      <Route path="/students/Vedant" component={Vedant} />
      <Route path="/SignIn/SignIn" component={SignIn} />
      <Route path="/SignIn/SignInProgress" component={SignInProgress} />
      <Redirect from="/" to="/SignIn/SignIn" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
