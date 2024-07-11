import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome Icons
const PaymentForm = ({ finaldata }) => {
  const [formData, setFormData] = useState({
    cardholderName: "",
    creditCardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });
  const getcolor = () => {
    if (localStorage.getItem("darkmode") === "yes") {
      return "text-light";
    }
    return "text-dark";
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleConfirmPayment = () => {
    // Handle confirm payment logic here
    console.log("Payment confirmed:", formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h2 className={`text-center mb-4 ${getcolor()}`}>Payment Details</h2>
          <div className="card p-4">
            <div className="text-center mb-4">
              <div className="row">
                <div className="col">
                  <div className="card p-3">
                    <div className="card-body">
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        style={{ fontSize: "3rem" }}
                      />
                      <h6 className="card-title mt-2">Credit Card</h6>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card p-3">
                    <div className="card-body">
                      <FontAwesomeIcon
                        icon={faPaypal}
                        style={{ fontSize: "3rem" }}
                      />
                      <h6 className="card-title mt-2">PayPal</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cardholderName">Cardholder's Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <label htmlFor="expMonth">Exp Month</label>
                  <input
                    type="text"
                    className="form-control"
                    id="expMonth"
                    value={formData.expMonth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="creditCardNumber">
                        Credit Card Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="creditCardNumber"
                        value={formData.creditCardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="expYear">Exp Year</label>
                        <input
                          type="text"
                          className="form-control"
                          id="expYear"
                          value={formData.expYear}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {console.log(finaldata)}
    </div>
  );
};

export default PaymentForm;