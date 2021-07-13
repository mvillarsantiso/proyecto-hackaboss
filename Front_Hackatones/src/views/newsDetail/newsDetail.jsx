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
import NewsImg from "assets/img/hackathon/news.png";
import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Info from "components/Typography/Info.js";
import Quote from "components/Typography/Quote";


const useStyles = makeStyles(landingPageStyle);

export default function NewsDetail({ ...rest }) {
	const { id } = useParams()
	const [news, setNews] = useState()


	React.useEffect(() => {
		if (id) {
			axios.get(process.env.REACT_APP_API_URL+'/noticias/' + id)
				.then(res => {
					setNews(res.data)
				})
		}
	}, [id]);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
	});

	const getDate = (date) => {
		let d=new Date(date);
		if(d){
			let day = d.getDate()
			let month = d.getMonth() + 1
			let year = d.getFullYear()
			return `${day}-${month}-${year}`
		}else{
			return ''
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
					height: 200,
					color: "info"
				}}
				{...rest}
			/>
			<Parallax image={require("assets/img/bg8.jpg")} filter="dark">
			</Parallax>
			<div className={classNames(classes.main)}>
				<div className={classes.container}>
					{
						news &&
						<Card>
							<CardHeader color="success">{news.titular}</CardHeader>
							<CardBody>
								<Quote
									text={news.contenido}
									author={getDate(news.f_publicacion)}
								/>
							</CardBody>
						</Card>
					}
				</div>
			</div>
		</div>
	);
}
