import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/login.css";
import { Strings } from "./Helper";
import { Alert } from "@mui/material";
import { useForgotPasswordMutation } from "../redux/services/auth";
import Otpverify from "./Otpverify";
function Forget() {
  const { push } = useHistory();
  const [userId, setUserId] = useState("");
  const [forgotPassword, responseInfo] = useForgotPasswordMutation();

  const [otpField, setOtpField] = useState(false);
  const [apiMsg, setApiMsg] = useState({});
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword({ user_id: userId });
  };
  function OtpSuccess() {
    setOtpField(true);
    setApiMsg(responseInfo.data);
  }
  if (responseInfo.isSuccess) {
    if (responseInfo.data.status) {
      OtpSuccess();
    } else {
      setApiMsg(responseInfo.data);
      console.log(apiMsg);
    }
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
            <Otpverify apiMsg={apiMsg} />
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
                {/* {apiMsg?.message?.length > 0 && (
                  <Alert
                    sx={{ width: "300px", marginTop: "10px" }}
                    severity="info"
                  >
                    {" "}
                    {apiMsg}{" "}
                  </Alert>
                )} */}
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
