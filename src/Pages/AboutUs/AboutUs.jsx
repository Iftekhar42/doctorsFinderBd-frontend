import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./About.module.css";
const AboutUs = () => {
  return (
    <div>
      <div className={styles.about_us_header}>
        <h1 className="section-heading text-center fw-bold display-4 text-white">
          About US
        </h1>
      </div>
      <div className="mission-vision">
        <Row className="mission w-100">
          <Col md={6}>
            <Container>
              <h1 className="section-heading text-center primary-color py-5">
                Our Mission
              </h1>
              <div className="content ">
                <ul className="ps-sm-5">
                  <li>
                    <p className="fs-4">
                      To help patients find the right doctors and medical
                      specialists for their specific needs
                    </p>
                  </li>
                  <li>
                    <p className="fs-4">
                      To provide comprehensive and accurate information about
                      each doctor, including qualifications, areas of expertise,
                      and patient reviews
                    </p>
                  </li>
                  <li>
                    <p className="fs-4">
                      To make it easy and convenient for patients to book
                      appointments with top-quality doctors in their area
                    </p>
                  </li>
                  <li>
                    <p className="fs-4">
                      To support and enhance the overall quality of healthcare
                      by connecting patients with the best possible providers
                    </p>
                  </li>
                </ul>
              </div>
            </Container>
          </Col>
          <Col
            md={6}
            className={`${styles.img_container} d-flex justify-content-center py-5`}
          >
            <img
              src="https://i.ibb.co/QHqsQNr/mission.png"
              alt=""
              className="img-fluid "
            />
          </Col>
        </Row>
        <Row className="vision w-100 ">
          <Col
            md={6}
            className={`${styles.img_container} d-flex justify-content-center py-5`}
          >
            <img
              src="https://i.ibb.co/z7kJ3j0/vision.png"
              alt=""
              className="img-fluid "
            />
          </Col>
          <Col md={6}>
            <Container>
              <h1 className="section-heading text-center primary-color py-5">
                Our Vision
              </h1>
              <div className="content ">
                <ul className="ps-sm-5">
                  <li>
                    <p className="fs-4">
                      To become the go-to resource for patients seeking
                      high-quality medical care and information
                    </p>
                  </li>
                  <li>
                    <p className="fs-4">
                      To continuously improve and expand the services offered to
                      better meet the needs of patients and healthcare providers
                    </p>
                  </li>
                  <li>
                    <p className="fs-4">
                      To foster a culture of collaboration and innovation within
                      the healthcare industry
                    </p>
                  </li>
                  <li>
                    <p className="fs-4">
                      To help build a more informed and empowered patient
                      population
                    </p>
                  </li>
                </ul>
              </div>
            </Container>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutUs;
