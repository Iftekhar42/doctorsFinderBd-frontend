import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import styles from "./Appointment.module.css";

const SingleApp = ({ userInfo, r, loadDataAgin, userInfo1 }) => {
  const [isBlock, setIsBlock] = useState(false);
  const updateTimeOfAppointment = (data) => {
    // https://doctors-finder-bd-backend.vercel.app
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/updateTime/${userInfo.email}`,
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
        Swal.fire("Updated!", "Time is updated.", "success");
        // console.log(data);
        loadDataAgin();
        setIsBlock(false);
      });
  };

  /* accept request */
  const acceptRequest = (idx) => {
    const data = { status: "Accepted", idx: `${idx}` };
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/updateStatus/${userInfo1.email}`,
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
        Swal.fire("Accepted!", "Time is updated.", "success");
        // console.log(data);
        loadDataAgin();
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    updateTimeOfAppointment(data);
    console.log(data);
  };
  /* time formater */
  const timeFormater = (time) => {
    // const time = "18:16";

    const numTime = parseInt(time?.split(":")[0]);
    if (numTime > 12) {
      return `${numTime - 12}:${time?.split(":")[1]} PM`;
    } else {
      return `${time} AM`;
    }
  };
  return (
    <div
      className={`${styles.appointmentCard_container} p-3 px-5 rounded my-3 `}
    >
      <Row className="w-100 my-1 ">
        <Col md={4}>
          {" "}
          <h5>
            Name: <span className="fw-bold">{r?.patientDetails?.name}</span>{" "}
          </h5>{" "}
        </Col>
        <Col md={4}>
          {" "}
          <h5>
            Age: <span className="fw-bold">{r?.patientDetails?.age}</span>{" "}
          </h5>{" "}
        </Col>
        <Col md={4}>
          {" "}
          <h5>
            Request Status:{" "}
            <span className="fw-bold text-danger">{r?.status}</span>{" "}
          </h5>{" "}
        </Col>
      </Row>
      <Row className="w-100 my-1">
        <Col lg={4}>
          {" "}
          <h5>
            Email: <span className="fw-bold">{r?.patientDetails?.emailId}</span>{" "}
          </h5>{" "}
        </Col>
        <Col lg={4}>
          {" "}
          <h5>
            Mobile: <span className="fw-bold">{r?.patientDetails?.mobile}</span>{" "}
          </h5>{" "}
        </Col>
        <Col lg={4}>
          {" "}
          <h5>
            Gender: <span className="fw-bold">{r?.patientDetails?.sex}</span>{" "}
          </h5>{" "}
        </Col>
      </Row>
      <h5 className="pt-3">Problem: {r?.problems?.title}</h5>
      <div className="  ">
        <h5>Description:</h5>
        {/* <p></p> */}
        <p className="fs-5">{r?.problems?.desc}</p>
      </div>
      <div
        className={`time-section d-flex flex-wrap  ${
          isBlock ? "d-none" : "d-block"
        }`}
      >
        <p className="mx-2 fs-6">
          <span className={styles.timeBadge}>Platform: {r?.platform}</span>
        </p>
        <p className="mx-2 fs-6">
          <span className={styles.timeBadge}>
            Date: {r?.time.split("T")[0]}{" "}
          </span>
        </p>
        <p className="mx-2 fs-6">
          <span className={styles.timeBadge}>
            Time: {timeFormater(r?.time.split("T")[1])}
          </span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${isBlock ? "d-block" : "d-none"}`}
      >
        <input
          type={"datetime-local"}
          {...register("time", { required: true })}
          className={styles.inputField1}
        />
        <input
          value={`${r?.appointID}`}
          {...register("idx")}
          className="d-none"
        />
        <input type="submit" value="Save" className={styles.submitBtn} />
      </form>
      <div className="text-end ">
        <button
          className={`btn btn-primary m-1 ${isBlock && "disabled"}`}
          onClick={() => acceptRequest(`${r.appointID}`)}
        >
          {" "}
          Accept{" "}
        </button>
        <button
          className={`btn btn-primary m-1 ${isBlock && "disabled"}`}
          onClick={() => setIsBlock(true)}
        >
          {" "}
          Edit Time{" "}
        </button>
        <button className={`btn btn-primary m-1 ${isBlock && "disabled"}`}>
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleApp;
