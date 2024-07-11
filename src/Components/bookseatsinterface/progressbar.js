// ProgressBarComponent.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Button } from "react-bootstrap";
import DateCityTheaterTime from "./utils/datecitytheatertime";
import { SeatBooking } from "./utils/selectseats";
import Payment from "./utils/payment";
import Ticket from "./utils/eticket";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./utils/styles.css";
import CustomAlert from "./utils/alert";

const ProgressBarComponent = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const [step, setStep] = useState(1);
  const [seatitems, setSeatitems] = useState([]);
  const [showalert, setshowalert] = useState(false);
  const [progressData, setProgressData] = useState({
    city: "",
    theaterName: "",
    showDate: "",
    time: "",
    name: movie,
  });
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [showDetails, setShowDetails] = useState([]);
  const [finaldata, setfinaldata] = useState({
    showName: movie,
    location: showDetails.location,
    theater: showDetails.theater,
    date: showDetails.date,
    time: showDetails.time,
    seats: showDetails.seats,
  });
  const [cangonext, setcangonext] = useState(false);
  const proceed = () => {
    setcangonext(true);
  };
  const dontproceed = () => {
    setcangonext(false);
  };
  const handleSelectionChange = (selectedData) => {
    setProgressData((prevData) => ({
      ...prevData,
      ...selectedData,
    }));
  };

  const getSelectedSeatChildData = (maindata) => {
    setSeatitems(maindata);
  };

  const getfinaldata = (data) => {
    setfinaldata(data);
  };

  useEffect(() => {
    Axios.get(
      `https://movie-ticket-booking-pzhg.onrender.com/movies/get-details/${id}`
    )
      .then((res) => {
        if (res.status === 200) {
          setMovie(res.data.name);
          localStorage.setItem("movie", res.data.name);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert(err));
  }, [id]);

  const handleSubmit1 = () => {
    setMovie(movie);
    Axios.post(
      "https://movie-ticket-booking-pzhg.onrender.com/shows/createshow",
      {
        showName: movie,
        time: progressData.time,
        date: progressData.showDate,
        location: progressData.city,
        theater: progressData.theaterName,
      }
    ).then((res) => {
      if (res.status === 200) {
        setShowDetails(res.data);
      }
    });
  };
  const unsetalert = () => {
    setshowalert(false);
  };
  const handleSubmit2 = () => {
    console.log("selectedSeats", selectedSeats);
    console.log("seatitem", seatitems);

    console.log("inprogressbar happydata", seatitems);
  };

  const handleNext = () => {
    if (cangonext) {
      if (step < 4) {
        if (step === 1) handleSubmit1();
        if (step === 2) {
          handleSubmit2();
          console.log("finaldata", finaldata);
        }
        setStep((prevStep) => prevStep + 1);
      } else {
        window.location.href = "/";
      }
    } else {
      setshowalert(true);
    }
  };

  const handleBack = () => {
    if (step === 1) window.location.href = "/";
    if (step === 3) window.location.href = "/";
    else setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const calculateProgress = () => {
    return ((step - 1) / 3) * 100;
  };

  return (
    <div className="container mt-5">
      {showalert && (
        <CustomAlert
          type="warning"
          message={"Complete the Steps"}
          onClose={unsetalert}
        />
      )}
      <div className="row justify-content-between align-items-center">
        {[1, 2, 3, 4].map((circle) => (
          <div
            key={circle}
            className={`col-auto circle ${circle === step ? "active" : ""} ${
              circle < step ? "completed" : ""
            }`}
          >
            {circle}
          </div>
        ))}
      </div>
      <ProgressBar now={calculateProgress()} className="my-3" />
      {step === 1 && movie && (
        <DateCityTheaterTime
          onSelectionChange={handleSelectionChange}
          proceed={proceed}
          dontproceed={dontproceed}
          moviename={movie}
        />
      )}
      {step === 2 && (
        <SeatBooking
          obj={showDetails}
          getfinaldata={getfinaldata}
          getSelectedSeatChildData={getSelectedSeatChildData}
          proceed={proceed}
          dontproceed={dontproceed}
        />
      )}
      {step === 3 && <Payment finaldata={finaldata} />}
      {step === 4 && <Ticket finaldata={finaldata} items={seatitems} />}
      <div className="text-center mt-3">
        <Button variant="secondary" onClick={handleBack} disabled={step === 4}>
          {step === 3 ? "cancel Payment" : "Go Back"}
        </Button>{" "}
        <Button variant="primary" onClick={handleNext}>
          {step === 4 ? "Finish" : ""}
          {step === 3 ? "Confirm Payment" : ""}
          {step === 2 ? "Proceed to payment" : ""}
          {step === 1 ? "Select Seats" : ""}
        </Button>
      </div>
    </div>
  );
};

export default ProgressBarComponent;