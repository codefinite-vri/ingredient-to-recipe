import React, { useEffect, useState } from 'react'
import {useAuth} from '../Contexts/AuthContext'
import { Redirect } from 'react-router';
import { getTempRecipes } from '../api';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    depositContext: {
      flex: 1,
    },
  });
  

export function AdminRoute(){
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

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

            <Paper elevation={3}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>#</TableCell>
                                      <TableCell>Recipe Title</TableCell>
                                      <TableCell>Recipe Author Email</TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {tempRecipes.map((t,index) => {
                                      return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                          <TableCell>{index+1}</TableCell>
                                          <TableCell>{t.recipeTitle}</TableCell>
                                          <TableCell>{t.userEmail}</TableCell>
                                          <TableCell>
                                          <Link
                                            to={{
                                                pathname:'/user-recipe',
                                                state:{recipe:t}
                                            }}
                                            >
                                                View Recipe
                                            </Link>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={tempRecipes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                              />
                            </Paper>   
        </div>
        :
        <Redirect to='/not-found'/>
                }
        </div>
    );
}