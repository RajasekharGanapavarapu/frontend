import { useState, useEffect } from "react";
import Axios from "axios";
import QRCode from "qrcode.react";
import CustomAlert from "./alert";
const Ticket = ({ finaldata }) => {
  const show_id = localStorage.getItem("show_id");
  const [showalert, setshowalert] = useState(false);
  const getcolor = () => {
    if (localStorage.getItem("darkmode") === "yes") {
      return "text-light";
    }
    return "text-dark";
  };
  const { date, location, seats, showName, theater, time } = finaldata;
  useEffect(() => {
    Axios.put(
      `https://movie-ticket-booking-pzhg.onrender.com/shows/updateshow/` +
        show_id,
      finaldata
    )
      .then((res) => {
        if (res.status === 200) {
          setshowalert(true);
        } else Promise.reject();
      })
      .catch((err) => {
        alert(err);
      });
  }, [show_id]);

  const generateRandomString = () => {
    return Math.random().toString(36).substring(7);
  };
  const unsetalert = () => {
    setshowalert(false);
  };
  const qrContent = generateRandomString();
  return (
    <div>
      {showalert && (
        <CustomAlert
          type="success"
          message={"Booking Successfull"}
          onClose={unsetalert}
        />
      )}
      {console.log(finaldata)}
      <h2 className={`${getcolor()}`}>Ticket Details</h2>
      <p className={`${getcolor()}`}>Show: {showName}</p>
      <p className={`${getcolor()}`}>Theater: {theater}</p>
      <p className={`${getcolor()}`}>Date: {date}</p>
      <p className={`${getcolor()}`}>Time: {time}</p>
      <p className={`${getcolor()}`}>Location: {location}</p>
      <p className={`${getcolor()}`}>
        Seats: {localStorage.getItem("selectedseatsnow")}
      </p>
      <div>
        <QRCode value={qrContent} />
      </div>
    </div>
  );
};
export default Ticket;