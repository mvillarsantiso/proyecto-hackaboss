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
import HackathonSeaction from "views/LandingPage/Sections/hackathonSeaction";

// Sections for this page
const useStyles = makeStyles(landingPageStyle);

export default function HackathonSearchPage({ ...rest }) {
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }, [rest]);

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
                    <HackathonSeaction filter='true' title='Hackathon Results' />
                </div>
            </div>
        </div>
    );
}
