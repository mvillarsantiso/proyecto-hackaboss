/*eslint-disable*/ import React, { useState } from "react";
// nodejs library to set properties for components
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import hackathonImage from 'assets/img/hackathon/hackathon.jpg';
import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Info from "components/Typography/Info.js";

import { Button, Icon } from "@material-ui/core";


const useStyles = makeStyles(landingPageStyle);

export default function HackathonDetail({ ...rest }) {
	const history=useHistory()
	const { id } = useParams()
	const [responseMessage, setResponseMessage] = useState()
	const [userId, setUserId] = useState()
	const [hackathon, setHackathon] = useState()
	const [tecnologias, setTecnologias] = useState([])


	React.useEffect(() => {
		if(localStorage.HACKATHON_USER){
			let user = JSON.parse(localStorage.HACKATHON_USER)
			setUserId(user.id)
		}
		getTechnologyList()
		if (id) {
			axios.get(process.env.REACT_APP_API_URL+'/hackatones/' + id)
				.then(res => {
					setHackathon(res.data)
				})
		}
	}, [id]);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
	});


	const getTechnologyList = () => {
		axios.get(process.env.REACT_APP_API_URL+'/tecnologias')
			.then(data => {
				setTecnologias(data.data)
			})
	}
	const joinHackathon = () => {
		if(localStorage.HACKATHON_USER_TOKEN){
			const headers = {
				'Authorization': localStorage.HACKATHON_USER_TOKEN
			  }
			axios.post(`${process.env.REACT_APP_API_URL}/hackatones/${hackathon.id}/${userId}/register`,{},{headers:headers})
				.then(res => {
					setResponseMessage(`codigo Reserva ${res.data.codigoReserva}`)
				})
				.catch(error=>setResponseMessage(error.response.data.err))
		}else{
			history.push('/login-page')
		}
	}


	const getTechnology = (id) => {
		if (id != null) {
			return tecnologias.find(t=>t.id==id).nombre
		} else {
			return 'Technology'
		}
	}

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
			</Parallax>
			<div className={classNames(classes.main, classes.mainRaised)}>
				<div className={classes.container}>
					<Card blog>
						<CardHeader image>
							<a>
								<img
									className={classes.imgCard}
									src={hackathonImage}
									alt=""
								/>
								{
									hackathon &&
									<div className={classes.imgCardOverlay}>
										<h4
											className={classes.cardTitle}
											style={{
												color: "white",
												position: "absolute",
												bottom: "10px",
												left: "15px"
											}}
										>{hackathon.nombre}</h4>
									</div>
								}
							</a>
						</CardHeader>
						{
							hackathon &&
							<CardBody>

								<Info>
									<h6 className={classes.cardCategory}>{getTechnology(hackathon.id_tech)}</h6>
								</Info>
								<p>{hackathon.contenido}</p>
								<Button onClick={()=>joinHackathon()} color="secondary" round='true'><Icon>add</Icon> Register</Button>
								<br />
								{
									responseMessage &&
									<Info>{responseMessage}</Info>
								}
							</CardBody>
						}
					</Card>
				</div>
			</div>
		</div>
	);
}
