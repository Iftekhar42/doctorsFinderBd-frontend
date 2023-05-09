import React, { useEffect, useState } from "react";
import { Badge, Spinner, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./WriteFeedBack.module.css";

const WriteFeedBack = ({ userInfo, loadData }) => {
  const [data, setData] = useState([]);

  const makeFilterData = () => {
    // load patient data;
    const filterData = userInfo?.appointment?.filter(
      (app) => app.status == "Done"
    );

    setData(filterData);
  };

  const postFeedbackDoctor = () => {};

  const feedbacktoWebsite = () => {};

  useEffect(() => {
    makeFilterData();
  }, []);

  console.log(data);
  return (
    <div>
      <div className="heading">
        <h2 className="text-center primary-color section-heading py-4 pb-2 ">
          Write About Your Doctor
        </h2>
        <p className="text-center pb-2 secondary-color fw-bold">
          Your are only able to write about appointment which you have done
        </p>
      </div>
      <div className="for-doctor">
        {data.length ? (
          <>
            <div className="w-100 px-3">
              <Table responsive="sm" striped>
                <thead>
                  <tr className="">
                    <th>Problem</th>
                    <th>Doctor name</th>
                    <th>Doctor Email</th>
                    <th>Platform</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Write</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((appointment, idx) => (
                    <>
                      <tr key={idx} className="">
                        <td>
                          <div className="d-flex align-items-center ">
                            <h6 className="ms-2 fw-bold">
                              {appointment?.problem?.title}
                            </h6>
                          </div>
                        </td>

                        <td>{appointment?.doctorName}</td>
                        <td>{appointment?.doctorEmail}</td>

                        <td>
                          <Badge className="fs-6">
                            {" "}
                            {appointment?.platform}
                          </Badge>
                        </td>
                        <td>
                          {" "}
                          <span className={styles.timeBadge}>
                            {appointment?.time.split("T")[0]}{" "}
                          </span>
                        </td>
                        <td className="">
                          <Badge className="fs-6">{appointment?.status}</Badge>
                        </td>

                        <td>
                          <NavLink
                            to={`/sendFeedBack/doctor/${appointment?.appointID}`}
                          >
                            <button className={styles.feedBackBtn}>
                              Feedback
                            </button>
                          </NavLink>
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
    </div>
  );
};

export default WriteFeedBack;
