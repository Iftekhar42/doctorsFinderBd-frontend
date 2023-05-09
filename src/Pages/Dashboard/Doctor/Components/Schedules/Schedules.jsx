import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import styles from "./Schedules.module.css";
const Schedules = ({ userInfo1, updateFunc }) => {
  const [fDate, setFDate] = useState("");
  const [userInfo, setUserInfo] = useState(userInfo1);
  const [isBlock, setIsBlock] = useState(false);
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState([]);

  const dateMaker = () => {
    const today = new Date();
    const fDate1 = `${today.getFullYear()}-${
      today.getMonth() + 1 !== 11 && today.getMonth() + 1 !== 12 ? "0" : ""
    }${today.getMonth() + 1}-${today.getDate()}`;
    setFDate(fDate1);
  };

  useEffect(() => {
    const today = new Date();
    const fDate1 = `${today.getFullYear()}-${
      today.getMonth() + 1 !== 11 && today.getMonth() + 1 !== 12 ? "0" : ""
    }${today.getMonth() + 1}-${
      today.getDate() < 10 ? 0 : ""
    }${today.getDate()}`;
    setFDate(fDate1);
    console.log(fDate1);
    // if (load) {
    const newRequArr = userInfo?.appointmentRequest.filter(
      (r) => r?.time?.split("T")[0] === fDate
    );
    setRequest(newRequArr);
    setLoad(false);
    // }
  }, [fDate]);
  /* time formater */
  const timeFormater = (time) => {
    const numTime = parseInt(time?.split(":")[0]);
    if (numTime > 12) {
      return `${numTime - 12}:${time?.split(":")[1]} PM`;
    } else {
      return `${time} AM`;
    }
  };
  console.log(request);
  return (
    <div>
      <h3 className=" section-heading text-center pt-3 mb-5 ">
        Todays Schedule List {`(${request?.length})`} <br />
        <span className="text-decoration-none">Date: {fDate}</span>
      </h3>
      {userInfo?.license ? (
        <div className="container my-5">
          {request?.map((r) => (
            <>
              <div
                className={`${styles.appointmentCard_container} p-3 px-5 rounded my-3 `}
              >
                <div className="d-flex flex-wrap justify-content-center">
                  <p className="mx-2 fs-6">
                    <span className={styles.timeBadge}>
                      Platform: {r?.platform}{" "}
                    </span>
                  </p>
                  <p className="mx-2 fs-6">
                    <span className={styles.timeBadge}>
                      Time: {timeFormater(r?.time.split("T")[1])}
                    </span>
                  </p>
                </div>
                <Row className="w-100 my-1 ">
                  <Col md={4}>
                    {" "}
                    <h5>
                      Name:{" "}
                      <span className="fw-bold">{r?.patientDetails?.name}</span>{" "}
                    </h5>{" "}
                  </Col>
                  <Col md={4}>
                    {" "}
                    <h5>
                      Age:{" "}
                      <span className="fw-bold">{r?.patientDetails?.age}</span>{" "}
                    </h5>{" "}
                  </Col>
                  <Col md={4}>
                    {" "}
                    <h5>
                      Request Status:{" "}
                      <span className={styles.timeBadge}>{r?.status}</span>{" "}
                    </h5>{" "}
                  </Col>
                </Row>
                <Row className="w-100 my-1">
                  <Col lg={4}>
                    {" "}
                    <h5>
                      Email:{" "}
                      <span className="fw-bold">
                        {r?.patientDetails?.emailId}
                      </span>{" "}
                    </h5>{" "}
                  </Col>
                  <Col lg={4}>
                    {" "}
                    <h5>
                      Mobile:{" "}
                      <span className="fw-bold">
                        {r?.patientDetails?.mobile}
                      </span>{" "}
                    </h5>{" "}
                  </Col>
                  <Col lg={4}>
                    {" "}
                    <h5>
                      Gender:{" "}
                      <span className="fw-bold">{r?.patientDetails?.sex}</span>{" "}
                    </h5>{" "}
                  </Col>
                </Row>
                <h5 className="pt-3">Problem: {r?.problems?.title}</h5>
                <div className="  ">
                  <h5>Description:</h5>
                  {/* <p></p> */}
                  <p className="fs-5">{r?.problems?.desc}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Schedules;
