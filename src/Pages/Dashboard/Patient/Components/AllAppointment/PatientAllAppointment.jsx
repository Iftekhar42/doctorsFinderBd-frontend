import React, { useState } from "react";
import { Badge, Spinner, Table } from "react-bootstrap";
import styles from "./PatientAllAppoinmet.module.css";

const PatientAllAppointment = ({ userInfo }) => {
  const [allAppointments, setAllAppoinments] = useState(userInfo?.appointment);
  console.log(allAppointments);

  const timeFormater = (time) => {
    const numTime = parseInt(time?.split(":")[0]);
    if (numTime > 12) {
      return `${numTime - 12}:${time?.split(":")[1]} PM`;
    } else {
      return `${time} AM`;
    }
  };

  return (
    <div>
      <div>
        <h3 className=" section-heading text-center mt-3 mb-5">
          All Appointment List
        </h3>
      </div>
      {allAppointments.length ? (
        <>
          <div className="w-100 px-3">
            <Table responsive="sm" striped>
              <thead>
                <tr className="">
                  <th>Problem</th>
                  <th>Description</th>
                  <th>Doctor name</th>
                  <th>Doctor Email</th>
                  <th>Platform</th>
                  <th>Date\Time</th>
                  <th>Status</th>
                  <th>Meeting Link</th>
                </tr>
              </thead>
              <tbody>
                {allAppointments?.map((appointment, idx) => (
                  <>
                    <tr key={idx} className="">
                      <td>
                        <div className="d-flex align-items-center ">
                          <h6 className="ms-2 fw-bold">
                            {appointment?.problem?.title}
                          </h6>
                        </div>
                      </td>
                      <td>
                        <textarea
                          className={styles.problemDescription}
                          defaultValue={appointment?.problem?.desc}
                          disabled
                          cols={35}
                          c
                        />
                      </td>
                      <td>{appointment?.doctorName}</td>
                      <td>{appointment?.doctorEmail}</td>

                      <td>
                        <Badge className="fs-6"> {appointment?.platform}</Badge>
                      </td>
                      <td>
                        {" "}
                        <span className={styles.timeBadge}>
                          Date: {appointment?.time.split("T")[0]}{" "}
                        </span>
                        <span className={styles.timeBadge}>
                          Time: {timeFormater(appointment?.time.split("T")[1])}
                        </span>
                      </td>
                      <td className="">
                        <Badge className="fs-6">{appointment?.status}</Badge>
                      </td>

                      <td>
                        <input
                          type="text"
                          className={styles.inputField}
                          defaultValue={appointment?.meetingLink}
                          disabled
                        />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PatientAllAppointment;
