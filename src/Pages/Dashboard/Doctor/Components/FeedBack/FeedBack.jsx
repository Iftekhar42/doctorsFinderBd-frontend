import React, { useState } from "react";
import { Spinner, Table } from "react-bootstrap";

const FeedBack = ({ allFeedBacks }) => {
  const [feedbacks, setFeedbacks] = useState(allFeedBacks);
  console.log(allFeedBacks);
  return (
    <div>
      <div>
        <h3 className=" section-heading text-center mt-3 mb-5">
          Patient Feedback About You
        </h3>
      </div>
      {feedbacks.length ? (
        <>
          <div className="w-100 px-3">
            <Table responsive="sm" striped>
              <thead>
              {/*   <tr>
                  <th>Patient </th>
                  <th>Comment </th>
                </tr> */}
              </thead>
              <tbody>
                {feedbacks?.map((feedback, idx) => (
                  <>
                    <tr>
                      <td className="d-flex container p-5">
                        <div className="text-center w-50">
                          <img
                            src={`${feedback?.imgLink}`}
                            alt=""
                            className="rounded"
                            width={`100`}
                            srcset=""
                          />
                          <h5>{feedback?.name}</h5>
                        </div>
                        <div> <p className="fs-5"> {feedback?.comment} </p> </div>
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

export default FeedBack;
