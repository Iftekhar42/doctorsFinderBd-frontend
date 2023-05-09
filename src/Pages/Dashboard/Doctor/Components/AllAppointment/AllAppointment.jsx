import React, { useEffect, useState } from "react";
import { Badge, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import styles from "./Allappointment.module.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div
          className={`${styles.appointmentCard_container} p-3 px-5 rounded my-3 `}
        >
          <Row className="w-100 my-1 ">
            <Col md={4}>
              {" "}
              <h5>
                Name:{" "}
                <span className="fw-bold">{props.r?.patientDetails?.name}</span>{" "}
              </h5>{" "}
            </Col>
            <Col md={4}>
              {" "}
              <h5>
                Age:{" "}
                <span className="fw-bold">{props.r?.patientDetails?.age}</span>{" "}
              </h5>{" "}
            </Col>
            <Col md={4}>
              {" "}
              <h5>
                Request Status:{" "}
                <span className="fw-bold ">{props.r?.status}</span>{" "}
              </h5>{" "}
            </Col>
          </Row>
          <Row className="w-100 my-1">
            <Col lg={4}>
              {" "}
              <h5>
                Email:{" "}
                <span className="fw-bold">
                  {props.r?.patientDetails?.emailId}
                </span>{" "}
              </h5>{" "}
            </Col>
            <Col lg={4}>
              {" "}
              <h5>
                Mobile:{" "}
                <span className="fw-bold">
                  {props.r?.patientDetails?.mobile}
                </span>{" "}
              </h5>{" "}
            </Col>
            <Col lg={4}>
              {" "}
              <h5>
                Gender:{" "}
                <span className="fw-bold">{props.r?.patientDetails?.sex}</span>{" "}
              </h5>{" "}
            </Col>
          </Row>
          <h5 className="pt-3">Problem: {props.r?.problems?.title}</h5>
          <div className="  ">
            <h5>Description:</h5>

            <p className="fs-5">{props.r?.problems?.desc}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const AllAppointment = () => {
  const [r, setR] = useState([]);
  // modal state
  const [modalShow, setModalShow] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const persentUser = JSON.parse(localStorage.getItem("currentUser"));
  // get user data from db
  const loadData = () => {
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/allDoctors/${persentUser?.user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setAllAppointments(data.appointmentRequest));
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = (idx) => {
    console.log(idx);
    const data = { status: "Done", idx: `${idx}` };
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/updateStatus/${persentUser?.user?.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          Swal.fire("Updated!", "Status is updated.", "success");
          // console.log(data);
          loadData();
        }
      });
  };

  console.log(allAppointments);
  /* time formater */
  const timeFormater = (time) => {
    const numTime = parseInt(time?.split(":")[0]);
    if (numTime > 12) {
      return `${numTime - 12}:${time?.split(":")[1]} PM`;
    } else {
      return `${time} AM`;
    }
  };

  const handMyModal = (appointment) => {
    setR(appointment);
    setModalShow(true);
  };

  return (
    <div>
      <div>
        <h3 className=" section-heading text-center mt-3 mb-5">
          All Appointment List
        </h3>
      </div>
      {allAppointments.length ? (
        <>
          <MyVerticallyCenteredModal
            r={r}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div className="w-100 px-3">
            <Table responsive="sm" striped>
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Patient Name</th>
                  <th>Patient Email</th>
                  <th>Patient Mobile</th>
                  <th>Platform</th>
                  <th>Date\Time</th>
                  <th>Status</th>
                  <th>Handle Appointment</th>
                  <th>Appointment Details</th>
                </tr>
              </thead>
              <tbody>
                {allAppointments?.map((appointment, idx) => (
                  <>
                    <tr key={idx}>
                      <td>
                        <div className="d-flex align-items-center ">
                          <h6 className="ms-2">
                            {appointment?.problems?.title}
                          </h6>
                        </div>
                      </td>
                      <td>{appointment?.patientDetails?.name}</td>
                      <td>{appointment?.patientDetails?.emailId}</td>
                      <td>{appointment?.patientDetails?.mobile}</td>

                      <td>{appointment?.platform}</td>
                      <td>
                        {" "}
                        <span className={styles.timeBadge}>
                          Date: {appointment?.time.split("T")[0]}{" "}
                        </span>
                        <span className={styles.timeBadge}>
                          Time: {timeFormater(appointment?.time.split("T")[1])}
                        </span>
                      </td>
                      <td className="">
                        <Badge>{appointment?.status}</Badge>
                      </td>
                      <td>
                        {appointment?.status.toLowerCase() === "accepted" && (
                          <button
                            className="btn btn-secondary"
                            onClick={() => updateStatus(appointment?.appointID)}
                          >
                            Click for Done
                          </button>
                        )}
                      </td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-primary"
                          onClick={() => handMyModal(appointment)}
                          style={{ cursor: "pointer" }}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Click for show more"
                        >
                          Show Details
                        </button>{" "}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default AllAppointment;
