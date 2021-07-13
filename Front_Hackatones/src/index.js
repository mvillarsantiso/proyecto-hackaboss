import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, useHistory } from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.9.0";

// pages
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import ErrorPage from "views/ErrorPage/ErrorPage.js";
import HackathonSearchPage from "views/hackathonSearchPage/hackathonSearchPage";
import HackathonDetail from "views/hackathonDetail/hackathonDetail";
import NewsDetail from "views/newsDetail/newsDetail";

var hist = createBrowserHistory();

const Authorized =()=>{
  return localStorage.HACKATHON_USER_TOKEN
}
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" render={(props) => <LandingPage {...props} />} />
      <Route exact path="/hackathon/search" render={(props) => <HackathonSearchPage {...props} />} />
      <Route path="/hackathon/:id" render={(props) => <HackathonDetail {...props} />} />
      <Route path="/news/:id" render={(props) => <NewsDetail {...props} />} />
      <Route exact path="/login-page" component={LoginPage} />
      <Route exact path="/profile-page" render={(props) => <ProfilePage {...props} />} />
      <Route exact path="/signup-page" component={SignupPage} />
      <Route exact path="/error-page" component={ErrorPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
