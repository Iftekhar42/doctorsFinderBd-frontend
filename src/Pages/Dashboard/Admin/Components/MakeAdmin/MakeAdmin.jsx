import React from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

const MakeAdmin = () => {

  const makeAadmin = () => {
    
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <div className="container">
        <h1 className="section-heading secondary-color py-3 text-center">
          Add another admin User
        </h1>
        <Container className={` p-5 border rounded `}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <label className="fs-5">Enter email you want to make admin: </label>{" "}
            <br />
            <input
              {...register("email")}
              placeholder="Enter  email "
              className="w-75 p-2 me-2 border rounded"
            />
            <input
              type="submit"
              style={{ backgroundColor: "var(--primaryColor)" }}
              className="border px-4 py-2 text-white rounded"
            />
          </form>
        </Container>
      </div>
    </div>
  );
};

export default MakeAdmin;
