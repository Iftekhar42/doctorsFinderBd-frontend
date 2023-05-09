import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { FcApproval, FcHighPriority } from "react-icons/fc";
import { NavLink, useParams } from "react-router-dom";
import DocFeedBack from "./DocFeedBack";
import styles from "./DoctorDetails.module.css";
const DoctorDetailsPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [prate, setPrate] = useState(0);
  const [doctor, setDoctor] = useState({});
  const params = useParams();

  const makeRate = () => {
    let counter = 0;
    doctor?.appointmentRequest?.map((a) => {
      if (a?.status.toLowerCase() === "done") {
        counter++;
      }
    });

    if (doctor?.appointmentRequest?.length) {
      const rate = (counter / doctor?.appointmentRequest?.length) * 100;
    //   console.log(Math.round(rate));
      setPrate(Math.round(rate));
    }

    setIsLoad(false);
  };

  useEffect(() => {
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/detailsDoctor/${params.pId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);
        setIsLoad(true);
      });
  }, []);

  isLoad && makeRate();
  if (typeof prate === NaN) {
    setPrate(0);
  }
  console.log(doctor);
  return (
    <div className={styles.details_wrapper}>
      <Container>
        {doctor?.name ? (
          <>
            <div className="photo-and-dashboard-section">
              <Row
                className={`${styles.doctorDashboard} p-3  border  m-2 rounded d-flex align-items-center `}
              >
                <Col md={4} className="text-center">
                  <img
                    src={`${doctor?.imgUrl}`}
                    className=" rounded img-fluid"
                    alt=""
                    srcset=""
                  />
                </Col>
                <Col md={8}>
                  <div className="">
                    <h2 className="section-heading text-center py-3 display-4 primary-color fw-bold">
                      {doctor?.name}
                    </h2>
                  </div>
                  <div className="d-flex justify-content-around ">
                    <div>
                      <h2 className="section-heading secondary-color text-center display-4 fw-bold ">
                        0{doctor?.appointmentRequest?.length}{" "}
                      </h2>
                      <h2 className="section-heading primary-color ">
                        Total Appointment{" "}
                      </h2>
                    </div>
                    <div>
                      <h2 className="section-heading secondary-color text-center fw-bold display-4">
                        {prate}%
                      </h2>
                      <h2 className="section-heading primary-color ">
                        Complete{" "}
                      </h2>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="details-section">
              <Row className="p-3 py-4 border  m-2 rounded d-flex align-items-center ">
                <Col md={6}>
                  <label className={styles.inputLabel}>
                    {" "}
                    Registered Doctor in website:{" "}
                    {doctor?.isRegistered === "true" ? (
                      <FcApproval className="fs-2" />
                    ) : (
                      <FcHighPriority />
                    )}
                  </label>
                  <br />
                  <label className={styles.inputLabel}>
                    {" "}
                    Is verified license:
                    {doctor?.isRegistered === "true" ? (
                      <FcApproval className="fs-2" />
                    ) : (
                      <FcHighPriority />
                    )}
                  </label>
                  <br />
                  <label className={styles.inputLabel}>
                    {" "}
                    Email :
                    {doctor?.email === "" ? (
                      <span className="ms-2">Not Available</span>
                    ) : (
                      <span className="ms-2">{doctor?.email}</span>
                    )}
                  </label>
                  <br />
                  <label className={styles.inputLabel}>
                    {" "}
                    Mobile :
                    {doctor?.phn === "" ? (
                      <span className="ms-2">Not Available</span>
                    ) : (
                      <span className="ms-2">{doctor?.phn}</span>
                    )}
                  </label>
                  <br />
                </Col>
                <Col md={6}>
                  <label className={styles.inputLabel}>
                    {" "}
                    Chamber/Clinic : <br />
                    {doctor?.chamber === "" ? (
                      <span className="ms-2 secondary-color">
                        Not Available
                      </span>
                    ) : (
                      <span className="ms-2 secondary-color">
                        {doctor?.chamber}
                      </span>
                    )}
                  </label>
                  <br />
                  <label className={styles.inputLabel}>
                    {" "}
                    Location : <br />
                    {doctor?.location === "" ? (
                      <span className="ms-2 secondary-color">
                        Not Available
                      </span>
                    ) : (
                      <span className="ms-2 secondary-color">
                        {doctor?.location}
                      </span>
                    )}
                  </label>
                  <br />
                </Col>
              </Row>
            </div>
            <div className="skill-and-fee">
              <Row className="p-3 py-4 border  m-2 rounded d-flex align-items-center">
                <Col md={6}>
                  <label className={styles.inputLabel}>
                    {" "}
                    Expertise : <br />
                    {doctor?.skills?.length === 0 ? (
                      <span className="ms-2 secondary-color">
                        Not Available
                      </span>
                    ) : (
                      <>
                        {doctor?.skills?.map((s) => (
                          <span className={styles.singleSkill}>
                            {s?.addedSkill}
                          </span>
                        ))}
                      </>
                    )}
                  </label>
                  <br />
                  <label className={styles.inputLabel}>
                    {" "}
                    Appointment Fee :
                    {doctor?.location === "" ? (
                      <span className="ms-2 secondary-color">
                        Not Available
                      </span>
                    ) : (
                      <span className="ms-2 secondary-color">
                        {doctor?.appointmentFee} Taka BDT
                      </span>
                    )}
                  </label>
                  <br />
                </Col>
                <Col md={6}>
                  <label className={styles.inputLabel}>
                    {" "}
                    Take Your Appointment : <br />
                    {doctor?.location === "" ? (
                      <span className="ms-2 secondary-color">
                        Not Available
                      </span>
                    ) : (
                      <NavLink
                        to={`/bookAppointment/${doctor?._id}`}
                        className={styles.profileNavlink}
                      >
                        <button className={styles.bookBtn}>
                          Book Appointment
                        </button>
                      </NavLink>
                    )}
                  </label>
                  <br />
                </Col>
              </Row>
            </div>
            <div className="feedback">
              <DocFeedBack feedback={doctor?.dFeedbacks}/>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </Container>
    </div>
  );
};

export default DoctorDetailsPage;
