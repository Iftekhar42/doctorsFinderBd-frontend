import React, { useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AllAppointment from "./Components/AllAppointment/AllAppointment";
import AppointmentRequest from "./Components/AppointmentRequest/AppointmentRequest";
import DocProfile from "./Components/DocProfile/DocProfile";
import FeedBack from "./Components/FeedBack/FeedBack";
import OnlineAppointment from "./Components/OnlineAppoinment/OnlineAppointment";
import Schedules from "./Components/Schedules/Schedules";
import styles from "./Doctor.module.css";

const Doctor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [sideBarPosition, setSideBarPosition] = useState(false);
  const { collapseSidebar } = useProSidebar();
  const [userInfo, setUserInfo] = useState({});
  const [activetLink, setActivetLink] = useState("schedules");
  const persentUser = JSON.parse(localStorage.getItem("currentUser"));

  // get user data from db
  const getDataFromDb = () => {
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/allDoctors/${persentUser?.user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  };

  /* Get update  from other component */
  const updatedData = () => {
    getDataFromDb();
  }

  useEffect(() => {
    getDataFromDb();
  }, []);

  console.log(params.pageName);
  // handle sidebar btn function
  const handleSidebarBtn = () => {
    collapseSidebar();
    if (sideBarPosition) {
      setSideBarPosition(false);
    } else {
      setSideBarPosition(true);
    }
  };

  if (location.pathname === "/dashboard") {
    navigate("/dashboard/schedules");
  }

  // console.log(userInfo);
  const routeInfo = [
    { path: "profile", navTitle: "Profile" },
    { path: "allAppointment", navTitle: "All Appointment" },
    { path: "requestAppointment", navTitle: "Appointment Request" },
    { path: "schedules", navTitle: "Schedules" },
    { path: "onlineAppointment", navTitle: "Online Appointment" },
    { path: "feedback", navTitle: "Feedback" },
  ];

  return (
    <div>
      <div
        className="w-100 d-flex border"
        style={{ backgroundColor: "var(--primaryColor)" }}
      >
        <div>
          {" "}
          <div className={styles.sideBarContainer}>
            <Sidebar backgroundColor="#238b88">
              <button
                onClick={() => handleSidebarBtn()}
                className={`border-0 fs-2 fw-bold w-100 ${styles.sideBarbtn}`}
              >
                {sideBarPosition ? <FcNext /> : <FcPrevious />}
              </button>
              <Menu>
                {routeInfo.map((d) => (
                  <MenuItem
                    className={`${
                      params.pageName === d.path
                        ? styles.activeLink
                        : styles.menuItem
                    }`}
                    component={<Link to={`/dashboard/${d.path}`} />}
                  >
                    {d.navTitle}
                  </MenuItem>
                ))}
              </Menu>
            </Sidebar>
          </div>
        </div>
        <div className="w-100 bg-light">
          {params.pageName === "profile" ? (
            userInfo.email && (
              <DocProfile userInfo={userInfo} updateFunc={updatedData} />
            )
          ) : params.pageName === "allAppointment" ? (
            <AllAppointment />
          ) : params.pageName === "requestAppointment" ? (
            userInfo.email && (
              <AppointmentRequest
                userInfo1={userInfo}
                updatedData={updatedData}
              />
            )
          ) : params.pageName === "schedules" ? (
            userInfo.email && (
              <Schedules userInfo1={userInfo} updateFunc={updatedData} />
            )
          ) : params.pageName === "onlineAppointment" ? (
            userInfo.email && <OnlineAppointment userInfo1={userInfo} />
          ) : params.pageName === "feedback" ? (
            userInfo.email && <FeedBack allFeedBacks={userInfo.dFeedbacks} />
          ) : (
            <DocProfile />
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
