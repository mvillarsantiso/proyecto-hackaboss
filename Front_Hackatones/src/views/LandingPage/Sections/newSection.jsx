import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";
import NewsLetter from "components/newsLetter/newsLetter";
import axios from "axios";

const useStyles = makeStyles(productStyle);


export default function NewsSeaction(props) {
    const classes = useStyles();

    const [newsList, setNewsList] = useState([])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/noticias').then(res => {
            setNewsList(res.data.slice(0, 6))
        })
    }, [props])

    return (
        <div className={classes.section}>
            <h2 className={classes.title} style={{ marginTop: 0 }}>Hackathon News</h2>
            <GridContainer>
                {newsList &&
                    newsList.map(news => (

                        <GridItem key={news.id} xs={12} sm={4} md={4}>
                            <NewsLetter data={news} />
                        </GridItem>
                    ))
                }
            </GridContainer>
        </div>
    );
}
