import React from 'react'
import {Button} from 'react-bootstrap'
import EventOutlinedIcon from '@material-ui/icons/EventOutlined'
import {useHistory} from 'react-router-dom'

export default function MealHandler(props){

    
  const history = useHistory();

  const mealHandler = ()=>{
    let obj = {
      id:props.recipe.id,
      title:props.recipe.title,
      instructions:props.recipe.instructions,
      ingredients:props.recipe.ingredients,
      img:props.recipe.img,
      servings:props.recipe.servings
    }
    history.push({
      pathname: '/meal-planner',
      state: {recipe:obj}
    });
  }

  return  <div>
  <Button className='btn-red'
  onClick={mealHandler}
  ><EventOutlinedIcon/></Button>
  </div>
}