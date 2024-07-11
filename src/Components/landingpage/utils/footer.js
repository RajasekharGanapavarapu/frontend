import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import CustomAlert from "../../bookseatsinterface/utils/alert";

const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const username = localStorage.getItem("username");
  const [showalert, setshowalert] = useState(false);
  const unsetalert = () => {
    setshowalert(false);
  };
  const handleSubmit = async (event) => {
    if (localStorage.getItem("islogged") === "false")
      window.location.href = "/#/auth";
    else {
      event.preventDefault();

      try {
        const currentDate = new Date();
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        };

        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          currentDate
        );

        console.log(formattedDate);

        const feedbackData = {
          username,
          feedback,
          time: formattedDate,
        };
        console.log(feedbackData);
        // Use axios.post instead of axios.put for adding new feedback
        await Axios.post(
          "https://movie-ticket-booking-pzhg.onrender.com/feedbacks/add-feedback",
          feedbackData
        )
          .then((res) => {
            if (res.status === 200) setshowalert(true);
          })
          .catch((err) => {
            console.error("Error submitting feedback:", err);
            alert("Error submitting feedback. Please try again.");
          });

        setFeedback("");
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    }
  };

  const getcolor = () => {
    return localStorage.getItem("darkmode") === "yes"
      ? "text-light"
      : "text-dark";
  };

  const getbg = () => {
    return localStorage.getItem("darkmode") === "yes" ? "bg-dark" : "bg-light";
  };

  return (
    <footer className={`${getbg()} text-white mt-5 py-2`}>
      {showalert && (
        <CustomAlert
          type="success"
          message={"Thanks for the Feeback"}
          onClose={unsetalert}
        />
      )}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="app-info">
              <h1 className={`${getcolor()} text-center app-name styled`}>
                <span className="app-initial text-danger">Reel</span>Ruckus
              </h1>
            </div>
          </div>
          <div className="col-md-4  ">
            <div className="footer-title mb-4">
              <b className={`${getcolor()}`}>Useful Links </b>
            </div>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/FAQ"
                  className={`${getcolor()} text-decoration-none`}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className={`${getcolor()} text-decoration-none`}
                >
                  About Us
                </Link>
              </li>
              <li className={`${getcolor()}`}>Advertise with Us</li>
              <li className={`${getcolor()}`}>Terms and Conditions</li>
            </ul>
          </div>
          <div className="col-md-4 ">
            <div className="footer-title mb-4">
              <b className={`${getcolor()}`}>Help</b>
            </div>
            <ul className="list-unstyled">
              <li className={`${getcolor()}`}>Help Me</li>
              <li className={`${getcolor()}`}>Feedback</li>
              <li className={`${getcolor()}`}>Report an Issue / Bug</li>
            </ul>
          </div>
          <div className="col-md-4 ">
            <div className="footer-title mb-4">
              <b className={`${getcolor()}`}>Feedback</b>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <textarea
                  onChange={(event) => setFeedback(event.target.value)}
                  value={feedback}
                  className="form-control h-150"
                  placeholder="Message..."
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-danger">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={`${getcolor()} ${getbg()} text-center py-3`}>
        Copyright &copy; 2023 | ReelRuckus
      </div>
    </footer>
  );
};

export default Footer;