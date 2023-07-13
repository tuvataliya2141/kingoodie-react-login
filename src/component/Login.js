import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import CommonService from "../services/commonService";
import { ToasterSuccess, ToasterError, ToasterWarning } from "../common/toaster";
import urlConstant from "../constants/urlConstant";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { config } from '../constants/config';
import { gapi } from 'gapi-script';

function Login() {
    const navigate = useNavigate()
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState("");
    // const clientId = '505048236034-csm6okkntdi62hikvnk6q93sg4o0cm1j.apps.googleusercontent.com';
    const clientId = '247491786250-1b5ir565ngoevjuesutoe42hpio9doil.apps.googleusercontent.com';

    const userId = localStorage.getItem('user')
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

    let common = new CommonService();
    const SubmitHandler = async (e) => {
        e.preventDefault();
        const tempuserid = localStorage.getItem("tempid")
        const data = { email, password,tempuserid };

        if (!email || !password) {
            ToasterWarning('Please enter all the details')
            return
        }
       
        const LoginData = `${urlConstant.User.UserLogin}`;
        await common.httpPost(LoginData, data).then((res) => {
            if (res) {
                ToasterSuccess("Login Successfully");
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('user', res.data.user.name)
                localStorage.setItem('userEmail', res.data.user.email)
                localStorage.setItem('type', res.data.user.type)
                localStorage.setItem('user_id', res.data.user.id)

                window.location.href = window.location.href
            } else {
                ToasterError("Not Valid Details");
            }
        }).catch((error) => {
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

    // const handleFacebookResponse = (response) => {
    //     console.log("FACEBOOK:- ", response);
    //     const { accessToken, userID } = response;
    //     const data = {
    //         accessToken,
    //         userID,
    //     };
    //     const FacebookLoginData = `${urlConstant.User.FacebookLogin}?access_token=${accessToken}`;
    //     common.httpPost(FacebookLoginData, data).then((res) => {
    //         if (res) {
    //             localStorage.setItem('access_token', res.data.access_token);
    //             localStorage.setItem('user', res.data.user.name);
                // localStorage.setItem('userEmail', res.data.user.email)
    //             localStorage.setItem('type', res.data.user.type);
    //             localStorage.setItem('user_id', res.data.user.id);
    //             ToasterSuccess('Login Successfully');
    //             window.location.href = window.location.href;
    //         } else {
    //             ToasterError('Not Valid Details');
    //         }
    //         })
    //         .catch((error) => {
    //         ToasterError('Not Valid Details');
    //     });
    // };

    return (
        <div>
            <ToastContainer />
            <Header />
            <main className="main pages">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <a href="#" rel="nofollow"><i className="fi-rs-home mr-5" />Home</a>
                            <span /> Login
                        </div>
                    </div>
                </div>
                <div className="page-content pt-150 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                                <div className="row">
                                    <div className="col-lg-6 pr-30 d-none d-lg-block">
                                        <img className="border-radius-15" src="../assets/imgs/page/login-1.png" alt="/" />
                                    </div>
                                    <div className="col-lg-6 col-md-8">
                                        <div className="login_wrap widget-taber-content background-white">
                                            <div className="padding_eight_all bg-white">
                                                <div className="heading_s1">
                                                    <h1 className="mb-5">Login</h1>
                                                    <p className="mb-30">Don't have an account? <Link to="/Register">Create here</Link></p>
                                                </div>
                                                <form>
                                                    <div className="form-group">
                                                        <input type="text" required name="email" placeholder="Username or Email *" value={email || ""} onChange={(e) => { SetEmail(e.target.value) }} />
                                                    </div>
                                                    <div className="form-group">
                                                        <input required type="password" name="password" placeholder="Your password *" value={password || ""} onChange={(e) => { SetPassword(e.target.value) }} />
                                                    </div>

                                                    <div className="login_footer form-group mb-50">
                                                        <div className="chek-form">
                                                            <div className="custome-checkbox">
                                                                <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox1" defaultValue />
                                                                <label className="form-check-label" htmlFor="exampleCheckbox1"><span>Remember me</span></label>
                                                            </div>
                                                        </div>
                                                        <a className="text-muted" href="#">Forgot password?</a>
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" style={{ borderRadius: "30px",backgroundColor:"#222325" }} className="btn btn-heading btn-block hover-up" name="login" onClick={SubmitHandler}>Log in</button>
                                                        <span style={{ float: "right", display: "flex" }}>
                                                            {/* <a href='login/facebook' className="btn btn-heading btn-block fb-btn" name="fb" style={{ backgroundColor: "#1877f2" }}><img src="../assets/imgs/theme/icons/logo-facebook.svg" alt="/" /></a> */}
                                                            <a href='#' onClick={handleGoogleLogin} className="btn btn-heading btn-block google-btn" name="google" style={{ backgroundColor: "#fff" }}><img src="../assets/imgs/theme/icons/logo-google.svg" alt="/" /></a>
                                                        </span>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            `<script src="https://apis.google.com/js/platform.js" async defer></script>`
            `<script src="https://connect.facebook.net/en_US/sdk.js"></script>`
            <Footer />
        </div>
    )
}

export default Login
