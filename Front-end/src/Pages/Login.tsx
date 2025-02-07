import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/UserSlice";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser] = useMutation(LOGGEDIN_USER);

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username required")
      .min(3, "Too! short username")
      .max(30, "Too! long username"),
    password: yup
      .string()
      .required("Password required")
      .min(6, "Too Short! Password")
      .max(30, "Too long!! Password")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });
  const initialValues = {
    username: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { username, password } = values;
        const res = await loginUser({ variables: { username, password } });
        if (res) {
          localStorage.setItem("authUser", JSON.stringify(res.data.login));
          console.log(res);
          localStorage.setItem("token", JSON.stringify(res.data.login.token));
          dispatch(setAuthUser(res.data.login));
          navigate("/");
        }
      } catch (e) {
        console.log(e);
      }
    },
  });
  const handlePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className=" p-4 shadow-md w-[40%]  backdrop-blur-lg bg-opacity-0 backdrop-filter  rounded-lg">
        <div className="cardTitle p-4 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-[#4287f5]">Login Page</h3>
          <h4>Welcome to the login Page</h4>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              className="label p-2 text-base font-bold label-text text-[#4287f5]"
              htmlFor="username"
            >
              {" "}
              Username
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10 bg-slate-100 p-2 m-2"
              placeholder="Enter Username"
              name="username"
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <div>
              <span className="text-red-800 font-semibold p-2 error">
                {formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : null}
              </span>
            </div>
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
                name="password"
                id="password"
                type={`${isPasswordVisible ? "text" : "password"}`}
                className="w-full input input-bordered h-10 bg-slate-100 p-2 m-2"
                placeholder="Enter Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <button
                onClick={handlePasswordVisibility}
                className="absolute top-[20px] right-[20px] text-lg"
              >
                {isPasswordVisible ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
            <div>
              <span className="text-red-800 font-semibold p-2">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-800 mt-2 inline-block p-2 "
            >
              {"Don't"} have an account?
            </Link>
            <button
              className=" font-bold text-[#4287f5]"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm p-2 m-2  font-bold bg-[#4287f5] text-slate-100 "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

export const LOGGEDIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
    }
  }
`;
