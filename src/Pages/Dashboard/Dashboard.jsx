import React, { useState } from "react";
import Admin from "./Admin/Admin";
import Doctor from "./Doctor/Doctor";
import Patient from "./Patient/Patient";
import { ProSidebarProvider } from "react-pro-sidebar";
const Dashboard = () => {
  const [user, setUser] = useState({});
  const presentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(presentUser?.user?.displayName);
  return (
    <div>
      <ProSidebarProvider>
        {presentUser?.user?.displayName === "admin" ? (
          <Admin />
        ) : presentUser?.user?.displayName === "doctor" ? (
          <Doctor />
        ) : presentUser?.user?.displayName === "patient" ? (
          <Patient />
        ) : (
          "Something went wrong login again"
        )}
      </ProSidebarProvider>
    </div>
  );
};

export default Dashboard;
