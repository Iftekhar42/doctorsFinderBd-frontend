import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../../Firebase/Firebase.init";
import styles from "../Auth.module.css";
const Register = () => {
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  // post data to db

  const postData = () => {
    fetch(`https://doctors-finder-bd-backend.vercel.app/add${role}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(result);
      });
  };

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUserWithEmailAndPassword(data.email, data.password);
    setFormData(data);
    console.log(data);
  };

  // update user role in firebase username
  if (user) {
    updateProfile(auth.currentUser, {
      displayName: `${role}`,
      // photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // save user in local storage
        const newUser = JSON.stringify(user);
        localStorage.setItem("currentUser", newUser);
        postData();

        reset();
        navigate("/dashboard");
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
  }

  return (
    <div>
      <div className="login-form border rounded p-4 ">
        {error ? <Alert variant={`danger`}>Wrong email or password</Alert> : ""}
        <div>
          <button
            onClick={() => setRole("patient")}
            className={`${
              role === "patient" ? styles.roleBgActive : styles.roleBg
            } w-50 py-2 rounded-start border-0 fw-bold text-white fs-5`}
          >
            Patient Register
          </button>
          <button
            onClick={() => setRole("doctor")}
            className={`${
              role === "doctor" ? styles.roleBgActive : styles.roleBg
            } w-50 py-2 rounded-end border-0 fw-bold text-white fs-5`}
          >
            Doctor Register
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {role === "doctor" ? (
            <>
              {" "}
              <input
                {...register("license", { required: true })}
                className={`mb-3 w-100 py-2 ${styles.formInputField} mt-4`}
                placeholder="License ID"
              />
              <br />
            </>
          ) : (
            <></>
          )}
          <input
            {...register("name", { required: true })}
            className={`mb-3 w-100 py-2 ${styles.formInputField}`}
            placeholder="Name"
          />
          <br />
          <input
            {...register("mobile", { required: true })}
            className={`mb-3 w-100 py-2 ${styles.formInputField}`}
            placeholder="Mobile Number"
          />
          <br />
          <input
            {...register("email", { required: true })}
            className={`mb-3 w-100 py-2 ${styles.formInputField}`}
            placeholder="Email"
          />
          <br />
          <input
            type={`password`}
            {...register("password", { required: true })}
            className={`mb-3 w-100 py-2 ${styles.formInputField}`}
            placeholder="Password"
          />

          {errors.password && errors.email && errors.mobile && errors.name && (
            <Alert variant={`danger`}>All field are required</Alert>
          )}
          <br />
          <input
            type="submit"
            className={`${styles.submit_btn} w-100 py-2 rounded border-0 fw-bold text-white fs-5`}
            value="Register"
          />
        </form>

        <div className={styles.loginOr}>
          <span className={styles.orLine}></span>
          <span className={styles.or}>or</span>
        </div>
        <div className="">
          <p className="text-center">
            Already have an account ?{" "}
            <NavLink to="/login" className={`text-decoration-none`}>
              <span className="secondary-color">Login Here</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
