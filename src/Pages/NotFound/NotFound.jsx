import React from "react";
import styles from "./NotFound.module.css"
const NotFound = () => {
  return (
    <div className={`text-center ${styles.bg_container}`}>
      <h1 className="primary-color section section-heading fw-bold display-2 pt-4 pb-2">
        Page not Found
      </h1>
      <img src="https://i.ibb.co/XsNRvNF/notfound.png" alt="" srcset="" />
    </div>
  );
};

export default NotFound;
