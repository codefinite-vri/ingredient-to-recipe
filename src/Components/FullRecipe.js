import React from 'react'
import './FullRecipe.css'
import SocialMediaIntegration from './SocialMediaIntegration'
import MealHandler from './MealHandler';

export default function FullRecipe(props) {
    const method = props.location.state.instructions;
    const ingred = props.location.state.ingredients.split('$');
    console.log(props.location.state.cookTime)

  return (
      <div className="page">
            <div className="page__body">
                <img src={props.location.state.img}
                alt="Recipe img"
                className="page__image"/>
                <h4 className="page__title">{props.location.state.title}</h4>
                <p className="page__description">Cook Time: {props.location.state.cookTime} minutes</p>
                <p className="page__description">Number of servings: {props.location.state.servings}</p>
                <h5 className="page__ingredients">Ingredients:<br/></h5>
                <ul className="recipe-list">
                {ingred.map(i => <li key={i}>{i}</li>)}</ul>
                <h5 className="page__insructions">Method:<br/></h5>
                 <ol className="page-inst1">{method.map(m =><li key={m}>{m}</li>)}</ol>
                 <div className="same-line-components">
                    <SocialMediaIntegration title={props.location.state.title} url={`localhost:3000/recipe/${props.location.state.id}`} />
                    <MealHandler recipe={props.location.state} />
                 </div>
            </div>
    </div>
    )
}
