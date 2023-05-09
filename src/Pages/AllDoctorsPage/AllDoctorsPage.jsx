import React, { useEffect, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import districts from "./allDistrict";
import styles from "./AllDoctor.module.css";
import SingleDoctors from "./SingleDoctors";

const AllDoctorsPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [selectDis, setSelectDis] = useState("Select Location");
  const [doctorsData, setDoctorsData] = useState([]);
  // console.log(districts);

  const loadAllData = () => {
    fetch(`https://doctors-finder-bd-backend.vercel.app/allDoctors`)
      .then((res) => res.json())
      .then((data) => setDoctorsData(data));
  };
  // const data = [...doctorsData];
  const filterDoctors = (dis) => {
    setIsLoad(true);
    if (dis === "All") {
      loadAllData();
      setIsLoad(false);
    } else {
      fetch(`https://doctors-finder-bd-backend.vercel.app/areaDoctor/${dis}`)
        .then((res) => res.json())
        .then((data) => {
          setDoctorsData(data);
          setIsLoad(false);
        });
    }
  };

  useEffect(() => {
    setSelectDis("Select Location");
    loadAllData();
  }, []);

  const selectDistrict = (dis) => {
    setSelectDis(dis);
    filterDoctors(dis);
    // console.log(dis);
  };

  return (
    <div className={styles.allDoctorPage_wrapper}>
      {/* All doctors section */}
      <div className="container pb-5">
        <h2 className="py-2 section-heading text-center secondary-color">
          Our Specialist
        </h2>
        {/* Search section */}
        <div className=" py-2">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              className={styles.dropBtn}
            >
              {selectDis}
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

        {isLoad && <Spinner />}
        {doctorsData?.length > 0 || isLoad ? (
          <>
            {!isLoad && (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {doctorsData?.map(
                  (doctor) => doctor?.name && <SingleDoctors doctor={doctor} />
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <Spinner className="text-center" />
          </>
        )}

        {doctorsData?.length === 0 && isLoad && (
          <p className="text-center fs-4">No doctor found</p>
        )}
      </div>
    </div>
  );
};

export default AllDoctorsPage;
