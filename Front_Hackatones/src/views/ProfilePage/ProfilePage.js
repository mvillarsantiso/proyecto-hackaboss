/*eslint-disable*/
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Camera from "@material-ui/icons/Camera";

// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Button from "components/CustomButtons/Button.js";

import christian from "assets/img/faces/christian.jpg";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";
import axios from "axios";
import { Card, SnackbarContent, TextField } from "@material-ui/core";
import CardBody from "components/Card/CardBody";

const useStyles = makeStyles(profilePageStyle);

export default function ProfilePage(props) {

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState(0)
  const [user, setUser] = useState({
    id: 0,
    avatar: christian,
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


  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, [props]);

  useEffect(() => {
    getUserById()
  }, [props]);

  const getUserById = async () => {
    let user = await JSON.parse(localStorage.HACKATHON_USER)
    setUserId(user.id)
    const headers = {
      'Authorization': localStorage.HACKATHON_USER_TOKEN
    }
    axios.get(process.env.REACT_APP_API_URL+'/users-info/' + user.id, { headers: headers })
      .then(res => {
        setUser({
          ...res.data,
          password: '',
          avatar: res.data.avatar ? res.data.avatar : christian
        })
      })
      .catch(err => {
        setMessage(err.response.data.error)
      })
  }

  const updateUserHandler = () => {
    setMessage('')
    let field = Object.keys(user).find(key => user[key] === '')
    if (field) {
      setMessage(field + ' is Required')
      return
    }

    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!user.email.match(mailformat)) {
      setMessage('Please enter a valid email')
      return
    }
    const nickformat = /^[a-zA-Z0-9]+$/
    if (!user.nick.match(nickformat) || user.nick.length < 6) {
      setMessage('Nick must contain minimum 6 alpha-numeric characters')
      return
    }

    if (user.dni.length !== 9) {
      setMessage('DNI length must be 9 characters long')
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
      const headers = {
        'Authorization': localStorage.HACKATHON_USER_TOKEN
      }
      let userData = { ...user, userId: user.id }
      axios.post(process.env.REACT_APP_API_URL+`/users/${userId}/update`, userData, { headers: headers })
        .then(() => {
        })
        .catch(err => {
          setMessage(err.response.data.err)
        })
    }
  }

  const updateImage = (avatar) => {
    let formData = new FormData()
    formData.append('avatar', avatar)
    axios.put(process.env.REACT_APP_API_URL+`/users/${userId}/avatar/update`, formData)
      .then(res => {
        // setUser({...user,avatar:process.env.REACT_APP_API_URL+'/'+res.data.file})
        console.log({ avatar: res.data.file });
      })
      .catch(err => {
        console.log(err)
      })
  }

  const uploadPhoto = () => {
    document.getElementById('imagePicker').click()
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="World of Hackathon"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "info"
        }}
        props
      />
      <Parallax
        image={require("assets/img/examples/city.jpg")}
        filter="dark"
        className={classes.parallax}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.profile}>
                <div>
                  <img src={user.avatar} alt="..." className={imageClasses} />
                  <Camera style={{ cursor: 'pointer', margin: '0 0 -3px -55px', fontSize: 50, zIndex: 5, position: 'relative', color: '#00acc1' }} onClick={() => uploadPhoto()} />
                </div>
                <div className={classes.name}>
                  {
                    user.nombre &&
                    <h3 className={classes.title}>{user.nombre}</h3>
                  }
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <form className={classes.form}>
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
                    </GridContainer>
                  </CardBody>
                  <div className={classes.textCenter}>
                    {
                      message &&
                      <SnackbarContent
                        message={
                          <span>{message}</span>
                        }
                        close='true'
                        color="danger"
                        icon="info_outline"
                      />
                    }
                    <Button onClick={() => updateUserHandler()} simple color="primary" size="lg">Update</Button>
                  </div>
                </form>
              </Card>
            </GridItem>
            <input id='imagePicker' type='file' onChange={(e) => updateImage(e.target.files[0])} style={{ display: 'none' }} />
          </GridContainer>
          <Clearfix />
        </div>
      </div>
    </div>
  );
}
