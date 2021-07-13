/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";

// Sections for this page
import SectionWork from "./Sections/SectionWork.js";
import HackathonSeaction from "./Sections/hackathonSeaction.jsx";
import NewsSeaction from "./Sections/newSection.jsx";
import SearchEngion from "./Sections/searchEngion.jsx";

const useStyles = makeStyles(landingPageStyle);

export default function LandingPage({ ...rest }) {


  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        brand="World of Hackathon"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        changeColorOnScroll={{
          height: 300,
          color: "info"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg8.jpg")} filter="dark">
        <div className={classes.container}>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SearchEngion />
          <HackathonSeaction title='' />
          <NewsSeaction />
          <SectionWork />
        </div>
      </div>
    </div>
  );
}
