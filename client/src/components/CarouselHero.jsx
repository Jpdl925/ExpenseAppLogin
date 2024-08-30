import React from 'react';
import { Carousel } from 'react-bootstrap';

import Laptop from '../assets/beachlaptop.jpg';
import coffee from '../assets/coffe.jpg';
import moon from '../assets/moon.jpg'

const CarouselHero = ( { isDarkMode } ) => {
  return (
    <>
    <Carousel data-bs-theme={isDarkMode ? "light" : "dark"}>
      <Carousel.Item className='CItem'>
        <img
          className="carouselImage d-block w-100"
          src={coffee}
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item className='CItem'>
        <img
          className="carouselImage d-block w-100"
          src={Laptop}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item className='CItem'>
        <img
          className="carouselImage d-block w-100"
          src={moon}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default CarouselHero