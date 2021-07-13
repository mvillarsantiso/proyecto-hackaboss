import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Check from "@material-ui/icons/Check";


import workStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/workStyle.js";
import { SnackbarContent, TextField } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(workStyle);

export default function SectionWork() {
  const classes = useStyles();

  const [responseMessage, setResponseMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (name !== '' && email !== '') {
      const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(mailformat)) {
        setResponseMessage('Please enter a valid email')
        return
      }
      let payload = {
        name,
        email,
        message
      }
      axios.post(process.env.REACT_APP_API_URL+'/email', payload)
        .then(res => {
          setResponseMessage(res.data.message)
        })
        .catch(err => {
          setResponseMessage('Something went wrong! Please try later.')
        })
    }
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={8} md={8}>
          <h2 className={classes.title}>Contact us</h2>
          <h4 className={classes.description}>
            Fill this form and we will do the rest!
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField fullWidth label="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField fullWidth type='email' label="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />

              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  label="Your Message"
                  multiline
                  rows={5}
                />

              </GridItem>
              <GridItem
                xs={12}
                sm={4}
                md={4}
                className={classes.mrAuto + " " + classes.mlAuto}
              >
                <Button style={{ marginTop: 20 }} onClick={() => sendMessage()} color="primary">Send Message</Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                {
                  responseMessage &&
                  <SnackbarContent
                    message={
                      <span>{responseMessage}</span>
                    }
                    close='true'
                    color='info'
                    icon={Check}
                  />
                }
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
