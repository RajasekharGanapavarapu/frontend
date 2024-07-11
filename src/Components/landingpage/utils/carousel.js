import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Carousel.css";
import Axios from "axios";

const Carousell = () => {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    Axios.get("https://movie-ticket-booking-pzhg.onrender.com/movies")
      .then((res) => {
        if (res.status === 200) setArr(res.data);
        else Promise.reject();
      })
      .catch((err) => alert(err));
  }, []);
  const getMovieDetails = (event) => {
    if (localStorage.getItem("islogged") === "true") {
      window.location.href = "/#/moviedetails/" + event.target.id;
    } else {
      window.location.href = "/#/auth";
    }
  };
  return (
    <Carousel>
      {arr.slice(0, 6).map((movie) => (
        <Carousel.Item key={movie.name} interval={3000}>
          <img
            src={movie.banner}
            alt={`Slide ${1}`}
            className="carousel-item img-fluid d-block h-45"
          />
          <Carousel.Caption>
            <button
              className="btn btn-primary"
              id={movie._id}
              onClick={getMovieDetails}
            >
              Book Now
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Carousell;