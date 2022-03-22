import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/login.css";
import SidePicture from "./SidePicture";
import Otpverify from "./Otpverify";
const Register = () => {
  const [store, setStore] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [regResponse, setRegResponse] = useState();
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState(false);

  const { push } = useHistory();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      account_type: "Merchant",
      email: email,
      business_name: store,
      phone_no: phone,
      password: password,
    };
    const res = await axios.post(
      "http://54.167.27.9:1994/api/register/NewUserRegistration",
      user
    );
    if (res.data.status === 200) {
      setRegSuccess(true);
      setRegResponse(res.data);
    } else {
      window.alert(res.data.message);
      setRegError(true);
      setRegResponse(res.data);
    }
  };
  useEffect(() => {
    if (otpVerified) {
      push("/");
    }
  }, [otpVerified]);
  return (
    <>
      <div className="login_container">
        <div className="login_wrapper">
          <div className="login_card">
            <div className="side_picture">
              <SidePicture />
            </div>
            {regSuccess ? (
              <Otpverify
                apiMsg={regResponse.data}
                setOtpVerified={setOtpVerified}
              />
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
