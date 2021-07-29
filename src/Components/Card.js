import React from 'react'
import './Card.scss'
import CardActions from '@material-ui/core/CardActions';
import {Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {FavoriteManager} from './FavoriteManager'
import MealHandler from './MealHandler';
import SocialMediaIntegration from './SocialMediaIntegration'


export default function Card(props) {

    return (
        <div className="card">
          {/*error && <Alert variant="danger">{error}</Alert>*/}
            <div className="card__body">
                <img src={props.img}
                alt="Recipe img"
                className="card__image"/>
                <h4 className="card__title">{props.title}</h4>
                <p className="card__description">{props.servings}</p>
                <p className="card__description">
                  {!props.likes ? 0: props.likes} likes</p>
                <CardActions disableSpacing>
                <FavoriteManager
                      setRecChange={props.setRecChange} // from recipes
                      recChange={props.recChange}
                      id={props.id}
                      carousel={props.carousel}
                      setCarousel={props.setCarousel}
                      isMyFav={props.isMyFav} //checks if the page is myfavourites page
                      changed={props.changed}
                      setChanged={props.setChanged} //changed and setChanged come from myfavourites page
                      surprise={props.surprise}
                      rerender={props.rerender}
                />  
        <SocialMediaIntegration title={props.title} url={`localhost:3000/recipe/${props.id}`} />

      <MealHandler
      recipe={props}
      />
        
        <Link to={{ pathname:`/full-recipe/${props.id}`,
                    state:{
                      id:props.id,
                      title:props.title,
                      instructions:props.instructions,
                      ingredients:props.ingredients,
                      img:props.img,
                      cookTime:props.cookTime,
                      servings:props.servings
                      
                    }     
                      
                    }}>
  
        <Button variant="outline-danger" className="btn btn-md m-2">
          View Recipe
          </Button>
        </Link>   
      </CardActions>
       
       </div>
        </div>
    )
}
