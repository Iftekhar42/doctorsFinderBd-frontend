import { signOut } from "firebase/auth";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../../Firebase/Firebase.init";
import styles from "./Navigation.module.css";
import TopNav from "./TopNav";

const NavigationBar = () => {
 const persentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

 const handleSignOut = () => {
   localStorage.clear();
   signOut(auth);
   Swal.fire({
     position: "top-end",
     icon: "success",
     title: "Logout",
     showConfirmButton: false,
     timer: 1500,
   });
   navigate("/");
 };




  return (
    <div>
      <TopNav />
      <Navbar bg="light" expand="lg" variant="light">
        <Container>
          <Navbar.Brand>
            <NavLink to={`/`} className="text-decoration-none">
              <h1 className="section-heading primary-color ">
                Doctors Finder BD
              </h1>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {" "}
            <Nav className="ms-auto">
              <Nav.Link>
                <NavLink
                  to={`/`}
                  className={`text-decoration-none  ${styles.text_hover}`}
                >
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to={`/about`}
                  className={`text-decoration-none  ${styles.text_hover}`}
                >
                  About us
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to={`/contact`}
                  className={`text-decoration-none  ${styles.text_hover}`}
                >
                  Contact
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to={`/doctors`}
                  className={`text-decoration-none  ${styles.text_hover}`}
                >
                  Doctors
                </NavLink>
              </Nav.Link>
              {persentUser ? (
                <>
                  <Nav.Link>
                    <NavLink
                      to={`/dashboard`}
                      className={`text-decoration-none  ${styles.text_hover}`}
                    >
                      Dashboard
                    </NavLink>
                  </Nav.Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                    }}
                    className={`btn1 px-3 text-white rounded ${styles.text_hover}`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Nav.Link className="btn1 px-3 py-2 rounded">
                    <NavLink
                      to={`/login`}
                      className={`text-decoration-none text-white ${styles.text_hover}`}
                    >
                      Login
                    </NavLink>{" "}
                    <NavLink
                      to={`/register`}
                      className={`text-decoration-none text-white ${styles.text_hover}`}
                    >
                      /Register
                    </NavLink>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
