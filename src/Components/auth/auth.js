import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import SignIn from "./signin";
import SignUp from "./signup";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signIn");

  const handleTabClick = (tab) => {
    if (tab === activeTab) {
      return;
    }

    setActiveTab(tab);
  };

  return (
    <Container className="p-3 my-5">
      <Nav fill variant="pills" className="mb-3 container">
        <Nav.Item>
          <Nav.Link
            onClick={() => handleTabClick("signIn")}
            active={activeTab === "signIn"}
          >
            Sign In
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleTabClick("signup")}
            active={activeTab === "signup"}
          >
            Sign Up
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "signIn" && <SignIn />}

      {activeTab === "signup" && <SignUp />}
    </Container>
  );
};

export default Auth;