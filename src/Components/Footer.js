import React from 'react'
import {Navbar}  from 'react-bootstrap'
import './Footer.css'

export default function Footer() {
    return(
        
        <div className="main-footer">
        <div className="container">
        <div className="row">
        <div className="col-md-8 col-sm-18">
        <br></br><br></br>
        <Navbar.Brand className="nav-footer" href="/">
            FOODIEVERSE
        </Navbar.Brand>
        </div>
        <div className="col-md-4 col-sm-6">
        <br></br>
            <ul className="footer-list">
                <li >Recipe By Ingredient</li>
                <li>Recipe by Name</li>
                <li>Daadi Ke Nuskhe</li>
            </ul>            
        </div>
        </div>
        <div className="footer-bottom">
        <div className="p.text-xs-center">
        <center>&copy;{
            new Date().getFullYear()
        } FoodieVerse - All Rights Reserved</center>
        <br></br>
        </div>
        </div>
        </div>
        </div>
    )
}