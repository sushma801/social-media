import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        element={authUser ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to={"/home"} /> : <Signup />}
      />
      <Route
        path="/home"
        element={authUser ? <Home /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

export default App;
