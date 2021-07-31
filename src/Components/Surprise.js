import React, { useEffect } from 'react'
import { Container} from 'react-bootstrap';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import {useAuth} from '../Contexts/AuthContext'
import { makeStyles, withStyles,useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import RedeemIcon from '@material-ui/icons/Redeem';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import {Card} from 'react-bootstrap';
import Card from './Card';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { getMealRecipe, getSurpriseRecipe } from '../api';
import { white } from 'colorette';
import {getAllergens ,getIngredients} from '../api'

const names = [
  'Tomato',
  'Potato',
  'Onion',
  'Cheese',
  'Milk',
  'Mushroom',
  'Salt',
  'Sugar',
  'Chikpeas',
  'Water',
  'Rice',
  'Flour',
  'Peanut',
  'Cashew',
  'Fig',
  'Butter',
  'Mustard',
  'Coriander',
  'Cloves',
  'Orange',
  'Banana',
  'Apple',
  'Peas',
  'Rice',
  'Chicken',
  'Eggs',
];

const ings = [
  'Tomato',
  'Potato',
  'Onion',
  'Cheese',
  'Milk',
  'Mushroom',
  'Salt',
  'Sugar',
  'Chikpeas',
  'Water',
  'Rice',
  'Flour',
  'Peanut',
  'Cashew',
  'Fig',
  'Butter',
  'Mustard',
  'Coriander',
  'Cloves',
  'Orange',
  'Banana',
  'Apple',
  'Peas',
  'Rice',
  'Chicken',
  'Eggs',
];

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  cardSurprise: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: '#C90F03',
    color:'#fff',
    '&:hover': {
      backgroundColor: '#C90F03',
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  margin: {
    margin: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SurpriseRecipes() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const theme = useTheme();
  const [randomIng, setRandomIng] = React.useState([]);
  const {currentUser} = useAuth();
  const [time, setTime] = React.useState('');
  const [recipe,setRecipe] = React.useState();
  const[ingrs, setIngrs] = React.useState([]);
  const [rerender,setRerender] = React.useState(false);
  const [err,setError] = React.useState('')
  const [allergens, setAllergens] = React.useState([]);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  /*const getUserAllergens = async() =>{
    const data = await getAllergens(currentUser.email);
    setAllergens(data);
  }

  const getIng = async() =>{
    //setLoading(true);
      const data = await getIngredients();
      //setLoading(false)
      setIngrs(data);
  }  

  useEffect(()=> {
     // getIng();
  },[])


  useEffect(() => 
    {
      if(currentUser)
        getUserAllergens() 
  }
  ,[])*/

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = async() => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    if(randomIng === '')
      {
        alert('Please click on shuffler to choose your 3 musketeers!')
      }
    const res = await getSurpriseRecipe(randomIng.join('+.*'));
    //console.log(res)
    if(JSON.stringify(res) === '{}')
      setError("Whoops! Looks like we don't have any recipes with that ingredient combination. Try again!")
    
    else {
      setError('')  
      setRecipe(res);
    }
  };

  const randomizeHandler = () =>{
        // Shuffle array
    const shuffled = ings.sort(() => 0.5 - Math.random());

    // Get sub-array of first 3 elements after shuffled
    let selected = shuffled.slice(0, 3);

    setRandomIng(selected)
    /*let tmp = [],i=0
    while(i < 3){
    let r = Math.floor(Math.random() * ings.length);
    tmp[i] = ings[r]
    i++ 
    }
    console.log(tmp)
    setRandomIng(tmp)   
    while(true){
      if(allergens.includes(ings[r]))
        r = Math.floor(Math.random() * ings.length);
      else{
        setRandomIng({...randomIng, ingIndex: ings[r]});
        break;
      }
    }*/

  }

  const getUpdatedRec = async() =>{
    if(recipe)
    {const data = await getMealRecipe(recipe._id);
    setRecipe(data);
      console.log(data)
  }
  }

  useEffect(() => {getUpdatedRec();
  },[rerender])

  useEffect(() =>{
    console.log(allergens)
    if(allergens.includes(randomIng))
      setRandomIng('');
  },[allergens])

  const handleChange = (event) => {
    let tmp = allergens;
    tmp.push(event.target.value);
    console.log(tmp)
    alert(event.target.value)
    setAllergens(tmp);
  };

  return (
      <>
      <center>
        <h2>Surprise Recipe</h2>
      <div>
    <FormControl className="allerg">
    <InputLabel>Musketeer #1</InputLabel>
    <br/>   <br/>
          <p>{randomIng[0]}</p>
        </FormControl>

        <FormControl className="allerg">
    <InputLabel>Musketeer #2</InputLabel>
    <br/>   <br/>
          <p>{randomIng[1]}</p>
        </FormControl>

        <FormControl className="allerg">
    <InputLabel>Musketeer #3</InputLabel>
    <br/>   <br/>


         <p>{randomIng[2]}</p>
         <Button onClick={randomizeHandler}><ShuffleIcon/></Button>
        </FormControl>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      

     {/* <FormControl className="allerg">
        <InputLabel >Allergens</InputLabel>
        <Select
          multiple
          value={allergens}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
         {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name,allergens, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
         </FormControl>*/}
    </div>
    <div className={classes.root}>
          <div className={classes.wrapper}>
            <Fab
              aria-label="save"
              className={buttonClassname}
              onClick={handleButtonClick}
            >
              {success ? <RedeemIcon /> : <SentimentVerySatisfiedIcon />}
            </Fab>
            {loading && <CircularProgress size={68} className={classes.fabProgress} />}
          </div>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              className={buttonClassname}
              disabled={loading}
              onClick={handleButtonClick}
            >
            Get Surprised!!!
            </Button>

          </div>
        </div>
    <div class="wrapper">
    { 
                recipe ?
                <Card
                id={recipe._id}
                title={recipe.recipeTitle}
                instructions={recipe.instructions}
                ingredients={recipe.ingredients}
                likes={recipe.likes}
                img={recipe.image}
                servings={recipe.servings}
                surprise={setRerender}
                rerender={rerender}
                />
                :
                <p>{err}</p>
            }
    </div>
    </center>
    </>
  );
}
