import React from "react";
import styles from "./Hero.module.css";
import SearchBar from "./SearchBar";
const Hero = () => {
  return (
    <div className={styles.hero_container}>
      <p
        className={`text-center text-white fs-4 fw-bold ${styles.hero_sub_heading}`}
      >
        Be Hear Healthy
      </p>
      <h1 className="text-center section-heading text-white">
        The correct assistance at the perfect time
      </h1>
      <p className="text-center text-white ">
        It helps patients find healthcare professionals in their area based on
        medical specialty, location, or <br /> insurance coverage. Users can
        search for doctors, read reviews and ratings from other patients, and
        book appointments online.
      </p>
      <div className="d-flex justify-content-center ">
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
