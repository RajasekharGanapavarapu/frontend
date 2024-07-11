import React, { useState } from "react";
import Axios from "axios";
import Hasher from "./utils/hasher";
import Loader from "./utils/loader";

function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  // const [loadingadmin, setLoadingadmin] = useState(false);
  const [message, setmessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    Axios.get(
      "https://movie-ticket-booking-pzhg.onrender.com/users/get-password/" +
        email
    )
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          if (!data) {
            setmessage("Email is not registered");
            setLoading(false);
            return;
          }

          Hasher(pass)
            .then((hashedPassword) => {
              if (hashedPassword === data.password) {
                localStorage.setItem("username", data.name);
                localStorage.setItem("id", data._id);
                localStorage.setItem("islogged", true);
                redirectToHome();
              } else {
                setmessage("Login Failed(incorrect password or email)");

                setLoading(false);
              }
            })
            .catch((error) => {
              console.error("Error hashing password:", error);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  // const handleAdminSubmit = (event) => {
  //   event.preventDefault()
  //   setLoadingadmin(true);
  //   Axios.get('http:///admins/get-password/' + email)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         const data = res.data;
  //         if (!data) {
  //           setmessage("Email is not registered");
  //           setLoadingadmin(false);
  //           return;
  //         }
  //         if (pass === data.password) {
  //           localStorage.setItem('username', data.name);
  //           localStorage.setItem('id', data._id);
  //           localStorage.setItem('islogged',true);
  //           localStorage.setItem('isAdmin', true)
  //           redirectToAdminHome();
  //         } else {
  //           setmessage("Login Failed(incorrect password or email)");

  //           setLoadingadmin(false);
  //         }

  //       } else {

  //         setLoadingadmin(false);
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err);
  //       setLoadingadmin(false);
  //     });
  // }

  const redirectToHome = () => {
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };
  const redirectToAdminHome = () => {
    setTimeout(() => {
      window.location.href = "/#/admin";
    }, 1500);
  };
  const getcolor = () => {
    if (localStorage.getItem("darkmode") === "yes") {
      return "text-light";
    }
    return "text-dark";
  };
  return (
    <div className="d-grid mx-auto" style={{ maxWidth: "60%" }}>
      <h2 className={`text-center mb-4 ${getcolor()}`}>Sign In</h2>
      <p className="text-danger text-center">{message}</p>
      <center className="row">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            className="form-control mb-3 col-8"
            placeholder="Enter your email"
          />
          <input
            type="password"
            id="password"
            onChange={(event) => setPass(event.target.value)}
            className="form-control mb-3 col-8"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="btn btn-success mx-2"
            style={{ margin: "0px auto" }}
          >
            {loading ? <Loader /> : "Login"}
          </button>
          {/* <button onClick={handleAdminSubmit} className='btn btn-info mx-2' style={{ margin: '0px auto' }}>
            {loadingadmin ? <Loader /> : 'Admin'}
          </button> */}
        </form>
      </center>
    </div>
  );
}

export default SignIn;