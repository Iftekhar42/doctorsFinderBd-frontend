import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import styles from "../Auth.module.css";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <div className="login-form border rounded p-4 ">
        <h4 className={styles.formHeading}>Forgot Password</h4>
        <small className="text-secondary">Enter you email to get a password reset link</small>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <input
            {...register("email", { required: true })}
            className={`mt-5 mb-3 w-100 py-2 ${styles.formInputField}`}
            placeholder="Email"
          />
          <br />

          {errors.email && <span>All field is required</span>}
          <br />
          <input
            type="submit"
            className={`${styles.submit_btn} w-100 py-2 rounded border-0 fw-bold text-white fs-5`}
            value="Password reset"
          />
        </form>

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

export default ForgetPassword;
