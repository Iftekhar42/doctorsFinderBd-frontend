import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./WriteFeedBack.module.css";

const WriteFeedbackToDoctor = () => {
  const [isLoad, setIsLoad] = useState(true);
  const params = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const presentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [docName, setDocName] = useState("");
  const [docEmail, setDocEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const getSpecificInfo = () => {
    console.log("ok");
    userInfo?.appointment?.map((app) => {
      if (app.appointID === params.appointID) {
        setDocName(app.doctorName);
        setDocEmail(app.doctorEmail);
      }
    });
    if (docEmail !== "") {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    if (isLoad) {
      fetch(
        `https://doctors-finder-bd-backend.vercel.app/allPatients/${presentUser?.user?.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data);
          getSpecificInfo();
        });
    }
  }, [params.appointID, userInfo]);

  const submitFeedback = () => {
    const feedbackData = document.getElementById("feedback").value;

    const data = {
      comment: feedbackData,
      name: userInfo.name,
      imgLink: userInfo.imgUrl,
    };
    console.log(data);
    //   confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //   post to db

        fetch(
          `https://doctors-finder-bd-backend.vercel.app/sendFeedback/doctor/${docEmail}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Submit Feedback Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(result);
            document.getElementById("feedback").value = "";
          });
      }
    });
  };

  console.log(feedback);
  console.log(userInfo);
  return (
    <div>
      <Container>
        <div className="heading">
          <h2 className="text-center primary-color section-heading py-4 pb-2 ">
            Feel Free to Share Your Experience
          </h2>
          <p className="text-center pb-2 secondary-color fw-bold">
            We are very much concern about your feedback.It help our doctor to
            improve him self.
          </p>
        </div>
        <div className="writing part border  p-5 my-3">
          <div className="info ">
            <label className={`secondary-color  ${styles.formLabel}`}>
              To:
            </label>{" "}
            <br />
            <Row>
              <Col md={6}>
                <label className={styles.formLabel}>Doctor Name:</label>
                <input
                  disabled
                  type="text"
                  name="name"
                  defaultValue={docName}
                  className={`w-100 rounded  ${styles.inputField1}`}
                ></input>
              </Col>
              <Col md={6}>
                <label className={styles.formLabel}>Doctor Email:</label>
                <input
                  disabled
                  type="text"
                  name="name"
                  defaultValue={docEmail}
                  className={`w-100 rounded  ${styles.inputField1}`}
                ></input>
              </Col>
            </Row>
          </div>
          <div className=" feedBackDetails">
            <label className={`py-2 ${styles.formLabel}`}>Feedback:</label>
            <textarea className={`${styles.textarea}`} id="feedback"></textarea>
          </div>
          <button
            type="submit"
            className={styles.submitBtn}
            onClick={submitFeedback}
          >
            Send
          </button>
        </div>
      </Container>
    </div>
  );
};

export default WriteFeedbackToDoctor;
