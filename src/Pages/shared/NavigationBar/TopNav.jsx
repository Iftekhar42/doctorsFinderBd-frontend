import React from 'react';
import { Col, Row } from "react-bootstrap";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { TbPhoneCall } from "react-icons/tb";
import styles from "./Navigation.module.css";
const TopNav = () => {
    return (
      <div>
        <div className={`${styles.navigation_top_bar}  d-none d-sm-block`}>
          <Row>
            <Col sm={9}>
              {" "}
              <p className="fs-5">
                <span>
                  <TbPhoneCall className="" /> Contact Number: 017XXXXXX
                </span>
                <span className="ps-3">
                  <IoLocationOutline className="" /> Location: Uttara,Dhaka-1230
                </span>
              </p>
            </Col>
            <Col sm={3}>
              <div className="icons ">
                <ul className="list-unstyled d-flex justify-content-end pe-5 ">
                  <li className="px-2 fw-bold">Follow us on:</li>
                  <li className="px-2">
                    <BsFacebook className="fs-4" />
                  </li>
                  <li className="px-2">
                    <BsInstagram className="fs-4" />
                  </li>
                  <li className="px-2">
                    <BsTwitter className="fs-4" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
};

export default TopNav;