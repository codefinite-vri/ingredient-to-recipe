import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import './Chip.css'
import { getPopularChips } from '../api';
import { PauseCircleFilledSharp } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip1:{
    '&:hover, &:focus': {
      
      backgroundColor: '#4d960c',
    },
    color:'white' ,
    backgroundColor:'#C90F03' 
  },


}
));



export default function SmallChips(props) {

  const classes = useStyles();
  const [chipData , setChipData]= useState([]);

  const getChips = async() =>{
      let chips = await getPopularChips(); //array of chip names and counts
      console.log(chips)
      setChipData(chips)
  }

  useEffect(() => {
      getChips();
      return () => setChipData(false);
  },[])


  useEffect(() => console.log(chipData),[chipData])

  const removeChip = (chipToDelete) => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  }

  const addChip = (chipToAdd) =>{
    props.setTags([...props.tags, chipToAdd]);
    removeChip(chipToAdd); //remove from chips section
  }
  
  const addToTray = ()=>{
 if(props.hasDeleted){
    props.setHasDeleted(false);
    setChipData([...chipData,props.deletedChip])
  }   
  }
 
  useEffect(()=>{
 addToTray();   
  })


 return (
    <div className={classes.root}>
      <p>Most commonly searched: </p>
      {chipData.map(data => 
        <Chip
        key={data.key}
        avatar={<Avatar alt={data.label[0]} src='xyz.jpg' />}
        className={classes.chip1}
        size="small"
        clickable={true}
        label={data.label}
        onClick={() => addChip(data)}
      />
      )}
      
    </div>
  );
}
