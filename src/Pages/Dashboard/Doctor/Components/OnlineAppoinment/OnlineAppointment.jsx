import React, { useEffect, useState } from "react";
import { Badge, Spinner, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import styles from "./OnlineAppointment.module.css";
const OnlineAppointment = ({ userInfo1 }) => {
  const [link, setLink] = useState("");
  const [fDate, setFDate] = useState("");
  const [userInfo, setUserInfo] = useState(userInfo1);
  const [isBlock, setIsBlock] = useState(false);
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState([]);

  /* time formater */
  const timeFormater = (time) => {
    const numTime = parseInt(time?.split(":")[0]);
    if (numTime > 12) {
      return `${numTime - 12}:${time?.split(":")[1]} PM`;
    } else {
      return `${time} AM`;
    }
  };

  /* load data again */
  const loadDataAgin = () => {
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/allDoctors/${userInfo1?.email}`
    )
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  };

  /* update link  */
  const updateMeetingLink = (idx, link) => {
    const data = { meetingLink: link, idx: `${idx}` };
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/updateLink/${userInfo1.email}`,
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
        Swal.fire("Accepted!", "Time is updated.", "success");
        // console.log(data);
        loadDataAgin();
      });
  };

  useEffect(() => {
    console.log(fDate);
    if (load) {
      const newRequArr = userInfo.appointmentRequest.filter(
        (r) => r?.platform === "online" || r?.platform === "Online"
      );
      setRequest(newRequArr);
    }
  }, [userInfo]);

  console.log(request);
  return (
    <div>
      <div>
        <h3 className=" section-heading text-center mt-3 mb-5">
          All Appointment List
        </h3>
      </div>
      {request.length ? (
        <>
          <div className="w-100 px-3">
            <Table responsive="sm" striped>
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Patient Name</th>
                  <th>Patient Email</th>
                  <th>Date\Time</th>
                  <th>Status</th>
                  <th>Submit a Meet/Zoom Link</th>
                </tr>
              </thead>
              <tbody>
                {request?.map((appointment, idx) => (
                  <>
                    <tr
                      key={idx}
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Click for show more"
                    >
                      <td>
                        <div className="d-flex align-items-center ">
                          <h6 className="ms-2">
                            {appointment?.problems?.title}
                          </h6>
                        </div>
                      </td>
                      <td>{appointment?.patientDetails?.name}</td>
                      <td>{appointment?.patientDetails?.emailId}</td>

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
                        <Badge>{appointment?.status}</Badge>
                      </td>
                      <td className="">
                        <input
                          className={styles.inputField1}
                          type="text"
                          defaultValue={appointment?.meetingLink}
                          onChange={(e) => setLink(e.target.value)}
                        />
                        {appointment?.meetingLink?.length > 0 ? (
                          <button
                            className={styles.submitBtn}
                            onClick={() =>
                              updateMeetingLink(appointment.appointID, link)
                            }
                          >
                            Edit/Send Link
                          </button>
                        ) : (
                          <button
                            className={styles.submitBtn2}
                            onClick={() =>
                              updateMeetingLink(appointment.appointID, link)
                            }
                          >
                            Send Link
                          </button>
                        )}
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

export default OnlineAppointment;
