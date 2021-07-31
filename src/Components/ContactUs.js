import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Container} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import EmailIcon from '@material-ui/icons/Email';
import SubjectIcon from '@material-ui/icons/Subject';
import MessageIcon from '@material-ui/icons/Message';
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('#C90F03'),
      backgroundColor: '#C90F03',
      '&:hover': {
        backgroundColor: '#C90F03',
        boxShadow:'3px 3px 3px #AAA',
      },
    },
  }))(Button);

export default function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_ae2cyni', 'template_tcoxuwk', e.target, 'user_CRd20x0pFCUsDeI6n0iwQ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  }

  const classes = useStyles();

  return ( <>
  <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'1rem 0'}}
    >
    
    <center> 
          <h4>CONTACT US</h4>
          <form className="contact-form" onSubmit={sendEmail}>
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <AccountCircle />
            </Grid>
            <Grid item>
                <TextField id="input-with-icon-grid" label="Name" name="username"  required="required"/>
            </Grid>
            </Grid>
        </div>
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <EmailIcon />
            </Grid>
            <Grid item>
                <TextField id="input-with-icon-grid" label="Email" name="email"  required="required" />
            </Grid>
            </Grid>
        </div>
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <SubjectIcon />
            </Grid>
            <Grid item>
                <TextField id="input-with-icon-grid" label="Subject" name="subject"  required="required" />
            </Grid>
            </Grid>
        </div>
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <MessageIcon />
            </Grid>
            <Grid item>
                <TextField id="input-with-icon-grid" label="Message" name="message" required="required" />
            </Grid>
            </Grid>
        </div>
        <br/>
        <ColorButton
        variant="contained"
      >      
        <input className="SendBtn" type="submit" />
      </ColorButton>
      </form>
    </center>
    </Container>
    </>
  );
}
