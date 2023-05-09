import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import styles from "./ApplyApp.module.css";

const PatientSection = ({ patientDetails, sendProblem, isRemove }) => {
  const [gender, setGender] = useState("Male");
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState("");
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (platform.length === 0 || data.title === "" || data.desc === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select platform or enter title and description!",
      });
    } else {
      data.platform = platform;
      data.sex = gender;
      console.log(data);
      sendProblem(data);

      setPlatform("");
    }
  };
  if (isRemove) {
    reset();
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="py-2">
        <div className="">
          <h2 className="section-heading text-center py-3 pt-0 display-6 primary-color ">
            Your Information
          </h2>
          <p
            className="secondary-color fw-bold text-center"
            style={{ fontFamily: "Poppins" }}
          >
            Share your problem in details. We never share your information other
          </p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className={styles.inputLabel}>Full Name:</label>
            <input
              type="text"
              disabled
              defaultValue={`${patientDetails?.name}`}
              className={`w-100 rounded  ${styles.inputField}`}
            />{" "}
          </div>
          <div className="col-md-6">
            <label className={styles.inputLabel}>Email :</label>
            <input
              type="text"
              defaultValue={`${patientDetails?.email}`}
              disabled
              className={`w-100 rounded  ${styles.inputField}`}
            />{" "}
            <br />
          </div>
          <div className="col-md-6">
            <label className={styles.inputLabel}>Age:</label>
            <input
              type="number"
              {...register(`age`)}
              className={`w-100 rounded  ${styles.inputField1}`}
            />{" "}
          </div>
          <div className="col-md-6">
            <label className={`mb-2 ${styles.inputLabel}`}>
              Select Gender:
            </label>{" "}
            <br />
            <Dropdown className=" mt-2 d-md-inline">
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                className={styles.dropBtn}
              >
                {gender.length === 0 ? "Select Gender" : gender}
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles.dropDownMenu}>
                <Dropdown.Item
                  className={styles.dropItem}
                  onClick={() => setGender("Male")}
                >
                  Male
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.dropItem}
                  onClick={() => setGender("Female")}
                >
                  Female
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <label className={styles.inputLabel}>Problem Title:</label>
        <input
          type="text"
          {...register(`title`)}
          className={`w-100 rounded  ${styles.inputField1}`}
        />{" "}
        <label className={styles.inputLabel}>Description:</label>
        <textarea
          type="text"
          {...register(`desc`)}
          className={`w-100 rounded  ${styles.inputFieldTextarea}`}
        />{" "}
        <div className=" py-2">
          <label className={styles.inputLabel}>Choose Time :</label>
          <div className="d-md-inline  me-3">
            <input
              type={"datetime-local"}
              {...register("time", { required: true })}
              className={styles.inputField1}
            />
          </div>
          <Dropdown className=" mt-2 d-md-inline">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              className={styles.dropBtn}
            >
              {platform.length === 0 ? "Select Platform" : platform}
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropDownMenu}>
              <Dropdown.Item
                className={styles.dropItem}
                onClick={() => setPlatform("Online")}
              >
                Online
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.dropItem}
                onClick={() => setPlatform("Physical")}
              >
                Physical
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <input
          type="submit"
          value={`Request for Appointment`}
          className={styles.submitBtn}
        />
      </form>
    </>
  );
};

export default PatientSection;
