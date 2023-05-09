import React from "react";
import { Container } from "react-bootstrap";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className="header">
        <h1 className="text-white section-heading text-center ">
          DOCTORS FINDER BD
        </h1>
      </div>
      <div className="social ">
        <div className="icons py-3 ">
          <ul className="list-unstyled d-flex justify-content-center pe-5 ">
            <li className={`fs-2 ${styles.socialIcon}`}>
              <BsFacebook />
            </li>
            <li className={`fs-2 ${styles.socialIcon}`}>
              <BsInstagram />
            </li>
            <li className={`fs-2 ${styles.socialIcon}`}>
              <BsTwitter />
            </li>
          </ul>
        </div>
      </div>
      <div className="email-box text-center">
        <input type="email" className={styles.emailField} placeholder="Email" />
        <input type="submit" value={`Subscribe`} className={styles.submitBTN} />
      </div>
      <div className="footerNavigation pt-3 pb-5">
        <ul className="list-unstyled d-flex justify-content-center pe-5 text-white">
          <li className={`text-white fw-bold`}>
            <NavLink
              to="/allDoctors"
              className={`text-decoration-none text-white`}
            >
              {" "}
              Doctors <span className="mx-1">|</span>
            </NavLink>
          </li>
          <li className={`text-white fw-bold`}>
            <NavLink
              to="/dashboard"
              className={`text-decoration-none text-white`}
            >
              Patients <span className="mx-1">|</span>
            </NavLink>
          </li>
          <li className={`text-white fw-bold`}>
            <NavLink to="/login" className={`text-decoration-none text-white`}>
              Login <span className="mx-1">|</span>
            </NavLink>
          </li>
          <li className={`text-white fw-bold`}>
            Terms & Conditions <span className="mx-1">|</span>
          </li>
          <li className={`text-white fw-bold`}>Privacy Policy</li>
        </ul>
      </div>
      <div className="copyRight">
        <Container>
          <hr className="text-white" />
          <p className="text-center text-white">© 2020 Doctors Finder BD | All Rights Reserved.</p>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
