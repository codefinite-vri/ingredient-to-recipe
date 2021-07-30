import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ShareIcon from '@material-ui/icons/Share';
import {IconButton} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, LinkedinIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
  } from "react-share";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SocialMediaIntegration=({title, url})=>{
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>   
        
     <List component="nav" className={classes.root} >        
      <WhatsappShareButton className="social-media-icon" url={`Check out this recipe of ${title}: ${url}`}>
        <ListItem button>
        <WhatsappIcon size={32} round={true}/>
        <h6 className="smi-text">WhatsApp</h6>
        </ListItem>
        </WhatsappShareButton>
        <Divider />
        <FacebookShareButton className="social-media-icon" url={url} quote={`Check out this recipe of ${title}: `}>
        <ListItem button >
        <FacebookIcon size={32} round={true}/>
        <h6 className="smi-text">Facebook</h6>
        </ListItem>
        </FacebookShareButton>
        <Divider/>
        <EmailShareButton className="social-media-icon" url={url} subject={title} body={`Check out this recipe of ${title}: `}>
        <ListItem button>
        <EmailIcon size={32} round={true}/>
        <h6 className="smi-text">Email</h6>
        </ListItem>
        </EmailShareButton>
        <Divider light />
        <LinkedinShareButton className="social-media-icon" url={url} title={`Check out this recipe of ${title} at `}>
        <ListItem button>
        <LinkedinIcon size={32} round={true}/>
        <h6 className="smi-text">LinkedIn</h6>
        </ListItem>
        </LinkedinShareButton>
        <Divider light />
        <TwitterShareButton className="social-media-icon" url={`Check out this recipe of ${title} at ${url}`}>
        <ListItem button>
        <TwitterIcon size={32} round={true}/>
        <h6 className="smi-text">Twitter</h6>
        </ListItem>
        </TwitterShareButton>
        </List>
    </div>
  );

  return (
    <>
    <IconButton aria-label="share" onClick={handleOpen}>
          <ShareIcon className="red-icon" />
        </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

export default SocialMediaIntegration;