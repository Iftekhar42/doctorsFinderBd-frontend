import React, { useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Swal from "sweetalert2";
const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const loadDoctorsData = () => {
    fetch(`https://doctors-finder-bd-backend.vercel.app/allDoctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  };

  const updateDocVerification = (email) => {
    const data = { email: email, status: "true" };
    fetch(
      // https://doctors-finder-bd-backend.vercel.app
      ` https://doctors-finder-bd-backend.vercel.app/updateDocVerification`,
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
        loadDoctorsData();
      });
  };

  useEffect(() => {
    loadDoctorsData();
  }, []);

  console.log(doctors);
  return (
    <div>
      <h3 className=" section-heading text-center mt-3 mb-5">
        List of Doctors
      </h3>

      <div className="w-100 px-3">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Speciality</th>
              <th>Email</th>
              <th>License Verify</th>
              <th>Handle Verification </th>
              <th>Is Register </th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor) => (
              <>
                <tr>
                  <td>
                    <div className="d-flex align-items-center ">
                      <img
                        src={`${doctor?.imgUrl}`}
                        width="50"
                        height={"50"}
                        className="rounded-circle"
                        alt="Img not found"
                        srcset=""
                      />
                      <h6 className="ms-2">{doctor?.name}</h6>
                    </div>
                  </td>
                  <td>
                    {doctor?.skills?.map((s) => (
                      <Badge bg="primary" className="mx-1">
                        {s?.addedSkill}
                      </Badge>
                    ))}
                  </td>
                  <td>{doctor?.email}</td>
                  <td
                    className={
                      doctor?.isVerified === "false"
                        ? "bg-danger text-center fw-bold text-white"
                        : "bg-success text-center fw-bold text-white"
                    }
                  >
                    {doctor?.isVerified}
                  </td>
                  <td>
                    <OverlayTrigger
                      key={"top"}
                      placement={"top"}
                      overlay={
                        <Tooltip id={`tooltip-${"top"}`}>
                          <strong>
                            {"Click Here for verification complete"}
                          </strong>
                          .
                        </Tooltip>
                      }
                    >
                      <Button
                        onClick={() => updateDocVerification(doctor?.email)}
                        variant="success"
                        disabled={doctor?.isVerified === "true" ? true : false}
                      >
                        Done
                      </Button>
                    </OverlayTrigger>
                  </td>
                  <td
                    className={
                      doctor?.isRegistered === "false"
                        ? "bg-danger text-center fw-bold text-white"
                        : "bg-success text-center fw-bold text-white"
                    }
                  >
                    {doctor?.isRegistered}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllDoctors;
