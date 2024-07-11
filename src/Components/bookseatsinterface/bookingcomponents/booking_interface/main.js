import React, { useState } from "react";
import Seatscheck from "./seats";
import Axios from "axios";

const SeatBooking = (props) => {
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const prevSelected = props.obj;
  const { _id } = props.obj;
  console.log(prevSelected);
  console.log(selectedSeats);
  console.log(_id);

  const getChilddata = (data) => {
    setSelectedSeats(data);
    const copy = {
      showName: props.obj.showName,
      location: props.obj.location,
      theater: props.obj.theater,
      date: props.obj.date,
      time: props.obj.time,
      seats: data,
    };
    Axios.put(
      "https://movie-ticket-booking-pzhg.onrender.com/shows/updateshow/" + _id,
      copy
    )
      .then((res) => {
        if (res.status === 200) alert("Booked Successfully");
        else Promise.reject();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <Seatscheck obj={prevSelected} getChilddata={getChilddata} />
    </div>
  );
};

export default SeatBooking;