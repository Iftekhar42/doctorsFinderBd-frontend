import React, { useEffect, useState } from "react";
import { Badge, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./TopDoctors.module.css";
const TopDoctors = () => {
  const [topList, setTopList] = useState([]);

  useEffect(() => {
    fetch("https://doctors-finder-bd-backend.vercel.app/topDoctors")
      .then((res) => res.json())
      .then((data) => setTopList(data));
  }, []);

  return (
    <div className="py-5">
      <div className="header py-5">
        <h5 className="secondary-color fw-bold text-center">
          QUALIFIED PROFESSIONAL
        </h5>
        <h1 className="section-heading text-center primary-color">
          Our Top Doctors
        </h1>
      </div>
      <div className="doctors-container w-100 px-5 d-flex  flex-wrap justify-content-center">
        {topList?.length > 0 ? (
          <>
            {topList?.map((doctor) => (
              <>
                <Card style={{ width: "15rem" }} className="m-2">
                  <Card.Img variant="top" src={`${doctor?.imgUrl}`} />
                  <Card.Body>
                    <Card.Title className="text-center">{`${doctor?.name}`}</Card.Title>
                    <Card.Text>
                      <p className="fw-bold text-secondary">Specialist on:</p>
                      {doctor?.skill?.map((s) => (
                        <Badge className="m-1 ">{s?.addedSkill}</Badge>
                      ))}
                    </Card.Text>
                  </Card.Body>

                  <Link
                    to={`/doctorsFullProfile/${doctor?.pId}`}
                    className="text-decoration-none fw-bold text-white"
                  >
                    <Card.Footer
                      className={`${styles.cardFooter} text-center text-decoration-none`}
                    >
                      View Profile
                    </Card.Footer>
                  </Link>
                </Card>
              </>
            ))}
          </>
        ) : (
          <Spinner className="text-center" />
        )}

        {/*  <Card style={{ width: "15rem" }} className="m-2">
          <Card.Img variant="top" src="https://i.ibb.co/VjTGFkP/doctors.jpg" />
          <Card.Body>
            <Card.Title>John Wolf</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "15rem" }} className="m-2">
          <Card.Img variant="top" src="https://i.ibb.co/VjTGFkP/doctors.jpg" />
          <Card.Body>
            <Card.Title>John Wolf</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "15rem" }} className="m-2">
          <Card.Img variant="top" src="https://i.ibb.co/VjTGFkP/doctors.jpg" />
          <Card.Body>
            <Card.Title>John Wolf</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "15rem" }} className="m-2">
          <Card.Img variant="top" src="https://i.ibb.co/VjTGFkP/doctors.jpg" />
          <Card.Body>
            <Card.Title>John Wolf</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card> */}
      </div>
    </div>
  );
};

export default TopDoctors;
