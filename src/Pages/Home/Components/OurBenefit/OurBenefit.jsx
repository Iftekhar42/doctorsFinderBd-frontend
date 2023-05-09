import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./Benefit.module.css";
import { NavLink } from "react-router-dom";
const OurBenefit = () => {
  return (
    <div className="w-100">
      <Row className="w-100 g-0 ">
        <Col xl={6} className={` ${styles.benefitLeft}`}>
          <h5 className="fw-bold text-uppercase secondary-color">
            Our BeneFit
          </h5>
          <h1 className="display-6 fw-bold primary-color section-heading">
            CHOOSE OUR DOCTORS SERVICE FOR YOUR BEST SOLUTIONS
          </h1>
          <div className={` `}>
            <Row className="g-5 mt-2">
              <Col sm={6}>
                <h4 className={`${styles.benefitH4}`}>Saves time</h4>
                <p>
                  Doctors Finder BD can help you quickly find and book
                  appointments with doctors in your area, saving you time and
                  hassle.
                </p>
              </Col>
              <Col sm={6}>
                <h4 className={`${styles.benefitH4}`}>Convenient</h4>
                <p>
                  Doctor finder websites are available 24/7, so you can search
                  for and book appointments at any time, without having to call
                  or visit multiple clinics.
                </p>
              </Col>
              <Col sm={6}>
                <h4 className={`${styles.benefitH4}`}>Easy to use</h4>
                <p>
                  Doctor finder have simple and user-friendly interfaces, making
                  it easy for you to search for doctors by specialty, location,
                  or other criteria.
                </p>
              </Col>
              <Col sm={6}>
                <h4 className={`${styles.benefitH4}`}>Wide range of options</h4>
                <p>
                  We can help you access a wide range of doctors, from general
                  practitioners to specialists, in your area.
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xl={6}>
          <img
            src="https://i.ibb.co/8rKxDTt/qw1.png"
            alt=""
            srcset=""
            className="img-fluid"
          />
        </Col>
      </Row>
      <Row className="w-100 g-0">
        <Col xl={6}>
          <img
            src="https://i.ibb.co/PCWmV80/aassqq.png"
            className="img-fluid"
            alt=""
            srcset=""
          />
        </Col>
        <Col xl={6} className={`${styles.speak_content} `}>
          <h1 className="display-5">SPEAK TO AN EXPERT NOW</h1>
          <p className="fw-bold py-4">
            Your first consultation is on us. We understand the importance of
            taking the first step. That’s why your first consultation with us is
            FREE.
          </p>
          <div>
            <NavLink to={"/contact"}>
              <button className={`${styles.contactBtn}`}>Contact us</button>
            </NavLink>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OurBenefit;
