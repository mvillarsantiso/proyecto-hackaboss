import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import HackImg from "assets/img/hackathon/hackathon.jpg";
// @material-ui icons
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.js";

import { cardTitle } from "assets/jss/material-kit-pro-react.js";
import { Link } from "react-router-dom";

const style = {
  ...imagesStyles,
  cardTitle,
  textMuted: {
    color: "#6c757d"
  }
};

const useStyles = makeStyles(style);

export default function Hackathon({data}) {
  const classes = useStyles();
  return (
    <div>
      <Card>
        <img
          className={classes.imgCardTop}
          src={HackImg}
          alt="Card-img-cap"
        />
        <CardBody>
            <Link to={`/hackathon/${data.id}`}>
              <h4 className={classes.cardTitle}>{data.nombre}</h4>
            </Link>
          <p style={{maxWidth:'100%',whiteSpace:"nowrap",overflow:"hidden",textOverflow:'ellipsis'}}>{data.contenido}</p>
        </CardBody>
      </Card>
    </div>
  );
}