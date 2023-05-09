import React, { useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PatientAllAppointment from "./Components/AllAppointment/PatientAllAppointment";
import PatientProfile from "./Components/PatientProfile/PatientProfile";
import styles from "./Patient.module.css";
import WriteFeedBack from "./Components/WriteFeedback/WriteFeedBack";
const Patient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [sideBarPosition, setSideBarPosition] = useState(false);
  const { collapseSidebar } = useProSidebar();
  const [userInfo, setUserInfo] = useState({});
  const [activetLink, setActivetLink] = useState("allAppointment");
  const persentUser = JSON.parse(localStorage.getItem("currentUser"));
  // get user data from db

  const loadData = () => {
        fetch(
          `https://doctors-finder-bd-backend.vercel.app/allPatients/${persentUser?.user?.email}`
        )
          .then((res) => res.json())
          .then((data) => setUserInfo(data));
  }
  useEffect(() => {
    loadData();
  }, []);
  console.log(userInfo);



// update info
  const updateInfo = () => {
    loadData();
  }




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
    navigate("/dashboard/allAppointment");
  }

  console.log(userInfo);
  const routeInfo = [
    { path: "profile", navTitle: "Profile" },
    { path: "allAppointment", navTitle: "All Appointment" },
    { path: "writeFeedbacks", navTitle: "Feedbacks" },
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
        <div className="w-100 bg-white">
          {params.pageName === "profile" ? (
            userInfo?.name && <PatientProfile userInfo={userInfo} />
          ) : params.pageName === "allAppointment" ? (
            userInfo?.name && <PatientAllAppointment userInfo={userInfo} />
          ) : params.pageName === "writeFeedbacks" ? (
            userInfo?.name && (
              <WriteFeedBack userInfo={userInfo} loadData={loadData} />
            )
          ) : (
            <PatientProfile />
          )}
        </div>
      </div>
    </div>
  );
};

export default Patient;
