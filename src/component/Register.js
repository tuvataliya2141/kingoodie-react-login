import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import CommonService from "../services/commonService";
import urlConstant from "../constants/urlConstant";
import { ToasterSuccess, ToasterError, ToasterWarning } from "../common/toaster";
import { ToastContainer } from "react-toastify";
import ReactGoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import { config } from '../constants/config';
import { gapi } from 'gapi-script';



function Register() {
    let common = new CommonService();

    // const clientId = '505048236034-csm6okkntdi62hikvnk6q93sg4o0cm1j.apps.googleusercontent.com';
    const clientId = '247491786250-1b5ir565ngoevjuesutoe42hpio9doil.apps.googleusercontent.com';

    const userId = localStorage.getItem('user');
    useEffect(() => {
        if (userId) {
            navigate('/')
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        gapi.load("client:auth2", ()=>{
            gapi.auth2.init({clientId:clientId})
        })
    }, [])

    const [name, SetName] = useState("");
    const [email_or_phone, SetEmail_or_phone] = useState("");
    const [password, SetPassword] = useState("");
    const [cpassword, SetCPassword] = useState("");
    const navigate = useNavigate()
    function SubmitData(e) {
        e.preventDefault();


        if (!name || !email_or_phone || !password || !cpassword) {
            ToasterWarning('Please Enter Details')
            return
        }

        if (password != cpassword) {
            ToasterError('Not same password')
            return
        }
        const tempuserid = localStorage.getItem("tempid")
        const UserData = {
            name: name,
            email_or_phone: email_or_phone,
            password: password,
            cpassword: cpassword,
            register_by: "email",
            tempuserid
        };

        const UserRagister = `${urlConstant.User.UserRegister}`;
        common.httpPost(UserRagister, UserData).then((res) => {
            ToasterSuccess("Register Successfully");
            SetEmail_or_phone("");
            SetName("");
            SetPassword("");
            SetCPassword("")

            navigate('/Login')
        })
            .catch((error) => {
                ToasterError("Not Valid Details");
            });
    }

    
    const handleGoogleLogin = () => {
        window.gapi.load('auth2', async () => {
            const auth2 = await window.gapi.auth2.init({
                client_id: clientId,
            });
            auth2.signIn().then((response) => {
                const id_token = response.getAuthResponse().id_token;
                const GoogleLoginData = `${urlConstant.User.GoogleLogin}?access_token=${id_token}`;
                common.httpGet(GoogleLoginData).then((res) => {
                    console.log(res.data);
                if (res.data.user.name) {
                    ToasterSuccess('Login Successfully');
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('user', res.data.user.name);
                    localStorage.setItem('userEmail', res.data.user.email)
                    localStorage.setItem('type', res.data.user.type);
                    localStorage.setItem('user_id', res.data.user.id);
                    window.location.href = '/';
                } else {
                    ToasterError('Not Valid Details');
                }
                }).catch((error) => {
                    ToasterError('Not Valid Details');
                });
            });
        });
    };

    return (
        <div>

            {/* <Header /> */}
            <ToastContainer />

            <main className="main pages">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <a rel="nofollow"><i className="fi-rs-home mr-5" />Home</a>
                            <span /> Create an Account
                        </div>
                    </div>
                </div>
                <div className="page-content pt-15 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="heading_s1">
                                <h1 className="mb-5">Create an Account</h1>
                                <p>Your personal data will be used to support your experience throughout this website, to</p>
                                <p> manage access to your account, and for other purposes described in our privacy policy </p>
                                <p className="mb-30">Already have an account? <Link to="/Login">Login</Link></p>
                            </div>
                            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                                <div className="row">
                                    <div className="col-lg-6 col-md-8">
                                        <div className="login_wrap widget-taber-content background-white">
                                            <div className="padding_eight_all bg-white">
                                                {/* <form method="post"> */}
                                                <div className="form-group">
                                                    <input type="text" required name="Name" placeholder="Name" value={name} onChange={(e) => { SetName(e.target.value) }} />
                                                </div>
                                                <div className="form-group">
                                                    <input required type="password" name="password" placeholder="Password" value={password} onChange={(e) => { SetPassword(e.target.value) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-8">
                                        <div className="form-group">
                                            <input type="text" required name="email" placeholder="Email" value={email_or_phone} onChange={(e) => { SetEmail_or_phone(e.target.value) }} />
                                        </div>
                                        <div className="form-group">
                                            <input required type="password" name="password" placeholder="Confirm password" value={cpassword} onChange={(e) => { SetCPassword(e.target.value) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-8">
                                        <div className="login_wrap widget-taber-content background-white">
                                            <div className="login_footer form-group mb-50">
                                                <div className="chek-form">
                                                    <div className="custome-checkbox">
                                                        <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox12" defaultValue />
                                                        <label className="form-check-label" htmlFor="exampleCheckbox12"><span>I agree to terms &amp; Policy.</span></label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <p className="font-xs text-muted"><strong>Note:</strong>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p> */}
                                            {/* </form> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-8 mt-20">
                                        <div className="form-group mb-30" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div style={{ display: "flex" }}>
                                            <a href='#' onClick={handleGoogleLogin} className="btn btn-heading btn-block google-btn" name="google" style={{ backgroundColor: "#fff" }}><img src="../assets/imgs/theme/icons/logo-google.svg" alt="/" /></a>
                                            </div>
                                            <div>
                                                <button type="submit" style={{ borderRadius: "30px", float: "right" }} className="btn btn-fill-out btn-block hover-up font-weight-bold" onClick={SubmitData} name="login">Submit & Register</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* <Footer/> */}

        </div>
    )
}

export default Register
