import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import {delFavorites, addFavorites , getFavorites} from '../api.js'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useAuth } from '../Contexts/AuthContext'
import {Button} from 'react-bootstrap'

export function FavoriteManager(props){
    const { currentUser } = useAuth();
    const [favs,setFavs] = React.useState([]);
    const [isLiked,setIsLiked] = React.useState('');
    const [change,setChange] = React.useState();

    const history = useHistory();
    //console.log(props)

    const getAll = async() =>{
      const data = await getFavorites(currentUser.email);  
      setFavs(data[0].Favorites)
      if(props.recChange !== undefined)   
        props.setRecChange(!props.recChange)   
    }

    const addFav = async() => {
            if(currentUser === null)
            sendLogin();
        else
        {//console.log(props.id)
          //setIsLiked(true);
          addFavorites(currentUser.email,props.id);
          setChange(!change)
          if(props.changed)
            props.setChanged(!props.changed)
        console.log('add to favs')
}
    }

    const delFav = async() =>{
          if(currentUser === null)
          sendLogin();
      else
      {
        //setIsLiked(false);
          delFavorites(currentUser.email,props.id);
          if(props.changed)
            props.setChanged(!props.changed)
          setChange(!change)

}
    }
  
    const sendLogin = () =>{
        history.push({
            pathname: '/login',
            state: { id : props.id}});
    }

    useEffect(() =>{
      setIsLiked(favs.includes(props.id));
    },[favs])

    useEffect(() =>{
      console.log('in change')
        if(currentUser !== null)
      getAll();
    },[change])


    return (
        <div>
        { props.isMyFav === undefined ? 
            <div>      
            {isLiked ?
          <Button
              variant="danger"
              onClick={delFav}>
          <FavoriteIcon />
           </Button>   
           :
           <Button
              variant="light"
              onClick={addFav}>
          <FavoriteIcon />
           </Button>   
           }
          </div>
            :
          <div>
          <Button
          type="button"
          variant="danger"
          onClick={delFav}
          >
            <FavoriteIcon/>
          </Button>
          </div>
          }
          </div>
    );

}
