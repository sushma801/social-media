import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// import Signup from "./Pages/Signup";
// import Login from "./Pages/Login";
// import Home from "./Pages/Home";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Signup = lazy(() => import("./Pages/Signup"));
const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));

function App() {
  const isUserLoggedIn = useSelector((state) => state.users.loggedInUser);
  const [authUser, setAuthUser] = useState(isUserLoggedIn);
  useEffect(() => {
    const userDetails = localStorage.getItem("authUser");
    if (userDetails) {
      setAuthUser(userDetails);
    } else {
      setAuthUser(isUserLoggedIn);
    }
  }, [isUserLoggedIn]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <Navigate to="/home" />
          ) : (
            <Suspense fallback={<span>Login Page is loading</span>}>
              <Login />
            </Suspense>
          )
        }
      />
      <Route
        path="/signup"
        element={
          authUser ? (
            <Navigate to={"/home"} />
          ) : (
            <Suspense fallback={<span>Login Page is loading</span>}>
              <Signup />
            </Suspense>
          )
        }
      />
      <Route
        path="/home"
        element={
          authUser ? (
            <Suspense fallback={<span>Login Page is loading</span>}>
              <Home />
            </Suspense>
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
    </Routes>
  );
}

export default App;
