import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
const AllPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch(`https://doctors-finder-bd-backend.vercel.app/allPatients`)
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);
  console.log(patients);
  return (
    <div>
      <h3 className=" section-heading text-center mt-3 mb-5">
        List of Patients
      </h3>

      <div className="w-100 px-3">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Patients Name</th>
              <th>Email</th>
              <th>Num of Appointment</th>

              {/* <th>Handle Acc</th> */}
            </tr>
          </thead>
          <tbody>
            {patients?.map((patient) => (
              <>
                <tr>
                  <td>
                    <div className="d-flex align-items-center ">
                      <img
                        src={`${patient?.imgUrl}`}
                        width="50"
                        height={"50"}
                        className="rounded-circle"
                        alt="Img not found"
                        srcset=""
                      />
                      <h6 className="ms-2">{patient?.name}</h6>
                    </div>
                  </td>

                  <td>{patient?.email}</td>
                  <td>{patient.appointment.length}</td>

                  <td>
                    {" "}
                    {/* <Button variant="danger">Delete User</Button> */}
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

export default AllPatients;
