import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import styles from "./Testimonial.module.css";
const Testimonial = () => {
  const [feedbacks, setFeedback] = useState([]);

  useEffect(() => {
    fetch("https://doctors-finder-bd-backend.vercel.app/allFeedback")
      .then((res) => res.json())
      .then((data) => setFeedback(data));
  }, []);

  const settings = {
    autoplay:true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="py-5 bg-light">
      <div className="header">
        <h5 className="text-center secondary-color fw-bold">TESTIMONIALS</h5>
        <h1 className="text-center section-heading fw-bold primary-color">
          What people say about us
        </h1>
      </div>
      <div className="testimonials p-4">
        <div className={styles.sliderContainer}>
          {feedbacks?.length > 0 ? (
            <Slider {...settings}>
              {feedbacks?.map((feedback) => (
                <div
                  className={`${styles.testimonialCard}  px-3  bg-white rounded shadow `}
                >
                  <Row className="d-flex align-items-center py-2">
                    <Col sm={3}>
                      <img
                        
                        src={`${feedback?.photoUrl}`}
                        alt=""
                        srcset=""
                        className="img-fluid rounded-circle"
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
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
