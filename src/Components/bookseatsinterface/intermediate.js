import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";
import Axios from "axios";
const MovieDetails = () => {
  const [textColor, setTextColor] = useState("text-light");
  const [data, setData] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const calculateLuminance = (r, g, b) => {
      return 0.299 * r + 0.587 * g + 0.114 * b;
    };
    const backgroundImage = new Image();
    backgroundImage.src = "/background-image.jpg";
    backgroundImage.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = backgroundImage.width;
      canvas.height = backgroundImage.height;
      ctx.drawImage(
        backgroundImage,
        0,
        0,
        backgroundImage.width,
        backgroundImage.height
      );
      const [r, g, b] = ctx.getImageData(
        0,
        0,
        backgroundImage.width,
        backgroundImage.height
      ).data;
      const luminance = calculateLuminance(r / 255, g / 255, b / 255);
      setTextColor(luminance > 0.5 ? "text-dark" : "text-light");
    };
    Axios.get(
      "https://movie-ticket-booking-pzhg.onrender.com/movies/get-details/" + id
    )
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert(err));
  }, [id]);

  const trailerVideoLink = data.trailer; // Replace this with your actual trailer link
  const imdbRating = data.rating; // Replace this with your actual IMDb rating
  const booktickets = () => {
    if (localStorage.getItem("islogged") === "true") {
      window.location.href = "/#/booktickets/" + id;
    } else {
      window.location.href = "/#/auth";
    }
  };
  const genrearray = (genre) => {
    return genre.split(/\s+/);
  };
  const GenrePills = (genres) => {
    return (
      <div>
        {genres.map((genre, index) => (
          <Badge key={index} pill variant="primary" className="m-1">
            {genre}
          </Badge>
        ))}
      </div>
    );
  };
  return (
    <div
      className={`movie-details-page ${textColor}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="mt-4">
        <Row>
          <Col md={3}>
            <Card
              className="movie-poster-card border-0"
              style={{ background: "rgba(255,255,255,0)" }}
            >
              {/* IMDb Rating */}
              <div
                className="imdb-rating px-1"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  zIndex: "1",
                  color: "#F5C518",
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: "5px",
                }}
              >
                <FontAwesomeIcon
                  icon={faImdb}
                  className="fa"
                  style={{ fontSize: "36px" }}
                />
                <span>{imdbRating}</span>
              </div>
              <Card.Img
                variant="top"
                src={data.image}
                alt="Movie Poster"
                className="img-fluid"
              />
              <Card.Body
                style={{
                  background: "rgba(255,255,255,0)",
                  borderRadius: "8px",
                }}
              >
                <Card.Title className={`text-center ${textColor}`}>
                  {data.name}
                </Card.Title>
                <div className="container d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={booktickets}
                  >
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9}>
            {/* Movie Details */}
            <Card
              className="movie-details-card border-0"
              style={{ background: "rgba(255,255,255,0)", borderRadius: "8px" }}
            >
              <Card.Body>
                <Card.Title className={`text-white`}>
                  About the Movie
                </Card.Title>
                <Card.Text className={`text-white`}>{data.summary}</Card.Text>
                <div>
                  {data.genre &&
                    genrearray(data.genre)?.map((genre, index) => (
                      <Badge key={index} pill variant="warnin" className="m-1">
                        {genre}
                      </Badge>
                    ))}
                </div>
              </Card.Body>
            </Card>

            {/* Book Now Button */}

            <br />
            <div
              style={{
                width: "80%", // Set the fixed width as needed
                position: "relative",
                paddingTop: "45%", // Adjust the percentage for the desired aspect ratio
                margin: "20px auto", // Center the video
              }}
            >
              <ReactPlayer
                url={trailerVideoLink}
                controls
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;