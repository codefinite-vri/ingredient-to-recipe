import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { getMealRecipe } from '../api'

export default function SharedRecipe(){
    const {recipeid} = useParams();
    const [loading, setLoading] = React.useState(true);
    const [recipe, setRecipe] = React.useState({});
    const [method, setMethod] = React.useState([])
    const [ingred, setIngred]= React.useState([])

    const getRecipe = async() =>{
        const data = await getMealRecipe(recipeid); 
        console.log(data)   
        setMethod(data.instructions)
        setIngred(data.ingredients.split('$'));
        setRecipe(data);
        
    } 

    useEffect(() => setLoading(false),[recipe])

    useEffect(() => getRecipe(),[])
    
    return (
        <div>
        {!loading?
        <div className="page">
        <div className="page__body">
            <img src={recipe.image}
            alt="Recipe img"
            className="page__image"/>
            <h4 className="page__title">{recipe.recipeTitle}</h4>
            <p className="page__description">{recipe.likes} likes</p>
            <p className="page__description">Cook Time: {recipe.cookTime} minutes</p>
            <p className="page__description">Number of servings: {recipe.servings}</p>
            <h5 className="page__ingredients">Ingredients:<br/></h5>
            <ul className="recipe-list">
            {ingred.map(i => <li key={i}>{i}</li>)}</ul>
            <h5 className="page__insructions">Method:<br/></h5>
             <ol className="page-inst1">{method.map(m =><li key={m}>{m}</li>)}</ol>
            
        </div>
</div>
:<></>}
</div>

    );
}