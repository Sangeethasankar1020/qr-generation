import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  // to pass variable to server - use usestate
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // after successfully registered move to login page - usenavigate
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/register", { name, email, password })
      .then((res) => {
        // console.log(res.data)
        navigate("/api/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-secondary vh-100"
      style={{ width: "1300px" }}
    >
      <div className="bg-white p-3 rounded " style={{ width: "300px" }}>
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Register
          </button>
        </form>
        <p className="text-center mt-3">Already have an account?</p>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Registration;
