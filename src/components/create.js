/* eslint-disable no-undef */
import React, { useState } from 'react';
import axiosInstance from '../axios';
import validator from 'validator'
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Create() {

	// Declaring state using freeze to prevent change 
	const initialFormData = Object.freeze({
		name: '',
		Caption: '',
		url: '',
		formErrors: { name:'', caption:'', url:''},
		nameValid: false,
		captionValid: false,
		urlValid: false,
		formValid:false
	});
	const [formData, updateFormData] = useState(initialFormData);

	const validateField = (fieldName, value) => {
		let fieldValidationErrors = formData.formErrors;
		let nameValid = formData.nameValid;
		let captionValid = formData.captionValid;
		let urlValid = formData.urlValid;
		switch(fieldName) {
			case 'name':
				nameValid = value.length >= 1;
				//fieldValidationErrors.name = nameValid ? '' : ' is invalid';
				break;
			case 'url':
				urlValid = validator.isURL(value);
				//fieldValidationErrors.url = urlValid ? '' : ' is invalid';
				break;
			case 'caption':
				captionValid = value.length >= 1;
				//fieldValidationErrors.caption = captionValid ? '': ' is too short';
				break;
			default:
				break;
		}
		updateFormData({
            ...formData,
            'formErrors': fieldValidationErrors,
			'nameValid': nameValid,
			'captionValid': captionValid,
			'urlValid': urlValid,
			'formValid' : nameValid && captionValid && urlValid
        });
	  }
	  
	  

	// Saving data typed into the state 
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
		validateField(name, value)
	};
	
	// Handling the submit using axious ( Post )  Base URL is hard-coded.
	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.post('',{
				name: formData.name,
				caption: formData.caption,
				url: formData.url,
			})
			.then(response => { 
				window.location.reload();
			})
			.catch(error => {
				updateFormData({
					...formData,
					'name':'',
					'caption':'',
					'url':'',
					'formErrors': { name:'', caption:'', url:''},
					'nameValid': false,
					'captionValid': false,
					'urlValid': false,
					'formValid' : false
				});
			});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Enter Meme
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="name"
								name="name"
								autoComplete="name"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="caption"
								label="caption"
								name="caption"
								autoComplete="caption"
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="url"
								label="url"
								name="url"
								autoComplete="url"
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
						disabled={!formData.formValid}
					>
						Submit Meme
					</Button>
				</form>
			</div>
		</Container>
	);
}