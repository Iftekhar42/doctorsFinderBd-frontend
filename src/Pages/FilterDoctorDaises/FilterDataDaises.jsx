import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import SingleDoctors from "../AllDoctorsPage/SingleDoctors";
import styles from "./FilterData.module.css";

const FilterDataDaises = () => {
  const [matched, setMatched] = useState(false);
  const params = useParams();
  const [isLoad, setIsLoad] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [filterDoctor, setFilterDoctor] = useState([]);
  const [daises, setDaises] = useState("");
  const location = useLocation();
  // console.log(location.pathname.split("/")[2]);

  useEffect(() => {
    if (isLoad) {
      setDoctors([]);
      fetch(
        `https://doctors-finder-bd-backend.vercel.app/daisesDoctor/${
          location.pathname.split("/")[2]
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setDoctors(data);
          console.log(data);
        });
      setIsLoad(false);
    }
  }, [params.daises, isLoad]);
  //  console.log(params.daises);
  return (
    <div className={`container py-5  ${styles.filterContainer} w-100`}>
      <h2 className="py-2 section-heading text-center secondary-color">
        You Search For : {params?.daises}
      </h2>
      {isLoad && <Spinner />}
      {doctors.length == 0 && !isLoad && (
        <p className="text-center fw-bold  text-primary fs-5">
          Please Enter Diseases correct spelling or follow our Suggestion.
          <span className="d-block">Or</span>
          <button className="btn btn-primary" onClick={()=>setIsLoad(true)}> Search Again </button>
        </p>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4 w-100">
        {doctors?.map((doctor) => (
          <SingleDoctors doctor={doctor} key={doctor.email} />
        ))}
      </div>
    </div>
  );
};

export default FilterDataDaises;
