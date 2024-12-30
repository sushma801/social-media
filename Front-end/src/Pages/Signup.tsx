import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useFormik } from "formik";

const genders = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("Required username")
      .min(3, "Too! short username")
      .max(30, "Too! long username"),
    fullName: yup
      .string()
      .required("Required")
      .min(2, "Too! short full name")
      .max(30, "Too! long full name"),
    gender: yup.string().required("Required genders"),
    password: yup
      .string()
      .required("Required Password")
      .min(6, "Password is too short")
      .max(30, "Password is too long")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
  const initialValues = {
    userName: "",
    fullName: "",
    gender: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="w-[40%] p-4 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h3 className="text-2xl font-semibold text-center text-[#4287f5]">
          Sign Up Page
        </h3>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              className="label p-2 text-base font-bold label-text text-[#4287f5]"
              htmlFor="userName"
            >
              {" "}
              Username
            </label>
            <input
              autoComplete="username"
              type="text"
              name="userName"
              id="userName"
              className="w-full input input-bordered h-10 bg-slate-100 p-2 m-2"
              placeholder="Enter Username"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.userName}
                </span>
              </div>
            ) : null}
          </div>
          <div>
            <label
              className="label p-2 text-base font-bold label-text text-[#4287f5]"
              htmlFor="fullName"
            >
              {" "}
              Full-Name
            </label>
            <input
              autoComplete="full-name"
              type="text"
              name="fullName"
              id="fullName"
              className="w-full input input-bordered h-10  bg-slate-100  p-2 m-2"
              placeholder="Enter Full name"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.fullName}
                </span>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col ">
            <div className="flex  py-2  m-2">
              {genders.map((gender) => {
                return (
                  <div className="form-control" key={gender.value}>
                    <label
                      className="label gap-2 font-bold cursor-pointer"
                      htmlFor="gender"
                    >
                      <span className="label-text text-[#4287f5]">
                        {gender.label}
                      </span>
                      <input
                        type="radio"
                        name="gender"
                        id={`gender ${gender.value}`}
                        className="radio border-slate-100  p-2 m-2"
                        onChange={formik.handleChange}
                        value={gender.value}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            {formik.touched.gender && formik.errors.gender ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.gender}
                </span>
              </div>
            ) : null}
          </div>

          <div>
            <label
              className="label p-2 text-base font-bold label-text text-[#4287f5]"
              htmlFor="password"
            >
              {" "}
              Password
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                type={`${isPasswordVisible ? "text" : "password"}`}
                id="password"
                name="password"
                className="w-full input input-bordered h-10 bg-slate-100  p-2 m-2"
                placeholder="Enter Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <button
                className="absolute top-[20px] right-[20px] text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPasswordVisible(!isPasswordVisible);
                }}
              >
                {isPasswordVisible ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.password}
                </span>
              </div>
            ) : null}
          </div>
          <div>
            <label
              className="label p-2 text-base font-bold label-text text-[#4287f5]"
              htmlFor="confirmPassword"
            >
              {" "}
              Confirm Password
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                name="confirmPassword"
                id="confirmPassword"
                type={`${isConfirmPasswordVisible ? "text" : "password"}`}
                className="w-full input input-bordered h-10 bg-slate-100  p-2 m-2"
                placeholder="Enter Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <button
                className="absolute top-[20px] right-[20px] text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                }}
              >
                {isConfirmPasswordVisible ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.confirmPassword}
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex justify-between">
            <Link
              to="/login"
              className="text-sm  hover:underline hover:text-blue-800 mt-2 inline-block p-2"
            >
              Already have an account?
            </Link>
            <button
              className="text-sm text-[#4287f5] font-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

          <div>
            <button
              className="btn btn-block btn-sm font-bold p-2 m-2  bg-[#4287f5] text-slate-100"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
