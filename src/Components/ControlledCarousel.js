import React , { useState } from 'react'
import { Carousel }  from 'react-bootstrap'
import './Home.css'

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <>
      <Carousel className="carousel-desktop">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'images/ingred1.png'}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'images/ingred2.png'}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'images/ingred2.png'}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      </>
    );
  }