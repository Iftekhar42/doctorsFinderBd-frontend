import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./ApplyApp.module.css";
import DoctorSection from "./DoctorSection";
import PatientSection from "./PatientSection";
const ApplyAppointment = () => {
  const [isRemove, setIsRemove] = useState(false);
  const [isLoad, setIsload] = useState(true);
  const [docId, setDocId] = useState("");
  const [docDetails, setDocDetails] = useState({});
  const [patientDetails, setPatientDetails] = useState({});
  const [role, setRole] = useState("");
  const persentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(persentUser?.user?.displayName);
  const params = useParams();
  const navigate = useNavigate();

  const loadPatientData = () => {
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/${role}/${persentUser?.user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setPatientDetails(data));
  };

  const loadDoctorData = () => {
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/detailsDoctor/${params?.doctorId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDocDetails(data);
        console.log(data);
        loadPatientData();
        setIsload(false);
      });
  };

  /* load  */

  useEffect(() => {
    if (persentUser?.user?.displayName === "doctor") {
      setRole("allDoctors");
    } else if (persentUser?.user?.displayName === "patient") {
      setRole("allPatients");
    } else if (persentUser?.user?.displayName === "admin") {
      setRole("admins");
    }
    setDocId(params.doctorId);
    loadDoctorData();
  }, [params.doctorId, role]);

  /* add point to db */
  const postAppointmentDB = (data) => {
    console.log(docDetails?._id);
    console.log(patientDetails?._id);
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/bookedAppointment/${docDetails?._id}/${patientDetails?._id}`,
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
        if (result.code === 200) {
          setIsRemove(true);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Appointment Request Send Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard")
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Try again",
          });
        }

        console.log(result);
      });
  };

  /* make appointment data */
  const dataMake = (problem) => {
    const data = {
      docInfo: {
        name: docDetails.name,
        email: docDetails.email,
      },
      patientInfo: {
        name: patientDetails.name,
        email: patientDetails.email,
        age: problem.age,
        sex: problem.sex,
        mobile: patientDetails.mobile,
      },
      problem: {
        title: problem.title,
        desc: problem.desc,
      },
      time: problem.time,
      platform: problem.platform,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        postAppointmentDB(data);
      }
    });

    console.log(problem);
  };

  return (
    <div className={styles.takeAppoinmentWrapper}>
      <div className="heading">
        <h2 className="text-center primary-color section-heading py-4">
          Take Appointment
        </h2>
      </div>
      <Container>
        {/* Doctor details section */}
        <div className="">
          {docDetails?.name ? (
            <>
              {" "}
              <DoctorSection docDetails={docDetails} />
            </>
          ) : (
            <>
              <Spinner />
            </>
          )}
        </div>
        {/* Patient Section details section */}
        <div className="p-2">
          {patientDetails?.name ? (
            <div className="p-4 border rounded mb-4">
              <PatientSection
                patientDetails={patientDetails}
                sendProblem={dataMake}
                isRemove={isRemove}
              />
            </div>
          ) : (
            <>
              <Spinner />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ApplyAppointment;
