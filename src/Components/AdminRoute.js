import React, { useEffect, useState } from 'react'
import {useAuth} from '../Contexts/AuthContext'
import { Redirect } from 'react-router';
import { getTempRecipes } from '../api';
import {Table} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export function AdminRoute(){
    const {currentUser} = useAuth();
    const [tempRecipes,setTempRecipes] = useState([]);
    console.log(currentUser.email, process.env.REACT_APP_ADMIN2)

    const getAllTempRecipes = async() =>{
        const result = await getTempRecipes();
        setTempRecipes(result);
    }

    useEffect(() => {
        getAllTempRecipes();
    },[])

    return(
        <div>
        {currentUser.email === process.env.REACT_APP_ADMIN1 ||currentUser.email === process.env.REACT_APP_ADMIN2 ||currentUser.email === process.env.REACT_APP_ADMIN3 ||currentUser.email === process.env.REACT_APP_ADMIN4 ?          
        <div>
            <h1 align="center">Pending recipes</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Recipe name</th>
                        <th>Recipe author email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tempRecipes.map((t,index) =>
                            <tr>
                                <td>{index+1}</td>
                               <td>{t.recipeTitle}</td> 
                               <td>{t.userEmail}</td>
                               <td>
                                   <Link
                                   to={{
                                       pathname:'/user-recipe',
                                       state:{recipe:t}
                                   }}
                                   >
                                       View Recipe
                                   </Link>
                               </td>
                            </tr>
                            
                            )
                    }
                </tbody>
            </Table>
        </div>
        :
        <Redirect to='/not-found'/>
                }
        </div>
    );
}