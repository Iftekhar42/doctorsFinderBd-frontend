import React, { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
const EditTopDoctors = () => {
  const [check, setCheck] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [topDoctors, setTopDoctors] = useState([]);
  const [otherDoctor, setOtherDoctor] = useState([]);

  const filterDoctors = (id) => {
    topDoctors.map((d) => {
      if (d?.pid === id) {
        return "True";
      }
    });
  };

  const getTopDoctors = () => {
    fetch(`https://doctors-finder-bd-backend.vercel.app/topDoctors`)
      .then((res) => res.json())
      .then((data) => {
        setTopDoctors(data);
      });
  };

  useEffect(() => {
    fetch(`https://doctors-finder-bd-backend.vercel.app/allDoctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
    // call top doctors data
    getTopDoctors();
    // isLoad(true);
  }, [topDoctors]);

  const addtoTopList = (fullData) => {
    const topDoctorData = {
      name: fullData.name,
      imgUrl: `${fullData.imgUrl}`,
      skill: fullData.skills,
      pId: `${fullData._id}`,
    };

    // // check
    let check = false;
    topDoctors.map((d) => {
      if (d.pId === fullData._id) {
        check = true;
      }
    });

    if (check === true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Already in the top list!",
      });
    } else {
      // https://doctors-finder-bd-backend.vercel.app
      fetch(`https://doctors-finder-bd-backend.vercel.app/addTopDoctor`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(topDoctorData),
      })
        .then((res) => res.json())
        .then((result) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Add to list Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          getTopDoctors();
          console.log(result);
        });
    }
  };

  // remove from top list
  const removeDoctor = (id) => {
    // console.log(id);

    // make confirmation

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://doctors-finder-bd-backend.vercel.app/deleteDoctortop/${id}`,
          {
            method: "DELETE",
          }
        ).then((res) => {
          console.log(res);
          if (res.ok) {
            Swal.fire("Removed!", "Doctor has been Removed.", "success");
            getTopDoctors();
          }
        });
      }
    });
  };

  return (
    <div>
      <h3 className=" section-heading text-center mt-3 mb-5">
        Top Doctors List
      </h3>

      <div className="w-100 px-3">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Speciality</th>

              <th>Remove From Top </th>
            </tr>
          </thead>
          <tbody>
            {topDoctors?.map((doctor) => (
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
                    {doctor?.skill?.map((s) => (
                      <Badge bg="primary" className="mx-1">
                        {s.addedSkill}
                      </Badge>
                    ))}
                  </td>

                  <td>
                    {" "}
                    <Button
                      variant="danger"
                      onClick={() => removeDoctor(doctor._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Add to top doctors list  */}
      <h3 className=" section-heading text-center mt-3 mb-5 pt-5">
        Add to top list
      </h3>

      <div className="w-100 px-3 ">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Others Doctor Name</th>
              <th>Speciality</th>
              <th>Add Top list </th>
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
                        {s.addedSkill}
                      </Badge>
                    ))}
                  </td>

                  <td>
                    {" "}
                    <Button
                      // className={` ${!check ? "" : "disabled"}`}
                      variant="success"
                      onClick={() => addtoTopList(doctor)}
                    >
                      Add
                    </Button>
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

export default EditTopDoctors;
