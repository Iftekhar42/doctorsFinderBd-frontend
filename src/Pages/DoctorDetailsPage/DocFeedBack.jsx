import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import styles from "./DoctorDetails.module.css";
const DocFeedBack = ({ feedback }) => {
  console.log(feedback);
  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="py-5 bg-light">
      <div className="header">
        <h3 className="text-center secondary-color fw-bold">Patients Feedbacks</h3>
        
      </div>
      <div className="testimonials p-4">
        <div className={styles.sliderContainer}>
          {feedback?.length  ? (
            <Slider {...settings}>
              {feedback?.map((feedback) => (
                <div
                  className={`${styles.testimonialCard}  px-3  bg-white rounded shadow  container`}
                >
                  <Row className="d-flex align-items-center py-2">
                    <Col sm={3}>
                      <img
                        src={`${feedback?.imgLink}`}
                        alt=""
                        srcset=""
                        className="img-fluid rounded"
                      />
                    </Col>
                    <Col sm={7}>
                      <h4>{feedback?.name}</h4>
                    </Col>
                    <Col sm={2} className="text-end">
                      <FaQuoteLeft className=" secondary-color display-4" />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-3 ">
                      <p className="">{feedback?.comment}</p>
                    </Col>
                  </Row>
                </div>
              ))}
            </Slider>
          ) : (
              <>{feedback.length===0?<p className="text-center fs-5 fw-bold">No feedback</p>:<Spinner/> }</>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocFeedBack;
