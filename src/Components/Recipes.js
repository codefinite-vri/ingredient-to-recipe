import React, {useState , useEffect} from 'react'
import './Recipe.css'
import Card from './Card'
import {getRecipes} from '../api.js'
import { useLocation } from 'react-router'
import SearchManager from './Search'
import RecipeFilter from './RecipeFilter'
import {Col,Row,Container} from 'react-bootstrap'
import {useAuth} from '../Contexts/AuthContext'
import { getAllergens } from '../api';


export default function Recipes () {
    const [recipes, setRecipes] = useState([]);
    const [mode,setMode] = useState('Recipe');
    const location = useLocation();
    const [ranges, setRanges] = React.useState({
      range1: false, //0 to 30
      range2: false, //31 to 60
      range3: false, // 61 to 90
      range4: false, //91 to 120
      range5: false, //121 to 150
      range6: false, //150+
    });
    const [slider,setSlider] = React.useState(5)
    const[rangeArr, setRangeArr] = useState([]);
    const {currentUser} = useAuth();
    const [allergenName,setAllergenName] = React.useState([]);
    const [recChange,setRecChange] = useState(false);

    const getUserAllergens = async() =>{
      const data = await getAllergens(currentUser.email)
      console.log(data)
     setAllergenName(data)
    }
    
    useEffect(() => {
        if(currentUser)
           getUserAllergens();
    },[])

    const fetchRecipes=async()=>{
        try{
          console.log('in fetch rec')
          const search = location.state ? location.state.search : '' ;
         const rec = await getRecipes(search,rangeArr,slider,mode,allergenName);
         setRecipes(rec);
        }catch(error){
          console.log(error);
        }  
      }

      useEffect(() => {
        console.log('fetching again')
        if(location.state !== undefined)
          setMode(location.state.mode)
          fetchRecipes();
      },[location.state,rangeArr,slider,recChange,allergenName]);

        return (
            <Container>  
            <Row className="justify-content-md-center">
              <Col>
              <SearchManager setCurrentMode = {setMode} currentMode={mode}></SearchManager> 
              </Col>
              </Row>
            <Row>
              <Col xs={12} sm={2} md={2} className="border-right mh-100 border-dark"><RecipeFilter
              setRanges={setRanges}
              ranges={ranges}
              slider={slider}
              setSlider={setSlider}
              setRangeArr={setRangeArr}
              allergenName={allergenName}
              setAllergenName={setAllergenName}
            /> 
            </Col>
            <Col xs={12} sm={10} md={10}>
            <div className="wrapper">
                    {
                    recipes.map(r =>
                    <Card 
                    key={r._id}
                    id = {r._id}
                    title = {r.recipeTitle}
                    instructions = {r.instructions}
                    ingredients = {r.ingredients}
                    cookTime={r.cookTime}
                    img = {r.image}        
                    servings={r.servings}
                    likes={r.likes}
                    recChange={recChange}
                    setRecChange={setRecChange}
                    ></Card>)
                    }
             
                </div>
            </Col>
            </Row>
            </Container>
        )
}