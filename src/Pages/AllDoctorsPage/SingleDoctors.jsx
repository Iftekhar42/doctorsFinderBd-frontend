import React from "react";
import { Badge, Spinner } from "react-bootstrap";
import { FcApproval, FcHighPriority } from "react-icons/fc";
import { MdLocationPin } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styles from "./AllDoctor.module.css";
const SingleDoctors = ({ doctor }) => {
  return (
    <div className="col">
      <div className="card">
        <img
          src={`${doctor?.imgUrl}`}
          className="card-img-top"
          alt="not-found"
        />
        <div className="card-body">
          <h5 className="card-title primary-color fw-bold text-center ">
            {doctor?.name}
            {doctor?.isVerified === "true" ? (
              <FcApproval className="fs-3" />
            ) : (
              <FcHighPriority />
            )}
          </h5>
          <p className="card-text py-3 pb-1">
            <span className="fw-bold text-secondary">Expert on:</span>
            {doctor?.skills?.map((s) => (
              <Badge className="m-1">{s?.addedSkill} </Badge>
            ))}
          </p>
          <p className="card-text">
            <span className="fw-bold secondary-color fs-5">
              <MdLocationPin />
            </span>
            <span className="fw-bold">{doctor?.location}</span>
          </p>
        </div>
        <div className="card-footer">
          {doctor?.isRegistered === "true" ? (
            <>
              <div className="buttons d-flex">
                <NavLink
                  to={`/doctorsFullProfile/${doctor?._id}`}
                  className={styles.profileNavlink}
                >
                  <button className={styles.profileBtn}>View Profile</button>
                </NavLink>
                <NavLink
                  to={`/bookAppointment/${doctor?._id}`}
                  className={styles.profileNavlink}
                >
                  <button className={styles.bookBtn}>Book Appointment</button>
                </NavLink>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="bg-warning fw-bold rounded text-center ">
                <p className="py-1">Not Register in website</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleDoctors;
