import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../Contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import ShoppingList from './ShoppingList'
import AilmentList from './AilmentList'
import AilmentCategory from './AilmentCategory'
import HomeRemedies from './HomeRemedies'
import NavigationBar from './Navbar'
import Recipes from './Recipes'
import Home from './Home'
import Settings from './Settings'
import Footer from './Footer'
import Help from './Help'
import Demo from './Demo'
import SurpriseRecipes from './Surprise'
import './App.css';
import Feedback from './Feedback'
import Payments from './Payments'
import AboutUs from './AboutUs'
import MealPlanner from './MealPlanner'
import LoginError from './LoginError'
import FullRecipe from './FullRecipe'
import MyFavorites from './MyFavorites';
import ImageSearch from './ImageSearch';
// import Foodium from './Foodium'
import ContactUs from './ContactUs'
import Integration from './Integration'
import PrivacyPolicy from './PrivacyPolicy'
import { AdminRoute } from './AdminRoute';
import { NotFound } from './NotFound';
import UserProfile from './UserProfile'
import {UserRecipe} from './UserRecipe';
import SharedRecipe from './SharedRecipe'

function App() {
  
  return (
    <React.Fragment>
      <Router>
      <AuthProvider>
      <NavigationBar></NavigationBar>
      </AuthProvider></Router>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"72vh"}}
    >
      <div className="home-edits" >
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/user-profile" component={UserProfile} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/login-error" component={LoginError} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/home-remedies/:a_category/:a_name" component={HomeRemedies}/>
              <Route path="/home-remedies/:a_category" component={AilmentList}/>
              <Route path="/home-remedies" component={AilmentCategory}/>
              <Route exact path="/recipes" component={Recipes}/>
              <PrivateRoute path='/surprise-recipe' component={SurpriseRecipes}/>
              <Route path="/help" component={Help}/>
              <Route path="/demo" component={Demo}/>
              <Route path="/feedback" component={Feedback}/>
              <Route path="/payments" component={Payments}/>
              <Route path="/aboutus" component={AboutUs}/>
              <Route path='/full-recipe' component={FullRecipe}/>
              <Route path='/integrations' component={Integration}/>
              <Route path='/legal' component={PrivacyPolicy}/>
              <Route path='/contact' component={ContactUs}/>
              {/* <Route path='/foodium' component={Foodium}/> */}
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/settings" component={Settings}/>
              <PrivateRoute path="/image-search" component={ImageSearch}/>
              <PrivateRoute path='/favorites' component={MyFavorites}/>
              <PrivateRoute path="/shopping-list" component={ShoppingList} />
              <PrivateRoute path="/meal-planner" component={MealPlanner}/>
              <PrivateRoute path="/admin-route" component={AdminRoute}/>
              <Route path='/not-found' component={NotFound}/>
              <Route path='/user-recipe' component={UserRecipe}/>
              <Route path='/recipe/:recipeid' component={SharedRecipe}/>
              
            </Switch>
          </AuthProvider>
        </Router>        
      </div>
    </Container>
    <Footer></Footer>
    </React.Fragment>
   
  );
}

export default App;
