import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Otpverify({ apiMsg,setOtpVerified }) {
  const [otp, setOtp] = useState("");
  const { push } = useHistory();
  const otpVerification = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://54.167.27.9:1994/api/otpVerification/VerifyOtp",{otp:otp,user_id:apiMsg.user_id});
    console.log(res);
    if(res.data.status===200){
      setOtpVerified(true);
    }
  };
  const OtpResend = async (e) => {
    e.preventDefault();
    await axios.post("http://54.167.27.9:1994/api/otpVerification/ResendOTP",{ phone_no: apiMsg.phone_no, user_id: apiMsg.user_id })
  };
  return (
    <div className="main_login">
      <div className="main_login_body">
        <div className="details_userId">
          <input
            id="otp"
            type="number"
            placeholder="Verification Code"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </div>
        <div className="split_button_wrapper">
          <button onClick={OtpResend} className="otp_buttons">
            Resend
          </button>
          <button onClick={otpVerification} className="otp_buttons">
            Verify
          </button>
        </div>
      </div>
      <div
        className="main_login_footer"
        style={{
          marginTop: "10px",
        }}
      >
        <span>
          Try To
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
  );
}

export default Otpverify;
