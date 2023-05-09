import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`https://doctors-finder-bd-backend.vercel.app/allFeedback`)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);
  console.log(feedbacks);
  return (
    <div>
      <h3 className=" section-heading text-center mt-3 mb-5">
        Website Feedbacks and Review
      </h3>

      <div className="w-100 px-3">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Comment</th>
              {/* <th>Delete Feedback</th> */}
            </tr>
          </thead>
          <tbody>
            {feedbacks?.map((feedback) => (
              <>
                <tr>
                  <td>
                    <div className="d-flex align-items-center ">
                      <img
                        src={`${feedback?.photoUrl}`}
                        width="50"
                        height={"50"}
                        className="rounded-circle"
                        alt="Img not found"
                        srcset=""
                      />
                      <h6 className="ms-2">{feedback?.name}</h6>
                    </div>
                  </td>

                  <td>{feedback?.email}</td>
                  <td>
                    <textarea
                      rows={5}
                      cols={80}
                      className="p-2 border rounded "
                      value={feedback.comment}
                    ></textarea>
                  </td>

                  {/* <td>
                    {" "}
                    <Button variant="danger">Delete Feedback</Button>
                  </td> */}
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllFeedbacks;
