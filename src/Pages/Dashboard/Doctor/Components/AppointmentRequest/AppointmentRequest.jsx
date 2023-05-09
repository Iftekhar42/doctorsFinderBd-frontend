import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Appointment.module.css";
import SingleApp from "./SingleApp";
const AppointmentRequest = ({ userInfo1, updatedData }) => {
  /* this component show only appoint which is not accepted yet */
  const [userInfo, setUserInfo] = useState(userInfo1);

  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState([]);

  const loadDataAgin = () => {
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/allDoctors/${userInfo1?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        updatedData();
        setUserInfo(data)
      });
  };

  useEffect(() => {
    if (load) {
      const newRequArr = userInfo.appointmentRequest.filter(
        (r) => r?.status === "Not Accepted"
      );
      setRequest(newRequArr);
    }
  }, [userInfo]);

  console.log(request);
  return (
    <div className={` ${styles.appointment_wrapper}`}>
      <h3 className=" section-heading text-center pt-3 mb-5 text-decoration-underline">
        Appointment Request {`(${request.length})`}
      </h3>
      {userInfo.license ? (
        <div className="container my-5">
          {request?.map((r) => (
            <>
              <SingleApp
                r={r}
                loadDataAgin={loadDataAgin}
                userInfo={userInfo}
                userInfo1={userInfo1}
              />
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

export default AppointmentRequest;
