import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FcCallback } from "react-icons/fc";
import { MdEmail, MdLocationOn } from "react-icons/md";
// import { useForm, ValidationError } from "@formspree/react";
import styles from "./ContactUs.module.css";
const ContactUs = () => {
  // const [state, handleSubmit] = useForm("mzbqglwy");
  return (
    <div className="w-100">
      <div className={styles.contact_us_header}>
        <h1 className="section-heading text-center fw-bold display-4 text-white">
          Contact US
        </h1>
      </div>
      <br />
      <br />

      <div className="contactUS-card py-5">
        <Row className="pt-3 bg-light w-100 ">
          <Col md={4}>
            <Container className="d-flex justify-content-center">
              <Card className={`text-center ${styles.contact_card}`}>
                <Card.Body>
                  <Card.Text>
                    <p
                      className={`bg-white d-inline-block p-3 ${styles.contact_icon}`}
                    >
                      {" "}
                      <FcCallback className="fs-1" />
                    </p>
                    <p className="fs-4 text-white fw-bold">
                      Call <br /> 017845XXXXXXX
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>
          </Col>
          <Col md={4}>
            {" "}
            <Container className="d-flex justify-content-center">
              <Card className={`text-center ${styles.contact_card}`}>
                <Card.Body>
                  <Card.Text>
                    <p
                      className={`bg-white d-inline-block p-3 ${styles.contact_icon}`}
                    >
                      {" "}
                      <MdEmail className="fs-1" />
                    </p>
                    <p className="fs-4 text-white fw-bold">
                      Email <br /> doctorsfinderbd@gmail.com
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>
          </Col>
          <Col md={4}>
            {" "}
            <Container className="d-flex justify-content-center">
              <Card className={`text-center ${styles.contact_card}`}>
                <Card.Body>
                  <Card.Text>
                    <p
                      className={`bg-white d-inline-block p-3 ${styles.contact_icon}`}
                    >
                      {" "}
                      <MdLocationOn className="fs-1" />
                    </p>
                    <p className="fs-4 text-white fw-bold">
                      Location <br /> Uttara,Dhaka,Bangladesh-1230
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </div>

      {/* GET INTO TOUCH SECTION */}

      <div className="touch-section py-5 bg-light">
        <h2 className="py-5 text-center section-heading primary-color ">
          Get in touch
        </h2>

        <div className={styles.touch_form}>
          <Container className={styles.formContainer}>
            <form action="https://formspree.io/f/mzbqglwy" method="POST">
              <Row className="w-100">
                <Col md={6}>
                  {" "}
                  <label className={styles.formLabel}>Your Name:</label>
                  <input
                    type="text"
                    name="name"
                    className={`w-100 rounded  ${styles.inputField1}`}
                  ></input>
                </Col>
                <Col md={6}>
                  {" "}
                  <label className={styles.formLabel}>Your email:</label>
                  <input
                    type="email"
                    name="email"
                    className={`w-100 rounded ${styles.inputField1}`}
                  ></input>
                </Col>
              </Row>
              <br />
              <label className={`${styles.formLabel}`}>Subject:</label>
              <input
                type="text"
                name="subject"
                className={`w-100 rounded ${styles.inputField1}`}
              ></input>
              <br />
              <label className={styles.formLabel}>Your message:</label> <br />
              <textarea name="message" className={styles.textarea}></textarea>
              <br />
              <button type="submit" className={styles.submitBtn}>
                Send
              </button>
            </form>
          </Container>
        </div>
      </div>

      {/* Google MAp location */}
      <div className="location-map w-100 ">
        <div className="">
         
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29186.920132619565!2d90.36077840518313!3d23.876671852634086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5d05e7074dd%3A0xd1c58803049f00c7!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1678211726043!5m2!1sen!2sbd"
            className={styles.mapContainer}
         
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
