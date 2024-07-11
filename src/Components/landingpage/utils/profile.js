// userProfile.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import "./style.css";
const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [viewProfile, setViewProfile] = useState(true);
  const [viewBookedSeats, setViewBookedSeats] = useState(false);
  const [bookedseats, setBookedSeats] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://movie-ticket-booking-pzhg.onrender.com/shows/userBookedSeats/" +
          localStorage.getItem("id")
      )
      .then((res) => {
        if (res.status === 200) {
          setBookedSeats(res.data);
        } else Promise.reject();
      })
      .catch((err) => {
        console.log(err);
      });
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://movie-ticket-booking-pzhg.onrender.com/users/profile/${id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const printTicket = async (
    showName,
    location,
    theater,
    date,
    time,
    seatIds,
    noseats
  ) => {
    try {
      const randomString = Math.random().toString(36).substring(7);
      const qrCodeData = `Movie: ${showName}\nLocation: ${location}\nTheater: ${theater}\nDate: ${date}\nTime: ${time}\nSeats: ${seatIds.join(
        ", "
      )}\nQR Code Identifier: ${randomString}`;
      const qrCodeDataURL = await QRCode.toDataURL(qrCodeData);

      const doc = new jsPDF();

      doc.addImage(qrCodeDataURL, "JPEG", 50, 10, 100, 100);

      doc.setFontSize(16);
      doc.text(10, 120, `Booked By: ${localStorage.getItem("username")}`);
      doc.text(10, 140, `Movie: ${showName}`);
      doc.text(10, 150, `Location: ${location}`);
      doc.text(10, 160, `Theater: ${theater}`);
      doc.text(10, 170, `Date: ${date}`);
      doc.text(10, 180, `Time: ${time}`);
      doc.text(10, 190, `No. of Tickets: ${noseats}`);

      // Calculate the number of lines needed for seatIds
      const seatsPerLine = 18;
      const seatLines = Math.ceil(seatIds.length / seatsPerLine);

      // Create an array to store lines of seatIds
      const seatLinesArray = [];
      for (let i = 0; i < seatLines; i++) {
        const start = i * seatsPerLine;
        const end = Math.min(start + seatsPerLine, seatIds.length);
        const seatsLine = seatIds.slice(start, end).join(", ");

        // Print "Seats" label only for the first line
        if (i === 0) {
          doc.text(10, 200, `Seats: ${seatsLine}`);
        } else {
          doc.text(10, 200 + i * 10, seatsLine);
        }

        seatLinesArray.push(seatsLine);
      }

      doc.save("ReelRuckus_ticket.pdf");
    } catch (error) {
      console.error("Error generating and downloading ticket:", error);
    }
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
    setViewProfile(false);
    setViewBookedSeats(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setViewProfile(true);
    setViewBookedSeats(false);
  };

  const handleSaveChanges = async () => {
    try {
      console.log(userData);
      const data = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        mobile: userData.mobile,
        dob: userData.dob,
      };
      axios
        .put(
          `https://movie-ticket-booking-pzhg.onrender.com/users/profile/${id}`,
          data
        )
        .then((res) => {
          if (res.status === 200) {
            alert("Profile Updated Succesfully");
          }
        })
        .catch((err) => {
          alert(err);
        });
      setEditMode(false);
      setViewProfile(true);
      setViewBookedSeats(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleViewProfile = () => {
    setViewProfile(true);
    setViewBookedSeats(false);
    setEditMode(false);
  };

  const handleViewBookedSeats = () => {
    setViewProfile(false);
    setViewBookedSeats(true);
    setEditMode(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className={`btn btn-secondary w-100 ${
                    viewProfile ? "active" : ""
                  }`}
                  onClick={handleViewProfile}
                >
                  View Profile
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className={`btn btn-secondary w-100 ${
                    viewBookedSeats ? "active" : ""
                  }`}
                  onClick={handleViewBookedSeats}
                >
                  View Booked Seats
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className={`btn btn-secondary w-100 ${
                    editMode ? "active" : ""
                  }`}
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              </div>
            </div>
            {viewProfile && (
              <div>
                <h2 className=" my-3 text-center">{userData.name}'s Profile</h2>
                <p>Email: {userData.email}</p>
                <p>Mobile: {userData.mobile}</p>
                <p>Date of Birth: {userData.dob}</p>
              </div>
            )}
            {viewBookedSeats && (
              <div className="container mt-3">
                <h1 className="text-center mb-4">My Tickets</h1>
                <div className="row">
                  {bookedseats.map((booking, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card mb-4 shadow">
                        <div className="card-body">
                          <h5 className="card-title">{booking.showName}</h5>
                          <p className="card-text">
                            <strong>Location:</strong> {booking.location}
                          </p>
                          <p className="card-text">
                            <strong>Theater:</strong> {booking.theater}
                          </p>
                          <p className="card-text">
                            <strong>Date:</strong> {booking.date}
                          </p>
                          <p className="card-text">
                            <strong>Time:</strong> {booking.time}
                          </p>
                          <p className="card-text">
                            <strong>Total Seats Booked:</strong>{" "}
                            {booking.totalSeatsBooked}
                          </p>
                          <p className="card-text">
                            <strong>Seats:</strong> {booking.seatIds.join(", ")}
                          </p>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              printTicket(
                                booking.showName,
                                booking.location,
                                booking.theater,
                                booking.date,
                                booking.time,
                                booking.seatIds,
                                booking.totalSeatsBooked
                              )
                            }
                          >
                            Print Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {editMode && (
              <div className="my-3">
                <h2 className="text-center">Edit Profile</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={userData.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      value={userData.mobile}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="dob"
                      name="dob"
                      value={userData.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;