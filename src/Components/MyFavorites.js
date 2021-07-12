import React, {useState, useEffect } from 'react'
import {getFavRecipes} from '../api.js'
import Card from './Card.js'
import Alert from 'react-bootstrap/Alert'
import { useAuth } from '../Contexts/AuthContext'

export default function MyFavorites(){

    const [list,setList] = useState([]);
    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [isMyFav, setIsMyFav] = useState(true);
    const [changed,setChanged] = useState(false);

    const getAll = async() =>{
        try{
        setList(await getFavRecipes(currentUser.email));            
        }
        catch(error){
            setError(error)
        }
    }

    useEffect(() =>{
        //console.log('reloading favs')
            getAll();
    },[changed])

    return(
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            <h2 align="center" className="mb-3">My favorites </h2>
            <ul>
        {
          <div className="wrapper">     
          { 
          list.length > 0 ?
          list.map(r =>
          <Card 
          key={r.id}
          id = {r.id}
          title = {r.title}
          instructions = {r.instructions}
          ingredients = {r.ingredients}
          img = {r.images}  
          likes={r.likes}       
          servings={r.servings}
          isMyFav={isMyFav}
          changed={changed}
          setChanged={setChanged}
          ></Card>)
            :
            <p>No favorites yet :(</p>
        }

      </div>
        }</ul>
        </div>
    );
}