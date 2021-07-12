import React, { useEffect } from 'react';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Slider,ListItemText,MenuItem,InputLabel,Select, Input } from '@material-ui/core';
import {Col} from 'react-bootstrap'

const useStyles = makeStyles((theme) => ({
  root: {
    width:200,
    marginTop:20,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  allergenFilter:{
    minWidth: 120,
    maxWidth: 200,
  }
}));

const PrettoSlider = withStyles({
  root: {
    color: '#c62828',
    height: 8,
    marginTop:50,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function RecipeFilter(props) {
  const classes = useStyles();
  

  const handleChange = (event) => {
    props.setRanges({ ...props.ranges, [event.target.name]: event.target.checked });
  };

  const handleSlider = (event,newVal) =>{
    props.setSlider(newVal)
  }

  const handleAllergens = (event) => {
    props.setAllergenName(event.target.value);
    };

  
const names = [
  'Tomato',
  'Potato',
  'Onion',
  'Cheese',
  'Milk',
  'Apple',
  'Peas',
  'Rice',
  'Chicken',
  'Eggs',
];


  useEffect(() =>{
    console.log(props)
    let arr = [];
    const { range1,range2,range3,range4,range5,range6 } = props.ranges;
    if(range1)
      arr.push(0,30);
    if(range2)
      arr.push(31,60);
    if(range3)
      arr.push(61,90);
    if(range4)
      arr.push(91,120);
      if(range5)
      arr.push(121,150);
    if(range6)
      arr.push(150);
    
    console.log(arr)
      props.setRangeArr(arr);

  },[props.ranges])



  const { range1,range2,range3,range4,range5,range6 } = props.ranges;

  return (
    <div /*className={classes.root}*/>
      <FormControl component="fieldset" /*</div>className={classes.formControl}*/>
        <FormLabel component="legend">Cook Time</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={range1} onChange={handleChange} name="range1" />}
            label="0-30 minutes"
          />
          <FormControlLabel
            control={<Checkbox checked={range2} onChange={handleChange} name="range2" />}
            label="31-60 minutes"
          />
          <FormControlLabel
            control={<Checkbox checked={range3} onChange={handleChange} name="range3" />}
            label="61-90 minutes"
          />
           <FormControlLabel
            control={<Checkbox checked={range4} onChange={handleChange} name="range4" />}
            label="91-120 minutes"
          />
          <FormControlLabel
            control={<Checkbox checked={range5} onChange={handleChange} name="range5" />}
            label="121-150 minutes"
          />
          <FormControlLabel
            control={<Checkbox checked={range6} onChange={handleChange} name="range6" />}
            label="150+ minutes"
          />
        </FormGroup>
      </FormControl>
      <div className={classes.root}>
      <FormLabel component="legend">Servings</FormLabel>
      <Col xs={8} lg={12}>
      <PrettoSlider valueLabelDisplay="on" aria-label="pretto slider"
      onChange={handleSlider}
      min={1}
      max={100}
      marks={[{value:1,label:'1'}]}
      defaultValue={5} /></Col>
    </div>
    
    <Col xs={3}>
    <FormControl className={classes.allergenFilter}>
        <InputLabel >Allergens</InputLabel>
        <Select
          multiple
          value={props.allergenName}
          onChange={handleAllergens}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={props.allergenName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Col>
    </div>
  );
}
