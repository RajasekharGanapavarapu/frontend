import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";

const Cards = () => {
  // Sample card data - Replace with your actual data
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
    <Container>
      <Row xs={2} sm={2} md={3} lg={6} className="g-4">
        {arr.map((card) => (
          <Col key={card.name}>
            <Card
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: "50", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={card.image}
                  alt={`Card ${card.id}`}
                  style={{ objectFit: "cover", height: "100%", width: "100%" }}
                />
              </div>
              <Card.Body>
                <Card.Text>{card.name}</Card.Text>
                <Button
                  variant="primary"
                  id={card._id}
                  onClick={getMovieDetails}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;