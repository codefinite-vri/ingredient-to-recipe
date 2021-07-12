import React, {useState , useEffect} from 'react'
import './Recipe.css'
import Card from './Card'
import {getRecipes} from '../api.js'
import { useLocation } from 'react-router'
import SearchManager from './Search'
import RecipeFilter from './RecipeFilter'
import {Col,Row,Container} from 'react-bootstrap'

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
    const [allergenName,setAllergenName] = React.useState([]);
    const [recChange,setRecChange] = useState(false);

    const fetchRecipes=async()=>{
        try{
          console.log('in fetch rec')
         const rec = await getRecipes(location.search,rangeArr,slider,mode);
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
      },[location.search,rangeArr,slider,recChange]);


        return (
            <Container>  
            <Row className="justify-content-md-center">
              <Col>
              <SearchManager setCurrentMode = {setMode} currentMode={mode}></SearchManager> 
              </Col>
              </Row>
            <Row>
              <Col xs={4} md={3} className="border-right mh-100 border-dark"><RecipeFilter
              setRanges={setRanges}
              ranges={ranges}
              slider={slider}
              setSlider={setSlider}
              setRangeArr={setRangeArr}
              allergenName={allergenName}
              setAllergenName={setAllergenName}
            /> 
            </Col>
            <Col xs={8} md={9}>
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