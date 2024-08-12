import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(); //state to hold error
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    console.log("sdfaskld;fjlk;sadjflksadjflkajsd");
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      const cookieValue = Cookies.get("accessToken");
      console.log("Cookie Value:", cookieValue);
      if (res.data.loginStudent) {
        localStorage.setItem("qrCode", res.data.qrCode);
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Login failed");
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      // alert("An error occurred");
      setErrorMessage(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-secondary vh-100"
      style={{ width: "1300px" }}
    >
      <div className="bg-white p-3 rounded" style={{ width: "300px" }}>
        <h2 className="text-center">Login</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p className="text-center mt-3">Don't have an account?</p>
        <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
