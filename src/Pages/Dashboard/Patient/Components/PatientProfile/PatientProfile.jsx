import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import styles from "./PatientProfile.module.css";

const PatientProfile = ({ userInfo, updateInfo }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [prate, setPrate] = useState(0);
  const [name, setName] = useState(userInfo?.name);
  const [mobile, setMobile] = useState(userInfo?.mobile);
  const [email, setEmail] = useState(userInfo?.email);
  const makeRate = () => {
    let counter = 0;
    userInfo?.appointment?.map((a) => {
      if (a?.status.toLowerCase() === "done") {
        counter++;
      }
    });
  };

  const updateProfileData = (data) => {
    // https://doctors-finder-bd-backend.vercel.app
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/updatePatient/${userInfo.email}`,
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
        Swal.fire("Updated!", "Your profile is updated.", "success");
        // updateFunc();
        // console.log(data);
      });
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Submit to database
        updateProfileData(data);
      }
    });

    console.log(data);
  };

  return (
    <>
      {userInfo?.name ? (
        <div className="photo-and-dashboard-section py-5">
          <Row
            className={`${styles.doctorDashboard} p-3   border  m-2 rounded d-flex align-items-center `}
          >
            <Col md={6} className="text-center">
              <img
                src={`${userInfo?.imgUrl}`}
                className=" rounded img-fluid"
                alt=""
                srcset=""
              />
              <div className="d-flex justify-content-around py-4">
                <div>
                  <h2 className="section-heading secondary-color text-center display-4 fw-bold ">
                    0{userInfo?.appointmentRequest?.length}{" "}
                  </h2>
                  <h2 className="section-heading primary-color ">
                    Total Appointment{" "}
                  </h2>
                </div>
                <div>
                  <h2 className="section-heading secondary-color text-center fw-bold display-4">
                    {prate}%
                  </h2>
                  <h2 className="section-heading primary-color ">Complete </h2>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="">
                <h2 className="section-heading text-center py-3 display-4 primary-color fw-bold">
                  {userInfo?.name}
                </h2>
              </div>

              <Container>
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <label className={styles.inputLabel}>Full Name:</label>
                  <input
                    type="text"
                    defaultValue={`${userInfo?.name}`}
                    onChange={(e) => setName(e.target.value)}
                    {...register(`name`)}
                    className={`w-100 rounded  ${styles.inputField1}`}
                  />{" "}
                  <label className={styles.inputLabel}>Email :</label>
                  <input
                    type="text"
                    defaultValue={`${userInfo?.email}`}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    {...register(`email`)}
                    className={`w-100 rounded  ${styles.inputField1}`}
                  />{" "}
                  <label className={styles.inputLabel}>Mobile:</label>
                  <input
                    type="text"
                    defaultValue={`${userInfo?.mobile}`}
                    onChange={(e) => setMobile(e.target.value)}
                    {...register(`mobile`)}
                    className={`w-100 rounded  ${styles.inputField1}`}
                  />{" "}
                  <input
                    type="submit"
                    value={`Update & Save`}
                    className={styles.submitBtn}
                  />
                </form>
              </Container>
            </Col>
          </Row>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PatientProfile;
