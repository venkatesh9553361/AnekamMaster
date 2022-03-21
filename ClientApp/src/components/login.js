import React, { useState ,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';
import SidePicture from './SidePicture';
import { useAuthCheckMutation } from '../redux/services/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/state/authSlice';
import { Alert } from 'bootstrap';
 
const Login = () => {
    const [userId, setuserId] = useState('');
    const dispatch = useDispatch();
    const [password, setpassword] = useState('');
    const [authCheck,authResponse] = useAuthCheckMutation();
    const {push} = useHistory();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = {
            user_id: userId,
            password: password,
        }
        authCheck(user);
    };
    
    if(authResponse.isSuccess){
        dispatch(setUser(authResponse.data));
    }
    return (
        <div className='login_container'>
        <div className='login_wrapper'>
            <div className='login_card'>
                <div className='side_picture'>
                    <SidePicture />
                </div>
                <div className='main_login'>
                    <div className='main_login_header'>
                        <p className='heading_one'>Log In to your Anekam account</p>
                        <p className='heading_two'>Log In for Smart Point of Sale System.</p>
                    </div>
                    <div className='main_login_body'>
                        <div className='details_userId'>
                            <label for='userid'>User ID</label>
                            <input id="userid" type='text' value={userId} onChange={(e) => setuserId(e.target.value)} placeholder='Enter email / registered phone number' />
                        </div>
                        <div className='details_password'>
                            <label for='password'>Password</label>
                            <input id='password' type='password' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter password' />
                        </div>
                        <div className='button_wrapper'>
                                <button className='submit_btn' type='submit' onClick={handleSubmit} >Log In</button>
                        </div>
                        {/* {
                            authResponse?.isError && <Alert severity="error">{authResponse.data.message}</Alert>
                        } */}
                    </div>
                        <div className='main_login_footer'>
                            <p onClick={() => (push("/forgot"))}>Forgot Password?</p>
                            <span>Don't have an account? <span onClick={() => (push("/register"))}>Register Here</span></span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;