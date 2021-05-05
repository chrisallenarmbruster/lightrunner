import React from 'react'
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item r4-carousel-item active">
          <div
            className="r4-carousel-overlay-image"
            style={{backgroundImage: 'url(/images/carousel/default01.jpg)'}}
          />
          <div className="container r4-carousel-container">
            <h1>Call to Action #1 </h1>
            <Link to="/login" className="btn btn-primary btn-lg mb-5">
              Action #1
            </Link>
          </div>
        </div>
        <div className="carousel-item r4-carousel-item">
          <div
            className="r4-carousel-overlay-image"
            style={{backgroundImage: 'url(/images/carousel/default02.jpg)'}}
          />
          <div className="container r4-carousel-container">
            <h1>Call to Action #2</h1>
            <Link to="/login" className="btn btn-primary btn-lg mb-5">
              Action #2
            </Link>
          </div>
        </div>
        <div className="carousel-item r4-carousel-item">
          <div
            className="r4-carousel-overlay-image"
            style={{backgroundImage: 'url(/images/carousel/default03.jpg)'}}
          />
          <div className="container r4-carousel-container">
            <h1>Call to Action #3</h1>
            <Link to="/login" className="btn btn-primary btn-lg mb-5">
              Action #3
            </Link>
          </div>
        </div>{' '}
      </div>
    </div>
  )
}

export default Landing
