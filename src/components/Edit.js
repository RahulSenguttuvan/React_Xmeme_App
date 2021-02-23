import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
//MaterialUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function FormDialog(props){
    const [open, setOpen] = useState(false);
    const [openSnack, openSnackBar] = useState(false);
    // Getting data sent from Layout component. 
    const { data } = props;
    const initialFormData = Object.freeze({
		url: '',
    caption: '',
    snackState:'',
	});
	const [formData, updateFormData] = useState(initialFormData);
  const existingCaption
  const existingUrl
  useEffect(() => {
    axiosInstance.get(data.id + '/').then((res) => {
      existingCaption = res.data.caption;
      existingUrl = res.data.url;
      updateFormData({
        ...formData,
        'caption': existingCaption,
        'url': existingUrl,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [updateFormData]);      

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };
    // Display data so user can edit either caption or url or both if needed.
   
    const handleSubmit = (e) => {
      e.preventDefault();
      // Storing the primary key ( id ) in a variable to append to url 
      const dataId = data.id + '/'
      axiosInstance
        .patch(dataId,{
          caption: formData.caption,
          url: formData.url,
        })
        .then(response => { 
          window.location.reload(); // Reload page to see change 
        })
        .catch(error => { // Getting appropriate error responses. 
          openSnackBar(true);
          updateFormData({
            ...formData,
            ['caption']: existingCaption,
            ['url']: existingUrl,
            ['snackState']:error.response.data,
          });
        });
	};

// Set state of dialogue box 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    openSnackBar(false);
  };
  const handleErrorClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  openSnackBar(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText> 
                {/* Displaying name of user */}
                Hi {data.name}!, 
                Please edit your meme details,
          </DialogContentText>
          <form  noValidate>
                <TextField
                    autoFocus
                    margin="dense"
                    name="caption"
                    id="caption"
                    label="Caption"
                    type="text"
                    value={formData.caption}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="url"
                    name = "url"
                    label="Meme Url"
                    type="text"
                    value={formData.url}
                    onChange={handleChange}
                    fullWidth
                />
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
        <Snackbar open={openSnack} onClose={handleErrorClose}>
						<Alert onClose={handleErrorClose} severity="error">
							{formData.snackState}
						</Alert>
				</Snackbar>
      </Dialog>
    </div>
  );
}
