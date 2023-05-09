import { Route, Routes } from "react-router-dom";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AllDoctorsPage from "./Pages/AllDoctorsPage/AllDoctorsPage";
import Auth from "./Pages/AuthPage/Auth";
import ContactUs from "./Pages/ContactUS/ContactUs";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ApplyAppointment from "./Pages/Dashboard/Patient/Components/ApplyAppointment/ApplyAppointment";
import DoctorDetailsPage from "./Pages/DoctorDetailsPage/DoctorDetailsPage";
import FilterDataDaises from "./Pages/FilterDoctorDaises/FilterDataDaises";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Footer from "./Pages/shared/Footer/Footer";
import NavigationBar from "./Pages/shared/NavigationBar/NavigationBar";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import WriteFeedBack from "./Pages/Dashboard/Patient/Components/WriteFeedback/WriteFeedBack";
import WriteFeedbackToDoctor from "./Pages/Dashboard/Patient/Components/WriteFeedback/WriteFeedbackToDoctor";

function App() {
  return (
    <div>
      <NavigationBar />
      <>
        {" "}
        {/* <h1 className="section-heading text-center py-5 my-5 text-danger">Please Contact With Authority</h1>{" "} */}
      </>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/doctors" element={<AllDoctorsPage />} />
        <Route
          path="/doctorsFullProfile/:pId"
          element={<DoctorDetailsPage />}
        />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/searchedDoctor/:daises" element={<FilterDataDaises />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/forgotPassword" element={<Auth />} />
        <Route path="/*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookAppointment/:doctorId"
          element={
            <ProtectedRoute>
              <ApplyAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/:pageName"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="sendFeedBack/doctor/:appointID"
          element={
            <ProtectedRoute>
              <WriteFeedbackToDoctor />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
