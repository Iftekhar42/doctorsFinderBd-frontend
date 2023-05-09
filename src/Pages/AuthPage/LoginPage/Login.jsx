import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../Auth.module.css";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/Firebase.init";
import Swal from "sweetalert2";
import { Alert } from "react-bootstrap";


const Login = () => {

const [signInWithEmailAndPassword, user, loading, error] =
  useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();



  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  if (user) {
    // save user in local storage
    const newUser = JSON.stringify(user);
    localStorage.setItem("currentUser", newUser);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Login",
      showConfirmButton: false,
      timer: 1500,
    });
    reset();
    navigate("/dashboard");
  }
 
  return (
    <div>
      <div className="login-form border rounded p-4 ">
      {error?<Alert  variant={`danger`}>
          Wrong email or password
        </Alert>:""}
        <h4 className={styles.formHeading}>Login Doctors Finder BD</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="">
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

          {errors.password && errors.email && (
            <span>All field is required</span>
          )}
          <br />
          <input
            type="submit"
            className={`${styles.submit_btn} w-100 py-2 rounded border-0 fw-bold text-white fs-5`}
            value="Login"
          />
        </form>
        <NavLink to="/forgotPassword">
          <p className="text-end pe-5 py-2">Forgot Password ?</p>
        </NavLink>
        <div className={styles.loginOr}>
          <span className={styles.orLine}></span>
          <span className={styles.or}>or</span>
        </div>
        <div className="socialLoginBnt">
          <p className="text-center">
            Dont have a account ?{" "}
            <NavLink to="/register" className={`text-decoration-none`}>
              <span className="secondary-color">Register</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
