import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ForgetPassword from "./ForgetPage/ForgetPassword";
import Login from "./LoginPage/Login";
import Register from "./RegisterPage/Register";
const Auth = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      <Container>
        <Row className="py-5">
          <Col md={6} className="py-5">
            <img
              src="https://i.ibb.co/gjjXMFV/login.png"
              alt=""
              srcset=""
              className="img-fluid"
            />
          </Col>
          <Col md={6} className="py-5">
            {location.pathname === "/register" ? (
              <><Register/></>
            ) : location.pathname === "/forgotPassword" ? (
              <><ForgetPassword/></>
            ) : (
              <><Login/></>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
