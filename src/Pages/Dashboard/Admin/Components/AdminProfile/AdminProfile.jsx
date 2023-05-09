import React from "react";
import { Container } from "react-bootstrap";
import styles from "./AdminProfile.module.css";
const AdminProfile = ({ userInfo }) => {
    console.log(userInfo);
  return (
    <div className="p-5 ">
      <Container className={` p-5 border rounded ${styles.info_container}`}>
        <input
          className={`fs-3 w-100 ${styles.profile_info}`}
          value={`Name: ${userInfo?.name}`}
        ></input>
        <input
          className={`fs-3 w-100 mt-2 ${styles.profile_info}`}
          value={`Email: ${userInfo?.email}`}
        ></input>
      </Container>
    </div>
  );
};

export default AdminProfile;
