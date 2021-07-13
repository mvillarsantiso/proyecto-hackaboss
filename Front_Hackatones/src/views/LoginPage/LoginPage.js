/*eslint-disable*/
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
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

export default function LoginPage() {

  const history = useHistory()
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };


  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const signinHandler = () => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!user.email.match(mailformat)) {
      setErrorMessage('Please enter a valid email')
      return
    }

    if(user.email!=='' && user.password!==''){
      axios.post(process.env.REACT_APP_API_URL+'/users/login', user)
        .then(res => {
          localStorage.setItem('HACKATHON_USER_TOKEN', res.data.token)
          localStorage.setItem('HACKATHON_USER', JSON.stringify(res.data.user))
          history.push('/')
        })
        .catch(err => {
          console.log(err)
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
                    <h4 className={classes.cardTitle}>Login</h4>
                    <div className={classes.socialLine}>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <GridContainer style={{ margin: 'auto' }}>
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
                    </GridContainer>
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button onClick={() => signinHandler()} simple color="primary" size="lg">Login</Button>
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
