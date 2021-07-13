import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import workStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/workStyle.js";
import styles from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(styles);
const workStyles = makeStyles(workStyle);

export default function SearchEngion(props) {
	const classesWork = workStyles();
	const classes = useStyles();

	const [checked, setChecked] = useState(0);
	const [nombre, setNombre] = useState('');
	const [simpleSelect, setSimpleSelect] = useState("");
	const [tecnologias, setTecnologias] = useState([])
	const history = useHistory();

	useEffect(() => {
		axios.get(process.env.REACT_APP_API_URL+'/tecnologias')
			.then(data => {
				setTecnologias(data.data)
			})
	}, [props])


	const handleSimple = event => {
		setSimpleSelect(event.target.value);
	};

	const handleToggle = value => {
		setChecked(value ? 0 : 1)
	}

	const searchHackathon = () => {
		history.push(`/hackathon/search?nombre=${nombre}&presencial=${checked}&tecnologias=${simpleSelect}`)
	}


	return (
		<div className={classes.section}>
			<GridContainer justify="center">
				<GridItem cs={12} sm={8} md={8}>
					<h2 className={classesWork.title}>Search Hackathon</h2>
					<form>
						<GridContainer>
							<GridItem xs={12} sm={4} md={4}>
								<TextField color='secondary' id="standard-basic" onChange={(e) => setNombre(e.target.value)} value={nombre} label="Nombre" />
							</GridItem>
							<GridItem xs={12} sm={4} md={4} lg={4}>
								<FormControl fullWidth className={classes.selectFormControl}>
									<InputLabel htmlFor="simple-select" className={classes.selectLabel}>Tecnologias</InputLabel>
									<Select
										MenuProps={{
											className: classes.selectMenu
										}}
										classes={{
											select: classes.select
										}}
										value={simpleSelect}
										onChange={handleSimple}
										inputProps={{
											name: "simpleSelect",
											id: "simple-select"
										}}
									>
										<MenuItem
											disabled
											classes={{
												root: classes.selectMenuItem
											}}
										>Select</MenuItem>
										{
											tecnologias &&
											tecnologias.map(t => (
												<MenuItem
													key={t.id}
													classes={{
														root: classes.selectMenuItem,
														selected: classes.selectMenuItemSelected
													}}
													value={t.id}
												>
													{t.nombre}
												</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</GridItem>
							<GridItem xs={12} sm={2} md={2}>
								<div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
									<FormControlLabel
										control={
											<Checkbox
												tabIndex={-1}
												onClick={() => handleToggle(checked)}
												checkedIcon={<Check className={classes.checkedIcon} />}
												icon={<Check className={classes.uncheckedIcon} />}
												classes={{
													checked: classes.checked,
													root: classes.checkRoot
												}}
											/>
										}
										classes={{ label: classes.label }}
										label="Presencial"
									/>
								</div>
							</GridItem>
							<GridItem
								xs={12}
								sm={2}
								md={2}
								className={classes.mrAuto + " " + classes.mlAuto}
							>
								<Button onClick={() => searchHackathon()} color="primary">Search Hackathon</Button>
							</GridItem>
						</GridContainer>
					</form>
				</GridItem>
			</GridContainer>
		</div>
	);
}
