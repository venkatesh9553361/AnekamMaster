import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/login.css";
import { Strings } from "./Helper";
import { Alert } from "@mui/material";
import {
  useForgotPasswordMutation,
  useUpdatePasswordMutation,
} from "../redux/services/auth";
import Otpverify from "./Otpverify";
function Forget() {
  const { push } = useHistory();
  const [userId, setUserId] = useState("");
  const [forgotPassword, responseInfo] = useForgotPasswordMutation();
  const [updatePassword, upPassResponse] = useUpdatePasswordMutation();
  const [password, setPassword] = useState();
  const [conPassword, setConPassword] = useState();
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpField, setOtpField] = useState(false);
  const [apiMsg, setApiMsg] = useState({});
  const HandleSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ user_id: userId });
  };
  if (responseInfo.isSuccess) {
    OtpVerify();
  }
  function OtpVerify() {
    if (responseInfo.data.status === 200) {
      setOtpField(true);
      setApiMsg(responseInfo.data);
    } else {
      setApiMsg(responseInfo.data);
    }
  }
  function passwordUpdate() {
    const data = {
      user_id: apiMsg.user_id,
      password: conPassword,
    };
    updatePassword(data);
  }
  return (
    <div className="login_container">
      <div className="login_wrapper">
        <div className="login_card">
          <div className="side_picture">
            <div className="side_picture_wrapper" style={{ height: "100%" }}>
              <img className="anekam_image" src={Strings.ANEKAM_IMAGE}></img>
            </div>
          </div>
          {otpField ? (
            !otpVerified ? (
              <Otpverify apiMsg={apiMsg} setOtpVerified={setOtpVerified} />
            ) : (
              <div className="main_login">
                <div className="main_login_body">
                  <div className="details_userId">
                    <input
                      id="password"
                      type="password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="details_userId">
                    <input
                      id="password"
                      type="password"
                      placeholder="Confirm Password"
                      value={conPassword}
                      onChange={(e) => {
                        setConPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="button_wrapper">
                    <button onClick={passwordUpdate} className="submit_btn">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="main_login">
              <div className="main_login_header">
                <h5 className="heading_two">Forgot Password </h5>
              </div>
              <div className="main_login_body">
                <div className="details_userId">
                  <input
                    id="userid"
                    type="tex"
                    placeholder="Submit You Email Address or Mobile Number"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      setApiMsg("");
                    }}
                  />
                </div>
                <div className="button_wrapper">
                  <button
                    className="submit_btn"
                    onClick={(e) => {
                      HandleSubmit(e);
                    }}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div>
                {apiMsg?.message?.length > 0 && (
                  <Alert
                    sx={{ width: "300px", marginTop: "10px" }}
                    severity="info"
                  >
                    {" "}
                    {apiMsg}{" "}
                  </Alert>
                )}
              </div>

              <div className="main_login_footer" style={{ marginTop: "10px" }}>
                <span>
                  Try to<span onClick={() => push("/")}> Sign In </span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forget;
