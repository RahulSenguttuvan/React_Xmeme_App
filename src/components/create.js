/* eslint-disable no-undef */
import React, { useState } from 'react';
import axiosInstance from '../axios';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
		caption: '',
		url: '',
		snackState: '',
	});
	const [formData, updateFormData] = useState(initialFormData);
	const [open, setOpen] = useState(false);
	// Saving data typed into the state 
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
		//validateField(name, value)
	};

	const handleError = () => {
		setOpen(true);
	};
	  const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
		setOpen(false);
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
					['name']: '',
					['caption']: '',
					['url']: '',
					['snackState']:error.response.data,
				});
				handleError()
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
								value={formData.name}
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
								value={formData.caption}
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
								value={formData.url}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="error">
							{formData.snackState}
						</Alert>
					</Snackbar>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Submit Meme
					</Button>
				</form>
			</div>
		</Container>
	);
}