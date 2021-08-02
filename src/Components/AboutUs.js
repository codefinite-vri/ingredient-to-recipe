import React, { Component } from 'react'
import CountUp from 'react-countup';
import Demo from './Demo.js'

export default class AboutUs extends Component {
    
    render() {
        return (
            <>
            <div>
        <section className="page-title">
          {/* Container Start */}
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2 text-center">
                {/* Title text */}
                <h2>ABOUT US</h2>
              </div>
            </div>
          </div>
          {/* Container End */}
        </section>
        <section className="section"style={{paddingBottom:'4rem'}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-img">
                  <img src="images/imagesabout.jpg" className="img-fluid w-100 rounded" alt="" />
                </div>
              </div>
              <div className="col-lg-6 pt-5 pt-lg-0">
                <div className="about-content">
                  <h4 className="font-weight-bold" style={{color:"#C90F03"}}>What is FoodieVerse?</h4>
                  <p>The Universe of Recipes for Foodies All Over!</p>
                  <br />
                  <h4 className="font-weight-bold" style={{color:"#C90F03"}}>How we can help?</h4>
                  <p>You have the ingredients, we have the recipes! Together we ensure that you have the most cherishing meals of your life! With a wide variety of cuisines and ingredients, we take care of your needs and cravings. Features like Shopping List, Meal Planner and Surprise Recipe are just added benefits!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Demo/>     
        <section className="section"style={{paddingTop:'4rem'}}>
          <div className="container">
              <center>
                <div className="about-content">
                  <h3 className="font-weight-bold" style={{color:"#C90F03"}}>Sources</h3>
                  <h4 className="font-weight-bold" style={{color:"black"}}>Dadi Ke Nuskhe</h4>
                  <p>Home Remedies by Dr. Vilas Orosakar (Rahul Publications)</p>
                  <h4 className="font-weight-bold" style={{color:"black"}}>Recipes</h4>
                  <p>AllRecipes.com</p>
                </div>
              </center>
          </div>
        </section>
        <section className="mb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading text-center text-capitalize font-weight-bold py-5">
                  <h2>Our team</h2>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card my-3 my-lg-0">
                  <img className="card-img-top" src="images/wom001.jpg" alt="Card img cap" />
                  <div className="card-body bg-gray text-center">
                    <h5 className="card-title">Vritika Naik</h5>
                    <p className="card-text">Founder / CEO</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card my-3 my-lg-0">
                  <img className="card-img-top" src="images/men001.png" alt="Card img cap" />
                  <div className="card-body bg-gray text-center">
                    <h5 className="card-title">Rushabh Wadkar</h5>
                    <p className="card-text">Founder / CEO</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card my-3 my-lg-0">
                  <img className="card-img-top" src="images/men001.png" alt="Card img cap" />
                  <div className="card-body bg-gray text-center">
                    <h5 className="card-title">Apurva Virgincar</h5>
                    <p className="card-text">Founder / CEO</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card my-3 my-lg-0">
                  <img className="card-img-top" src="images/wom002.png" alt="Card img cap" />
                  <div className="card-body bg-gray text-center">
                    <h5 className="card-title">Joyrel Vaz</h5>
                    <p className="card-text">Founder / CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section bg-gray">
          <div className="container">
            <div className="row">
            <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
                <div className="counter-content text-center bg-light py-4 rounded">
                  <i className="fa fa-smile-o d-block" />
                  
                    <CountUp start={0}
                    end={25}
                    duration={5}></CountUp>
                      <h5>Number of Cuisines</h5>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
                <div className="counter-content text-center bg-light py-4 rounded">
                  <i className="fa fa-smile-o d-block" />
                  
                    <CountUp start={10000}
                    end={20000}
                    duration={15}></CountUp>
                      <h5>Verified Recipes</h5>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
                <div className="counter-content text-center bg-light py-4 rounded">
                  <i className="fa fa-smile-o d-block" />
                  
                    <CountUp start={0}
                    end={1013}
                    duration={10}></CountUp>
                      <h5>Registered Members</h5>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
                <div className="counter-content text-center bg-light py-4 rounded">
                  <i className="fa fa-smile-o d-block" />
                  
                    <CountUp start={220}
                    end={2413}
                    duration={10}></CountUp>
                      <h5>Active Users</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
            </>
        )
    }
}