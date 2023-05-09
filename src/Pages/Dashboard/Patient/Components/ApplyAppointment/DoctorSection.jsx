import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import styles from "./ApplyApp.module.css";
const DoctorSection = ({ docDetails }) => {
  return (
    <div className="photo-and-dashboard-section">
      
      <Row
        className={`${styles.doctorDashboard} p-3  border  m-2 rounded d-flex align-items-center `}
      >
        <Col sm={12}>
          <div className="">
            <h2 className="section-heading text-center py-3 display-6 primary-color ">
             Selected Doctor's Information
            </h2>
          </div>
        </Col>
        <Col md={4} className="text-center">
          <img
            src={`${docDetails?.imgUrl}`}
            className=" rounded img-fluid"
            alt=""
            srcset=""
          />
        </Col>
        <Col md={8} className="">
          <label className={styles.inputLabel}>
            {" "}
            Name :
            {docDetails?.name === "" ? (
              <span className="ms-2">Not Available</span>
            ) : (
              <span className="ms-2">{docDetails?.name}</span>
            )}
          </label>
          <br />

          <div className=" d-flex justify-content-center">
            <Row className="w-100">
              <Col md={6}>
                {" "}
                <label className={styles.inputLabel}>
                  {" "}
                  Email :
                  {docDetails?.email === "" ? (
                    <span className="ms-2">Not Available</span>
                  ) : (
                    <span className="ms-2">{docDetails?.email}</span>
                  )}
                </label>
                <br />
              </Col>
              <Col md={6}>
                <label className={styles.inputLabel}>
                  {" "}
                  Mobile :
                  {docDetails?.phn === "" ? (
                    <span className="ms-2">Not Available</span>
                  ) : (
                    <span className="ms-2">{docDetails?.phn}</span>
                  )}
                </label>
                <br />
              </Col>
              <Col sm={12}>
                {" "}
                <label className={styles.inputLabel}>
                  {" "}
                  Chamber/Clinic :
                  {docDetails?.chamber === "" ? (
                    <span className="ms-2 secondary-color">Not Available</span>
                  ) : (
                    <span className="ms-2 secondary-color">
                      {docDetails?.chamber}
                    </span>
                  )}
                </label>
                <br />
              </Col>
              <Col sm={12}>
                <label className={styles.inputLabel}>
                  {" "}
                  Expertise : <br />
                  {docDetails?.skills?.length === 0 ? (
                    <span className="ms-2 secondary-color">Not Available</span>
                  ) : (
                    <>
                      {docDetails?.skills?.map((s) => (
                        <span className={styles.singleSkill}>
                          {s?.addedSkill}
                        </span>
                      ))}
                    </>
                  )}
                </label>
              </Col>
              <Col sm={12}>
                <label className={styles.inputLabel}>
                  {" "}
                  Appointment Fee :
                  {docDetails?.location === "" ? (
                    <span className="ms-2 secondary-color">Not Available</span>
                  ) : (
                    <span className="ms-2 secondary-color">
                      {docDetails?.appointmentFee} Taka BDT
                    </span>
                  )}
                </label>
                <br />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorSection;
