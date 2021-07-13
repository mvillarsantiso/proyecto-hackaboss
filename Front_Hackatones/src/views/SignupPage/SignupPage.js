/*eslint-disable*/
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Typography/Info.js";
import CardHeader from "components/Card/CardHeader.js";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import image from "assets/img/bg7.jpg";
import Card from "components/Card/Card";
import { SnackbarContent, TextField } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(loginPageStyle);

export default function SignUpPage() {

  const classes = useStyles();
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    dni: "",
    nick: "",
    password: "",
    email: ""
  });

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };


  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const registerHandler = async () => {
    setErrorMessage('')
    let field = Object.keys(user).find(key => user[key] === '')
    if (field) {
      setErrorMessage(field + ' is Required')
      return
    }

    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!user.email.match(mailformat)) {
      setErrorMessage('Please enter a valid email')
      return
    }
    const nickformat = /^[a-zA-Z0-9]+$/
    if (!user.nick.match(nickformat) || user.nick.length < 6) {
      setErrorMessage('Nick must contain minimum 6 alpha-numeric characters')
      return
    }

    if (user.dni.length !== 9) {
      setErrorMessage('DNI length must be 9 characters long')
      return
    }

    if (
      user.nombre !== '' &&
      user.apellido1 !== '' &&
      user.apellido2 !== '' &&
      user.dni !== '' &&
      user.nick !== '' &&
      user.password !== '' &&
      user.email !== ''
    ) {
      axios.post(process.env.REACT_APP_API_URL+'/users/register', user)
        .then(() => {
          history.push('/login-page')
        })
        .catch(err => {
          setErrorMessage(err.response.data.error)
        })
    }
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="World of Hackathon"
        links={<HeaderLinks dropdownHoverColor="info" />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Register</h4>
                    <div className={classes.socialLine}>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <GridContainer style={{ margin: 'auto' }}>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.nombre}
                          onChange={handleChange('nombre')}
                          id="outlined-required"
                          label="Nombre"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.apellido1}
                          onChange={handleChange('apellido1')}
                          id="outlined-required"
                          label="Apellido1"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.apellido2}
                          onChange={handleChange('apellido2')}
                          id="outlined-required"
                          label="Apellido2"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.nick}
                          onChange={handleChange('nick')}
                          id="outlined-required"
                          label="Nick"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.dni}
                          onChange={handleChange('dni')}
                          id="outlined-required"
                          label="DNI"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.email}
                          onChange={handleChange('email')}
                          id="outlined-required"
                          label="Email"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          value={user.password}
                          onChange={handleChange('password')}
                          id="outlined-required"
                          type='password'
                          label="Password"
                          id="outlined-secondary"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem style={{ marginBottom: 20 }} xs={12} sm={12} md={12}>
                        {
                          errorMessage &&
                          <SnackbarContent
                            message={
                              <span>{errorMessage}</span>
                            }
                            close='true'
                            color="danger"
                            icon="info_outline"
                          />
                        }
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button onClick={() => registerHandler()} simple color="primary" size="lg">Register</Button>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
