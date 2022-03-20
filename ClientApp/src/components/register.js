import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRegisterMutation } from "../redux/services/auth";
import "../styles/login.css";
import SidePicture from "./SidePicture";
const Register = () => {
  const [store, setStore] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { push } = useHistory();
  const [register, regResponse] = useRegisterMutation();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      account_type: "Merchant",
      email: email,
      business_name: store,
      phone_no: phone,
      password: password,
    };
    register(user);
  };
  return (
    <>
      <div className="login_container">
        <div className="login_wrapper">
          <div className="login_card">
            <div className="side_picture">
              <SidePicture />
            </div>
            <div className="main_login">
              <div className="main_login_body">
                <div className="details_userId">
                  <input
                    className="inp-sty"
                    type="text"
                    id="fname"
                    name="fname"
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                    placeholder="Store / Business Name"
                  />
                </div>
                <div className="details_password">
                  <input
                    className="inp-sty"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                </div>
                <div className="details_password">
                  <input
                    className="inp-sty"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="details_password">
                  <input
                    className="inp-sty"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="details_password">
                  <input
                    className="inp-sty"
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                  />
                </div>
                <div className="button_wrapper">
                  <button
                    style={{ marginTop: "10px", width: "100%" }}
                    className="submit-sty"
                    onClick={(e) => HandleSubmit(e)}
                    value="Sign Up"
                  >
                    SignUp
                  </button>
                </div>
              </div>
              <div className="main_login_footer">
                <span>
                  Already Have A Account
                  <span
                    onClick={() => {
                      push("/");
                    }}
                  >
                    {" "}
                    Login
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
