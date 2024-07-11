import { useEffect, useState } from "react";
import Axios from "axios";
import SeatBooking from "./booking_interface/main";
import "../styles/styles.css";

function BookTickets() {
  const [city, setCity] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [showDate, setShowDate] = useState("");
  const [time, setTime] = useState("");
  const [locations, setLocations] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [dates, setDates] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showTheatres, setShowTheatres] = useState(false);

  useEffect(() => {
    const today = new Date();
    today.setHours(6, 0, 0, 0);

    const options = [];

    for (let i = 0; i < 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];
      options.push({ date, formattedDate });
    }
    setDates(options);

    Axios.get(
      "https://movie-ticket-booking-pzhg.onrender.com/theatres/get-cities"
    )
      .then((res) => {
        if (res.status === 200) {
          setLocations(res.data);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const getTheatres = (selectedCity) => {
    Axios.get(
      `https://movie-ticket-booking-pzhg.onrender.com/theatres/get-theaters/${selectedCity}`
    )
      .then((res) => {
        if (res.status === 200) {
          setTheatres(res.data);
          setShowTheatres(true);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);

    getTheatres(selectedCity);
  };

  const handleTheaterSelect = (selectedTheater) => {
    setTheaterName(selectedTheater);
  };

  const handleDateSelect = (selectedDate) => {
    setShowDate(selectedDate);
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
  };

  const handleSubmit = () => {
    Axios.post(
      "https://movie-ticket-booking-pzhg.onrender.com/shows/createshow",
      {
        showName: localStorage.getItem("movie"),
        time: time,
        date: showDate,
        location: city,
        theater: theaterName,
      }
    ).then((res) => {
      if (res.status === 200) {
        setShowDetails(res.data);
        setShowSubmitButton(false);
      }
    });
  };

  const timeSlots = ["11:15 AM", "2:30 PM", "5:30 PM", "11:00 PM"];

  return (
    <div>
      <div className="card-container d-flex">
        {locations.map((location, index) => (
          <div
            key={index}
            className={`card ${
              city === location ? "bg-warning btn mx-3" : "btn mx-3"
            }`}
            onClick={() => handleCitySelect(location)}
          >
            {location}
          </div>
        ))}
      </div>
      {showTheatres && (
        <div className="card-container d-flex">
          {theatres.map((theater, index) => (
            <div
              key={index}
              className={`card ${
                theaterName === theater.name
                  ? "bg-warning btn mx-3"
                  : " btn mx-3"
              }`}
              onClick={() => handleTheaterSelect(theater.name)}
            >
              {theater.name}
            </div>
          ))}
        </div>
      )}
      {showTheatres && (
        <div className="card-container d-flex">
          {dates.map((dateObj, index) => (
            <div
              key={index}
              className={`card ${
                showDate === dateObj.date ? "bg-warning btn mx-3" : " btn mx-3"
              }`}
              onClick={() => handleDateSelect(dateObj.date)}
            >
              {dateObj.formattedDate}
            </div>
          ))}
        </div>
      )}
      {showTheatres && (
        <div className="card-container d-flex">
          {timeSlots.map((timeSlot, index) => (
            <div
              key={index}
              className={`card ${
                time === timeSlot ? "bg-warning btn mx-3" : " btn mx-3"
              }`}
              onClick={() => handleTimeSelect(timeSlot)}
            >
              {timeSlot}
            </div>
          ))}
        </div>
      )}
      {showSubmitButton && (
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      )}
      {!showSubmitButton && <SeatBooking obj={showDetails} />}
    </div>
  );
}

export default BookTickets;