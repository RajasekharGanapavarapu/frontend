import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { DropdownMenu } from "react-bootstrap";
function OffcanvasExample() {
  const handlelogout = () => {
    localStorage.setItem("islogged", false);
    window.location.href = "/";
  };
  const getcolor = () => {
    if (localStorage.getItem("darkmode") === "yes") {
      return "text-light";
    }
    return "text-dark";
  };
  const getlogo = () => {
    if (localStorage.getItem("darkmode") === "yes") {
      return "https://github.com/Rahul21sai/movie_forntend/assets/110412514/f5fba0cb-aaf3-4181-aa7f-e36273b744e5";
    }
    return "https://github.com/Rahul21sai/movie_forntend/assets/110412514/f5fba0cb-aaf3-4181-aa7f-e36273b744e5";
  };
  const geticon = () => {
    if (localStorage.getItem("darkmode") === "yes") {
      return "bg-light text-dark";
    }
    return "bg-dark text-light";
  };
  const gettheme = () => {
    if (localStorage.getItem("darkmode") === "yes") {
      return "light-icon";
    }
    return "dark-icon";
  };
  const getprofile = () => {
    window.location.href = "/#/profile/" + localStorage.getItem("id");
  };
  const genres = [
    "Action",
    "Animation",
    "Adventure",
    "Family",
    "Comedy",
    "Drama",
    "Romance",
    "Crime",
    "Thriller",
    "Sci-Fi",
  ];
  const [word, setWord] = useState("");
  const [data, setData] = useState([]);
  const [genredata, setgenredata] = useState([]);
  const getDetails = () => {
    if (word.length !== 0) {
      axios
        .get(
          "https://movie-ticket-booking-pzhg.onrender.com/movies/searchbyname/" +
            word
        )
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
          }
        });
    }
  };
  const getDetailsbygenre = (event) => {
    axios
      .get(
        "https://movie-ticket-booking-pzhg.onrender.com/movies/searchbygenre/" +
          event.target.id
      )
      .then((res) => {
        if (res.status === 200) {
          setgenredata(res.data);
        }
      });
  };
  const getMovieDetails = (event) => {
    window.location.href = "/#/moviedetails/" + event.currentTarget.id;
  };
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} variant="tabs" className="">
          <Container fluid>
            <Navbar.Brand href="#" className={`${getcolor()}`}>
              <img height="50px" alt="" src={getlogo()} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton className={gettheme()}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img
                    height="36px"
                    src="https://github.com/Rahul21sai/movie_forntend/assets/110412514/f5fba0cb-aaf3-4181-aa7f-e36273b744e5"
                    alt=""
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Form className="d-flex mx-5">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      onChange={(event) => {
                        setWord(event.target.value);
                      }}
                      aria-label="Search"
                    />
                  </Form>
                  <DropdownButton
                    as={ButtonGroup}
                    id={"search"}
                    variant={"success"}
                    title={"search"}
                    onClick={getDetails}
                    drop={"down-centered"}
                  >
                    {data.map((ele) => {
                      return (
                        <>
                          <Dropdown.Item id={ele._id} onClick={getMovieDetails}>
                            <span>
                              <img
                                src={ele.image}
                                style={{ width: "40px", marginRight: "10px" }}
                                alt=""
                              />
                            </span>
                            {ele.name}
                          </Dropdown.Item>
                          <Dropdown.Divider />
                        </>
                      );
                    })}
                  </DropdownButton>
                  <DropdownButton
                    as={ButtonGroup}
                    id={"search"}
                    variant={"primary"}
                    title={"Search by Genre"}
                    drop={"down-centered"}
                    className="mx-3"
                  >
                    {genres.map((ele) => (
                      <NavDropdown
                        title={ele}
                        id={ele}
                        drop="start"
                        onClick={getDetailsbygenre}
                      >
                        {genredata.map((record) => {
                          return (
                            <>
                              <Dropdown.Item
                                id={record._id}
                                onClick={getMovieDetails}
                              >
                                <span>
                                  <img
                                    src={record.image}
                                    alt=""
                                    style={{
                                      width: "40px",
                                      marginRight: "10px",
                                    }}
                                  />
                                </span>
                                {record.name}
                              </Dropdown.Item>
                              <Dropdown.Divider />
                            </>
                          );
                        })}
                      </NavDropdown>
                    ))}
                  </DropdownButton>
                  <Nav.Link
                    onClick={() => {
                      if (localStorage.getItem("darkmode") === "yes") {
                        localStorage.setItem("darkmode", "no");
                        window.location.reload();
                      } else {
                        localStorage.setItem("darkmode", "yes");
                        window.location.reload();
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleHalfStroke}
                      className={`${geticon()}`}
                      style={{ height: "20px", borderRadius: "10px" }}
                    />
                  </Nav.Link>
                  {localStorage.getItem("islogged") !== "true" ? (
                    <Link to="/auth">
                      <button className="btn btn-primary">
                        SignIn/Register
                      </button>
                    </Link>
                  ) : (
                    <>
                      <div
                        className="d-flex align-items-center px-3"
                        onClick={getprofile}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{
                            fontSize: "20px",
                            borderRadius: "10px",
                            marginRight: "8px",
                          }}
                          className={`${getcolor()}`}
                        />
                        <p className={`text-center mb-0 ${getcolor()}`}>
                          {localStorage.getItem("username")}
                        </p>
                      </div>
                      <Button
                        className={`btn btn-warning ${getcolor()}`}
                        onClick={handlelogout}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;