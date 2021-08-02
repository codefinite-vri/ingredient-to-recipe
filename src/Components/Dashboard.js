import React, { useEffect, useState } from 'react'
import { makeStyles} from '@material-ui/core/styles';
import { Card, Alert, Row, Col, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddRecipe from './AddRecipe';
import RecipeCarousel from './RecipeCarousel'
import { getMyRecipes } from '../api';

export function LoginButton() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()
  


    async function handleLogOut(){
      setError('')
      try{
          await logout()
          history.push('/login')
      }catch(error){
          setError(error.message)
      }
    }
  
   return (
    <>
      {console.log(error)}
{/*   
      {currentUser?
          <Button onclick={handleLogOut}>Log Out</Button>
      :
        <NavItem className="nav-item-n right-nav l-n">
          <NavLink href="/Login">Login</NavLink>
        </NavItem>
      } */}
    </>
    );
  }

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
  
  function preventDefault(event) {
    event.preventDefault();
  }

export default function UserProfile() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [pending,setPending] = useState([]); 
    const [rejected,setRejected] = useState([]); 
    const [accepted,setAccepted] = useState([]); 
    const [rerender,setRerender] = useState(false);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const getMyRecipeData = async() =>{
      const data = await getMyRecipes(currentUser.email);
      if(data.length > 0)
      setAccepted(data[0].AcceptedRecipes)
      setPending(data[0].PendingRecipes)
      setRejected(data[0].RejectedRecipes)
    }

    useEffect(() => {
      getMyRecipeData();
    },[rerender])
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    async function handleLogOut(){
        setError('')
        try{
            await logout()
            history.push('/login')
        }catch(error){
            setError(error.message)
        }

    }

    return (
        <>
        <Card>
            <LoginButton/>
        </Card>
        <br></br>
        <Card className="no-click">
            <Card.Body>
                {currentUser ?
                <div>
                    <div className="text-center mb-4" >
                        {error && <Alert variant="danger">{error}</Alert>}
                        <h2 className="mb-2">Hello {currentUser.displayName}!</h2>
                        <strong>Email:</strong> {currentUser.email}

                        {currentUser.emailVerified ?
                        <>
                         <Button className="SendBtn right-align" onClick={handleLogOut}>
                                        Log Out
                                    </Button>
                                    <br/>
                            <Col>
                            <center>
                                <Row className="d-flex justify-content-around mt-2">
                                    <Link to="/update-profile" className="btn SendBtn btnpadd">Update Profile</Link>
                                    <AddRecipe
                                      setRerender={setRerender}
                                    />
                                    <Link to="/shopping-list" className="btn SendBtn btnpadd">Shopping List</Link>
                                </Row>
                            </center>
                            </Col>
                            <h2 className="title-dash">My Approved Recipes</h2>
                                <RecipeCarousel
                                  recipes={accepted}
                                  carousel={rerender}
                                  setCarousel={setRerender}
                                />
                            {/*<h2 className="title-dash">My Favourites</h2>
                                <RecipeCarousel/>*/}
                            <h2 className="title-dash">Pending Recipes</h2>
                            <Paper elevation={3}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>#</TableCell>
                                      <TableCell>Recipe title</TableCell>
                                      <TableCell>Upload date</TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {pending.map((row,index) => {
                                      return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                          <TableCell>{index+1}</TableCell>
                                          <TableCell>{row.recipeTitle}</TableCell>
                                          <TableCell>{row.uploadDate}</TableCell>
                                          <TableCell>
                                            <Link to={{
                                              pathname:'/user-recipe',
                                              state:{recipe:row}
                                            }}>View Recipe</Link>
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
                                count={pending.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                              />
                            </Paper>   
                            
                            <h2 className="m-2">REJECTED RECIPES</h2>
                            <Paper elevation={3}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>#</TableCell>
                                      <TableCell>Recipe title</TableCell>
                                      <TableCell>Rejection Date</TableCell>
                                      <TableCell>Comment</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {rejected.map((rej,index) => {
                                      return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                          <TableCell>{index+1}</TableCell>
                                          <TableCell>{rej.recipeTitle}</TableCell>
                                          <TableCell>{rej.rejectionDate}</TableCell>
                                          <TableCell>{rej.comment}</TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={pending.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                              />
                            </Paper>   


                             
                            </>
                        :
                            <div className="text-center mt-3" >
                                <Alert variant="danger">
                                    <strong>User Not Verified</strong>
                                    <br></br>
                                    Please verify email to avail features. Refresh page if verification has been completed.
                                </Alert>
                                    <Button className="SendBtn" onClick={handleLogOut}>
                                        Log Out
                                    </Button>
                            </div>
                        }
                    </div>
                </div>
                :
                <div className="text-center" >
                    <h2 className="mb-2">User Not Logged In</h2>
                    <Link to="/login" className="btn SendBtn">Log In</Link>
                </div>
                }
                
            </Card.Body>
        </Card>    
        
        </>
    )
}
