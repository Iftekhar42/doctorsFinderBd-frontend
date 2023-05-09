import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row, Spinner } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import styles from "./DocProfile.module.css";
import districts from "../../../../AllDoctorsPage/allDistrict";
const DocProfile = ({ userInfo, updateFunc }) => {
  const [selectDis, setSelectDis] = useState(userInfo?.location);
  const [wating, setWating] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [lodedSkill, setLoadedSkill] = useState([userInfo?.skills]);
  const [newSkill, setNewSkill] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [chamber, setChamber] = useState("");
  const [phn, setPhn] = useState("");
  const [appointmentFee, setAppointmentFee] = useState("");
  const [location, setLocation] = useState("");

  /* loded skill delete function */
  const deletePastSkill = (idx) => {
    setIsLoad(false);
    console.log(idx);
    console.log(lodedSkill);
    const afterRemoveNewArray = lodedSkill.filter((s) => s.addedSkill !== idx);
    document.getElementById(idx).style = { display: "none" };
    setLoadedSkill(afterRemoveNewArray);
    console.log(lodedSkill);
  };
  /* update profile to db */
  const updateProfile = (data) => {
    

    // set location data
    if (selectDis === "All" || selectDis === "Select Location") {
      data.location ="";
    } else {
      data.location = selectDis;
    }

    fetch(
      `https://doctors-finder-bd-backend.vercel.app/updateDoctors/${userInfo.email}`,
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
        Swal.fire("Updated!", "Your profile is updated.", "success");
        updateFunc();
        // console.log(data);
      });
  };

  const {
    register,
    control,
    handleSubmit,
    unregister,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    /* defaultValues: {
      skills: [lodedSkill]
    }, */
    // mode: "onChange",
  });
  // console.log(lodedSkill);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  useEffect(() => {
    // not append more than one time
    if (isLoad === true) {
      setLoadedSkill(userInfo?.skills);
      lodedSkill.map((skill) => {
        append(skill);
      });
      setIsLoad(false);
    }
  }, []);
  console.log(fields);
  const onSubmit = (data) => {
    // alert confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Submit to database
        updateProfile(data);
      }
    });

    console.log(data);
  };




  const selectDistrict = (dis) => {
    setSelectDis(dis);
    // filterDoctors(dis);
    // console.log(dis);
  };





  return (
    <div className="w-100 p-5">
      {wating && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      <>
        <h3 className="section-heading text-center mt-3 mb-5">Basic Profile</h3>
        {userInfo?.license && (
          <Container>
            <Row className={`w-100 ${styles.photoSection}`}>
              <Col className="text-center">
                <img
                  src={`${userInfo?.imgUrl}`}
                  alt="Not found"
                  className="rounded border shadow"
                  width={200}
                  srcset=""
                />
              </Col>
            </Row>

            <div className={` ${styles.profileDetails}`}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row className={`w-100`}>
                  <Col md={6}>
                    <label className={styles.inputLabel}>License:</label>
                    <input
                      type="text"
                      defaultValue={`${userInfo?.license}`}
                      disabled
                      // {...unregister("test", { keepDefaultValue: true })}
                      className={`w-100 rounded  ${styles.inputField1}`}
                    />{" "}
                    <br />
                    <label className={styles.inputLabel}>Full Name:</label>
                    <input
                      type="text"
                      defaultValue={`${userInfo?.name}`}
                      onChange={(e) => setName(e.target.value)}
                      {...register(`name`)}
                      className={`w-100 rounded  ${styles.inputField1}`}
                    />{" "}
                    <br />
                    <label className={styles.inputLabel}>
                      {" "}
                      Date of Birth :{" "}
                    </label>
                    <input
                      {...register(`dob`)}
                      defaultValue={`${userInfo?.dob}`}
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      className={`w-100 rounded  ${styles.inputField1}`}
                    />{" "}
                    <label className={styles.inputLabel}> Email ID </label>
                    <input
                      type="email"
                      defaultValue={`${userInfo.email}`}
                      disabled
                      className={`w-100 rounded  ${styles.inputField1}`}
                    />{" "}
                    <label className={styles.inputLabel}>Mobile</label>
                    <input
                      type="text"
                      defaultValue={`${userInfo.phn}`}
                      onChange={(e) => setPhn(e.target.value)}
                      {...register(`phn`)}
                      className={`w-100 rounded  ${styles.inputField1}`}
                    />{" "}
                    <label className={styles.inputLabel}>Appointment Fee</label>
                    <input
                      type="text"
                      defaultValue={`${userInfo?.appointmentFee}`}
                      onChange={(e) => setAppointmentFee(e.target.value)}
                      {...register(`appointmentFee`)}
                      className={`w-100 rounded  ${styles.inputField1}`}
                    />{" "}
                  </Col>
                  <Col md={6}>
                    <div className="pb-3">
                      <h3 className=" section-heading text-center  mb-1">
                        Service & Specialization
                      </h3>
                      <div className="p-3 border ">
                        {/* loaded skills */}
                        <Row className={`${styles.skills_style} m-2`}></Row>
                        <div className="list-unstyled d-flex flex-wrap ">
                          {fields.map((item, index) => {
                            return (
                              <div
                                key={item.id}
                                className={styles.singleNewSkill}
                              >
                                <>
                                  <input
                                    className={styles.new_skill_text}
                                    // disabled
                                    {...register(`skills.${index}.addedSkill`, {
                                      required: true,
                                    })}
                                  />
                                  <span
                                    className={styles.new_skill_icon}
                                    onClick={() => remove(index)}
                                  >
                                    <ImCross />
                                  </span>
                                </>
                              </div>
                            );
                          })}
                        </div>
                        <input
                          id="addSkillField"
                          type="text"
                          onChange={(e) => setNewSkill(e.target.value)}
                          className={`w-75 rounded  ${styles.inputField1}`}
                        />{" "}
                        <button
                          type="button"
                          className={styles.submitBtn2}
                          onClick={() => {
                            newSkill !== "" &&
                              append({
                                addedSkill: `${newSkill}`,
                              });
                            document.getElementById("addSkillField").value = "";
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className=" section-heading text-center mt-2 mb-2">
                        Chamber & Location
                      </h3>
                      <label className={styles.inputLabel}>
                        {" "}
                        Chamber / Place{" "}
                      </label>
                      <input
                        type="address"
                        defaultValue={`${userInfo.chamber}`}
                        onChange={(e) => setChamber(e.target.value)}
                        {...register(`chamber`)}
                        className={`w-100 rounded  ${styles.inputField1}`}
                      />{" "}
                      <label className={styles.inputLabel}>Location</label>{" "}
                      <br />
                      <p className={`${styles.new_location_text} text-center fs-5`}>{userInfo.name&&selectDis}</p>
                      
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-button-dark-example1"
                          className={styles.dropBtn}
                        >
                          Select Location 
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={styles.dropDownMenu}>
                          {districts?.map((d) => (
                            <Dropdown.Item
                              className={styles.dropItem}
                              onClick={() => selectDistrict(d)}
                            >
                              {d}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
                <input
                  type="submit"
                  value={`Update & Save`}
                  className={styles.submitBtn}
                />
              </form>
            </div>
          </Container>
        )}
      </>
    </div>
  );
};

export default DocProfile;
