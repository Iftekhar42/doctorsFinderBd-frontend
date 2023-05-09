import React, { useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./Admin.module.css";
import AdminProfile from "./Components/AdminProfile/AdminProfile";
import AllDoctors from "./Components/AllDoctors/AllDoctors";
import AllFeedbacks from "./Components/AllFeedBacks/AllFeedbacks";
import AllPatients from "./Components/AllPatients/AllPatients";
import EditTopDoctors from "./Components/TopDoctors/EditTopDoctors";
const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [sideBarPosition, setSideBarPosition] = useState(false);
  const { collapseSidebar } = useProSidebar();
  const [userInfo, setUserInfo] = useState({});
  const [activetLink, setActivetLink] = useState("profile");
  const persentUser = JSON.parse(localStorage.getItem("currentUser"));
  // get user data from db
  useEffect(() => {
    fetch(
      `https://doctors-finder-bd-backend.vercel.app/admins/${persentUser?.user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);
  // console.log(params.pageName);
  console.log(userInfo.email);
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
    navigate("/dashboard/profile");
  }

  console.log(location.pathname);
  const routeInfo = [
    { path: "profile", navTitle: "Profile" },
    { path: "doctors", navTitle: "All Doctors" },
    { path: "patients", navTitle: "All Patients" },
    { path: "topDoctors", navTitle: "Top Doctors" },
    { path: "allFeedback", navTitle: "All Feedback" },
    // { path: "makeAdmin", navTitle: "Make Admin" },
  ];

  return (
    <div>
      <div
        className="w-100 d-flex"
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
            <AdminProfile userInfo={userInfo} />
          ) : params.pageName === "doctors" ? (
            <AllDoctors />
          ) : params.pageName === "patients" ? (
            <AllPatients />
          ) : params.pageName === "topDoctors" ? (
            <EditTopDoctors />
          ) : params.pageName === "allFeedback" ? (
            <AllFeedbacks />
          ) : params.pageName === "addDoctor" ? (
            <AllFeedbacks />
          ) : (
            <AdminProfile />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
