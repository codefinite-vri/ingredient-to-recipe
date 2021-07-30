import React from 'react'
import './Home.css'
import ControlledCarousel from './ControlledCarousel';
import { Container, Row, Col } from 'reactstrap'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);


const useStyles = makeStyles((theme) => ({
    paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();

  return(
    <>
      <header className="mobile-design">
      <div className="intro-logo jumbo-bg">
      <center>
      <h1>Welcome to FoodieVerse</h1>
        <h3 className="subtitle">The One-Stop Destination for all your Cooking Needs!</h3>
        <ControlledCarousel/>
          <Grid  className="inline-grid">  
          <Grid container justify="center" spacing={4}>
            <Grid item xs={12} sm={6} md={4} lg={3} className="margin-side-grid">
            <HtmlTooltip
            title={
              <React.Fragment>
               <center>Your search for recipes based on the ingredients you crave for ends here!</center>
              </React.Fragment>
            }
            >
              <Paper elevation={2} className="red-button">
                <span className="company-icons__item">
                    <i className="fas fa-carrot" />
                    <a href="./recipes" class="navL">Recipe Search</a>
                </span>
              </Paper>
            </HtmlTooltip>
          </Grid>
          <br/>
          <Grid item xs={12} sm={6} md={4} lg={3} className="margin-side-grid">
          <HtmlTooltip
            title={
              <React.Fragment>
                <center>Heal Naturally with verified homemade remedies.</center>
              </React.Fragment>
            }
            >
            <Paper elevation = {2} className="red-button" >
              <span className="company-icons__item">
                    <i className="fas fa-mortar-pestle" />
                    <a href="/home-remedies" class="navL">Dadi Ke Nuske</a>
              </span>
            </Paper>
            </HtmlTooltip>
          </Grid>
          <br/>
          <Grid item xs={12} sm={6} md={4} lg={3}  className="margin-side-grid">
            <HtmlTooltip
            title={
              <React.Fragment>
                <center>Don't know what to cook? Let us choose for you based on your requirements.</center>
              </React.Fragment>
            }
            >
              <Paper elevation={2} className="red-button">
                <span className="company-icons__item">
                    <i className="fas fa-carrot" />
                    <a href="./surprise-recipe" class="navL">Surprise Recipe</a>
                </span>
              </Paper>
            </HtmlTooltip>
          </Grid>
          </Grid>
        </Grid>
      </center>
    </div>
  </header>
    <section className="s1">
      <Container>
        <Row>
        <Col md="12" className="text-center s1-intro">
            <h1>Crave. Find. Devour.</h1>
            <h3>Recipes that make you go WOW!</h3>
          </Col>
        </Row>
      <Row className="s3__box-wrapper">
      
        <Col md="6" lg="3" className="s3__box-item">
        <a href="/recipes" className="text-link">
          <img
            src="images/home001.jpg"
            alt=""
          />
          <h3>Ingredient-based Search</h3>
          <p>
          Your search for recipes based on the ingredients you crave for ends here!
          </p>
          </a>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
        <a href="/home-remedies" className="text-link">
          <img
            src="images/home003.jpg"
            alt=""
          />
          <h3>Remedies for Illnesses</h3>
          <p>
          Heal Naturally with verified homemade remedies.
          </p>
          </a>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
        <a href="/meal-planner" className="text-link">
          <img
            src="images/home004.jpg"
            alt=""
          />
          <h3>Plan your Meals Before-hand</h3>
          <p>
            Like a recipe and wanna cook it for dinner on your Anniversary? Schedule it now.
          </p>
          </a>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
        <a href="/favorites" className="text-link">
          <img
            src="images/home005.jpg"
            alt=""
          />
          <h3>Like to save Favourites</h3>
          <p>
            Love it? Save for the Future!
          </p>
          </a>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
        <a href="/shopping-list" className="text-link">
          <img
            src="images/home006.jpg"
            alt=""
          />
          <h3>In-App Grocery Lists</h3>
          <p>
            Make a list of all the ingredients that you'll need to buy.
          </p>
          </a>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
        <a href="/surprise-recipes" className="text-link">
          <img
            src="images/home007.jpg"
            alt=""
          />
          <h3>Surprise Recipes</h3>
          <p>
           Don't know what to cook? Let us choose for you!
          </p>
          </a>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
        <a href="/image-search" className="text-link">
          <img
            src="images/home009.jpg"
            alt=""
          />
          <h3>Don't know what ingredient it is?</h3>
          <p>
            The Ingredient Recognition feature helps you solve your problem.
          </p>
          </a>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
        <a href="/contact-us" className="text-link">
          <img
            src="images/home011.jpg"
            alt=""
          />
          <h3>Chat with Us</h3>
          <p>
            Contact us via email and we will get back to you at the earliest.
          </p>
          </a>
        </Col>
      </Row>
      <Row>
        <Col md="12" className="text-center s1-intro">
            <h1>Come indulge in the Universe of Foodies.</h1>
            <h3>Cherish each meal you cook and get your craving satisfied.</h3>
            <h3>Don't just eat to live, also LIVE TO EAT!</h3>
          </Col>
        </Row>
    </Container>
    <style>{`
    .s3 {
        font-size: 16px;
        margin-top: 10em;
    }
    .s3__titles {
        margin-bottom: 2em;
    }
    .s3__titles h1 {
        font-size: 2.6em;
        font-weight: 100;
        text-align: center;
    }
    .s3__titles h4 {
        font-size: .9em;
        font-weight: 100;
        text-align: center;
        margin-top: 1.8em;
        color: hsl(0, 2%, 48%);
    }
    .s3__box-wrapper {

    }
    .s3__box-wrapper {
        text-align: center;
    }
    .s3__box-item {
        padding: 1em;
        margin: 0 1 px;
        transition: all .5s;
        box-shadow: #ece9e9 1px 1px 5px;
        cursor:pointer;
    }
    .s3__box-item:hover {
        box-shadow: red 1px 1px 15px;
    }
    .s3__box-item img {
        height: 100px;
    }
    .s3__box-item h3 {
        font-size: .9em;
        line-height: 2;
        font-weight: 700;
        letter-spacing: 1.5px;
        margin: 1.6em 0;
        text-transform: uppercase;
    }
    .s3__box-item p {
        font-weight: 100;
        font-size: .95em;
        line-height: 2;
        color: dimgray;
    }
    
    `}</style>
  </section>
    </>
  )
}