import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./Solution.module.css";
const OurSolution = () => {
  const data = [
    "Heart Disease",
    "Stroke",
    "Cancers",
    "Diabetes",
    "Diarrheal Diseases",
    "Tuberculosis",
  ];
  return (
    <div className={styles.solutionContainer}>
      <div className="header">
        <h1 className="section-heading text-center text-white py-3">
          We Have Specialist on
        </h1>
      </div>
      <div className="container">
        <Row className="w-100 cols-1 row-cols-md-3 g-4">
          {data.map((d) => (
            <Col className="py-2">
              <h4 className={`bg-white primary-color text-center p-5 rounded  ${styles.card}`}>
                {d}
              </h4>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default OurSolution;
