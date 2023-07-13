import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/index'
import axios from 'axios';
import Headphone from '../assets/imgs/theme/icons/icon-headphone.svg';

function Header({ Crat }) {
  const { UserName, AllCategory, Logo, GetCart, GetAllSearch, searchData, user_id } = useAppContext();

  const [hide, sethide] = useState('');
  const [toggle, settoggle] = useState("");
  const [toggleCategor, settoggleCategor] = useState(false)
  const data = toggleCategor == true ? "open" : "";
  const SignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("type");
    localStorage.removeItem("user_id");
    localStorage.removeItem("tempid");
    localStorage.removeItem("category");
    localStorage.removeItem("brand");
  }
  const productsData = searchData.products;
  const categoriesData = searchData.categories;

  const close = (key) => {
    sethide(key)
  }


  return (
    <div>
      <header className="header-area header-style-1 header-height-2 ">
        <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="header-wrap">
              <div className="logo logo-width-1">
                {/* <Link to="/"><img src="assets/imgs/theme/logo.svg" alt="logo" /></Link> */}
                <Link to="/"><img src={Logo} alt="logo" /></Link>
              </div>
              <div className="header-right">
                <div className="search-style-2">
                  <form className='search'>
                    <input type="text" placeholder="Search for items..." onChange={(e) => { GetAllSearch(e.target.value) || close(e.target.value) }} />

                  </form>
                  {/* <div className='search1' style={{ display: searchData == "" ? "none" : "" }}> */}
                  <div className='search1' style={{ display: hide == "" ? "none" : "" }}>
                    {
                      productsData?.slice(0, 5).map((item, i) => {
                        return (
                          <>
                            <a href={`/${item.slug}`}>
                              <div className='row' key={i}>
                                <div className='col-2'>
                                  <img src={item.thumbnail_img} width="60px" style={{ border: "1px solid black" }} ></img>
                                </div>
                                <div className='col-10'>
                                  <p style={{ letterSpacing: "1px" }}><a key={i} href={`/${item.slug}`}>{item.name}</a></p>
                                </div>
                              </div>
                            </a>
                          </>
                        )
                      })
                    }
                    {!productsData?.length ? <p>Not found data...</p> : ""}
                  </div>
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    <div className="header-action-icon-2">
                      {/*<Link to="/wishlist">
                        <img className="svgInject" alt="/" src="assets/imgs/theme/icons/Vector.svg" />
                        {
                          Wishlist == null ? " " : <span className="pro-count blue">{Wishlist}</span>
                        } 
                      </Link>*/}

                      {/* {
                        user_id == null ? <Link to="/login"><img className="svgInject" alt="/" src="assets/imgs/theme/icons/Vector.svg" /></Link> : <Link to="/wishlist"><img className="svgInject" alt="/" src="assets/imgs/theme/icons/Vector.svg" /></Link>
                      } */}


                      {
                        user_id == null ? <Link to="/login"><svg className='svg_icon' width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5 0.916992C16.3739 0.934507 15.2724 1.24885 14.3067 1.82826C13.341 2.40768 12.5453 3.23166 12 4.21699C11.4546 3.23166 10.6589 2.40768 9.6932 1.82826C8.7275 1.24885 7.62601 0.934507 6.49996 0.916992C4.7049 0.994983 3.01366 1.78025 1.79574 3.10122C0.577818 4.4222 -0.0677922 6.17152 -4.17093e-05 7.96699C-4.17093e-05 12.514 4.78596 17.48 8.79996 20.847C9.69618 21.6001 10.8293 22.013 12 22.013C13.1706 22.013 14.3037 21.6001 15.2 20.847C19.214 17.48 24 12.514 24 7.96699C24.0677 6.17152 23.4221 4.4222 22.2042 3.10122C20.9863 1.78025 19.295 0.994983 17.5 0.916992Z" fill="#A5A5A5" />
                        </svg>
                        </Link> :
                          <Link to="/wishlist"><svg className='svg_icon' width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 0.916992C16.3739 0.934507 15.2724 1.24885 14.3067 1.82826C13.341 2.40768 12.5453 3.23166 12 4.21699C11.4546 3.23166 10.6589 2.40768 9.6932 1.82826C8.7275 1.24885 7.62601 0.934507 6.49996 0.916992C4.7049 0.994983 3.01366 1.78025 1.79574 3.10122C0.577818 4.4222 -0.0677922 6.17152 -4.17093e-05 7.96699C-4.17093e-05 12.514 4.78596 17.48 8.79996 20.847C9.69618 21.6001 10.8293 22.013 12 22.013C13.1706 22.013 14.3037 21.6001 15.2 20.847C19.214 17.48 24 12.514 24 7.96699C24.0677 6.17152 23.4221 4.4222 22.2042 3.10122C20.9863 1.78025 19.295 0.994983 17.5 0.916992Z" fill="#A5A5A5" />
                          </svg>
                          </Link>
                      }
                    </div>

                    <div className="header-action-icon-2">
                      <Link to="/Cart">
                        {/* <img className="svgInject"  alt="/" src="assets/imgs/theme/icons/shopping-cart.svg" /> */}

                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='svg_icon'>
                          <g clip-path="url(#clip0_57_1591)">
                            <path d="M22.713 4.077C22.4317 3.73944 22.0796 3.46795 21.6815 3.28182C21.2835 3.09568 20.8494 2.99946 20.41 3H4.242L4.2 2.649C4.11405 1.91942 3.76339 1.24673 3.21449 0.758478C2.6656 0.270223 1.95663 0.000341793 1.222 0L1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2H1.222C1.46693 2.00003 1.70334 2.08996 1.88637 2.25272C2.06941 2.41547 2.18634 2.63975 2.215 2.883L3.591 14.583C3.73385 15.7998 4.31848 16.9218 5.23391 17.736C6.14934 18.5502 7.33186 19 8.557 19H19C19.2652 19 19.5196 18.8946 19.7071 18.7071C19.8946 18.5196 20 18.2652 20 18C20 17.7348 19.8946 17.4804 19.7071 17.2929C19.5196 17.1054 19.2652 17 19 17H8.557C7.93806 16.9983 7.3348 16.8051 6.82994 16.4471C6.32507 16.089 5.94331 15.5835 5.737 15H17.657C18.8293 15.0001 19.9643 14.5882 20.8638 13.8364C21.7633 13.0846 22.37 12.0407 22.578 10.887L23.363 6.533C23.4414 6.10101 23.4237 5.65707 23.3114 5.23264C23.1991 4.80821 22.9948 4.41368 22.713 4.077Z" fill="#A5A5A5" />
                            <path d="M7 24C8.10457 24 9 23.1046 9 22C9 20.8954 8.10457 20 7 20C5.89543 20 5 20.8954 5 22C5 23.1046 5.89543 24 7 24Z" fill="#A5A5A5" />
                            <path d="M17 24C18.1046 24 19 23.1046 19 22C19 20.8954 18.1046 20 17 20C15.8954 20 15 20.8954 15 22C15 23.1046 15.8954 24 17 24Z" fill="#A5A5A5" />
                          </g>
                          <defs>
                            <clipPath id="clip0_57_1591">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>


                        {/* {
                         // Crat == null ? <span className="pro-count blue">{GetCart.length}</span> : <span className="pro-count blue">{Crat}</span>
                        }  */}
                      </Link>
                    </div>
                    <div className="header-action-icon-2">
                      <Link to="/">
                        {/* <img className="svgInject" alt="/" src="assets/imgs/theme/icons/icon-compare.svg" /> */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path className='svg_icon1' d="M12 12C15.3137 12 18 9.31371 18 6C18 2.68629 15.3137 0 12 0C8.68629 0 6 2.68629 6 6C6 9.31371 8.68629 12 12 12Z" fill="#A5A5A5" />
                          <path className='svg_icon1' d="M12 14C7.03172 14.0055 3.00553 18.0317 3 23C3 23.5523 3.4477 24 3.99998 24H20C20.5522 24 21 23.5523 21 23C20.9945 18.0317 16.9683 14.0055 12 14Z" fill="#A5A5A5" />
                        </svg>

                      </Link>
                      <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">


                        {
                          UserName ?
                            <ul>
                              <li>
                                <Link to="/Dashboard"><i className="fi fi-rs-user mr-10" />My Account</Link>
                              </li>
                              <li onClick={SignOut}>
                                <a href="/"><i className="fi fi-rs-sign-in mr-10" />Sign out</a>
                              </li>
                            </ul> :

                            <ul>
                              <li>
                                <Link to="/Register"><i className="fi fi-rs-user mr-10" />Register</Link>
                              </li>
                              <li>
                                <Link to="/Login"><i className="fi-rs-sign-out mr-10" />Login</Link>
                              </li>
                            </ul>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom  header-bottom-bg-color sticky-bar">
          <div className='header-bottom-bg-color1'>
            <div className="container">
              <div className="header-wrap header-space-between position-relative">
                <div className="header-action-icon-2 d-block d-lg-none">
                  <div className="burger-icon burger-icon-white" onClick={(e) => { settoggle("sidebar-visible") }}>
                    <span className="burger-icon-top" />
                    <span className="burger-icon-mid" />
                    <span className="burger-icon-bottom" />
                  </div>
                </div>
                <div className="logo logo-width-1 d-block d-lg-none">
                  <Link to="/"><img src={Logo} alt="logo" /></Link>
                </div>
                <div className="main-categori-wrap d-none d-lg-block">
                  <a className="categories-button-active" onClick={(e) => { settoggleCategor(!toggleCategor) }}>
                    <span className="fi-rs-apps" /> <span className="et">Browse</span> All Categories
                    <i className="fi-rs-angle-down" />
                  </a>
                  <div className={`categories-dropdown-wrap categories-dropdown-active-large font-heading ${data}`}>
                    <div className="d-flex categori-dropdown-inner">
                      <ul>
                        {
                          AllCategory.map((item, i) => {
                            return (
                              <>
                                <li>
                                  <Link to="/ShopProduct">{item.name}</Link>
                                </li>
                              </>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="header-nav d-none d-lg-flex">
                  <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading">
                    <nav>
                      <ul className='nav nav-tabs links'>
                        <li className="nav-item">
                          <Link className="nav-link" to="/" >Home</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/ShopProduct" >Shop </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/ShopProduct">Offer</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/ShopProduct">Man’s Wear </Link>
                        </li>
                        {/* <li className="nav-item">
                          <Link className="nav-link" to="/ShopProduct">Women's Wear </Link>
                        </li> */}
                        <li className="nav-item">
                          <Link className="nav-link" to="/Contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/Terms-Service">Terms and conditions</Link>
                        </li>
                        {/* <li>
                          <Link to="/">Pages <i className="fi-rs-angle-down" /></Link>
                          <ul className="sub-menu">
                            <li><Link to="/Register">Register</Link></li>
                            <li><Link to="/Login">Login</Link></li>
                            <li><Link to="/ShopProduct">Shop Product</Link></li>
                            <li><Link to="/wishlist">wishlist</Link></li>
                            <li><Link to="/Cart">Cart</Link></li>
                            <li><Link to="/shop/girls-tops">Product</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Terms-Service">Terms Service</Link></li>
                            <li><Link to="/Checkout">Checkout</Link></li>
                            <li><Link to="/Contact">Contact</Link></li>
                            <li><Link to="/Privacy-Policy">Privacy Policy</Link></li>
                            <li><Link to="/*">404 Page</Link></li>
                          </ul>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="hotline d-none d-lg-flex">
                  <img src={Headphone} alt="hotline" />
                  <p className='d-flex flex-column align-items-center' style={{ rowGap: '5px' }}>79905-80921<span>24/7 Support Center</span></p>
                </div>
                <div className="header-action-right d-block d-lg-none">
                  <div className="header-action-2">
                    <div className="header-action-icon-2">
                      {
                        user_id == null ? <Link to="/login"><svg className='svg_icon' width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5 0.916992C16.3739 0.934507 15.2724 1.24885 14.3067 1.82826C13.341 2.40768 12.5453 3.23166 12 4.21699C11.4546 3.23166 10.6589 2.40768 9.6932 1.82826C8.7275 1.24885 7.62601 0.934507 6.49996 0.916992C4.7049 0.994983 3.01366 1.78025 1.79574 3.10122C0.577818 4.4222 -0.0677922 6.17152 -4.17093e-05 7.96699C-4.17093e-05 12.514 4.78596 17.48 8.79996 20.847C9.69618 21.6001 10.8293 22.013 12 22.013C13.1706 22.013 14.3037 21.6001 15.2 20.847C19.214 17.48 24 12.514 24 7.96699C24.0677 6.17152 23.4221 4.4222 22.2042 3.10122C20.9863 1.78025 19.295 0.994983 17.5 0.916992Z" fill="#A5A5A5" />
                        </svg>
                        </Link> :
                          <Link to="/wishlist"><svg className='svg_icon' width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 0.916992C16.3739 0.934507 15.2724 1.24885 14.3067 1.82826C13.341 2.40768 12.5453 3.23166 12 4.21699C11.4546 3.23166 10.6589 2.40768 9.6932 1.82826C8.7275 1.24885 7.62601 0.934507 6.49996 0.916992C4.7049 0.994983 3.01366 1.78025 1.79574 3.10122C0.577818 4.4222 -0.0677922 6.17152 -4.17093e-05 7.96699C-4.17093e-05 12.514 4.78596 17.48 8.79996 20.847C9.69618 21.6001 10.8293 22.013 12 22.013C13.1706 22.013 14.3037 21.6001 15.2 20.847C19.214 17.48 24 12.514 24 7.96699C24.0677 6.17152 23.4221 4.4222 22.2042 3.10122C20.9863 1.78025 19.295 0.994983 17.5 0.916992Z" fill="#A5A5A5" />
                          </svg>
                          </Link>
                      }
                    </div>
                    <div className="header-action-icon-2">
                      <Link to="/Cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='svg_icon'>
                          <g clip-path="url(#clip0_57_1591)">
                            <path d="M22.713 4.077C22.4317 3.73944 22.0796 3.46795 21.6815 3.28182C21.2835 3.09568 20.8494 2.99946 20.41 3H4.242L4.2 2.649C4.11405 1.91942 3.76339 1.24673 3.21449 0.758478C2.6656 0.270223 1.95663 0.000341793 1.222 0L1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2H1.222C1.46693 2.00003 1.70334 2.08996 1.88637 2.25272C2.06941 2.41547 2.18634 2.63975 2.215 2.883L3.591 14.583C3.73385 15.7998 4.31848 16.9218 5.23391 17.736C6.14934 18.5502 7.33186 19 8.557 19H19C19.2652 19 19.5196 18.8946 19.7071 18.7071C19.8946 18.5196 20 18.2652 20 18C20 17.7348 19.8946 17.4804 19.7071 17.2929C19.5196 17.1054 19.2652 17 19 17H8.557C7.93806 16.9983 7.3348 16.8051 6.82994 16.4471C6.32507 16.089 5.94331 15.5835 5.737 15H17.657C18.8293 15.0001 19.9643 14.5882 20.8638 13.8364C21.7633 13.0846 22.37 12.0407 22.578 10.887L23.363 6.533C23.4414 6.10101 23.4237 5.65707 23.3114 5.23264C23.1991 4.80821 22.9948 4.41368 22.713 4.077Z" fill="#A5A5A5" />
                            <path d="M7 24C8.10457 24 9 23.1046 9 22C9 20.8954 8.10457 20 7 20C5.89543 20 5 20.8954 5 22C5 23.1046 5.89543 24 7 24Z" fill="#A5A5A5" />
                            <path d="M17 24C18.1046 24 19 23.1046 19 22C19 20.8954 18.1046 20 17 20C15.8954 20 15 20.8954 15 22C15 23.1046 15.8954 24 17 24Z" fill="#A5A5A5" />
                          </g>
                          <defs>
                            <clipPath id="clip0_57_1591">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>





      <div className={`mobile-header-active mobile-header-wrapper-style ${toggle}`}>
        {/* <div className="mobile-header-active mobile-header-wrapper-style"> */}
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-top">
            <div className="mobile-header-logo">
              <Link to="/"><img src={Logo} alt="logo" /></Link>
            </div>
            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
              <button className="close-style search-close" onClick={(e) => { settoggle("") }}>
                {/* <button className="close-style search-close"> */}
                <i className="icon-top" />
                <i className="icon-bottom" />
              </button>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-3 mobile-header-border">
              <form action="#">
                <input type="text" placeholder="Search for items…" onChange={(e) => { GetAllSearch(e.target.value) || close(e.target.value) }} />
                <button><i className="fi-rs-search" /></button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              <nav>
                <ul className="mobile-menu font-heading">
                  <li className="nav-item">
                    <Link className="nav-link" to="/" >Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/ShopProduct" >Shop </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Offer</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Man’s ware </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Women's Wear </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Contact">Contact</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Terms-Service">Terms and conditions</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mobile-header-info-wrap">
              {
                UserName ? <>
                  <div className="single-mobile-header-info">
                    <Link to="/Dashboard"><i className="fi fi-rs-user mr-10" />My Account</Link>
                  </div>
                  <div className="single-mobile-header-info">
                    <a href='/'><i className="fi fi-rs-sign-in mr-10" />Sign out</a>
                  </div>
                </> :
                  <>
                    <div className="single-mobile-header-info">
                      <Link to="/Register"><i className="fi-rs-user" />Register</Link>
                    </div>
                    <div className="single-mobile-header-info">
                      <Link to="/Login"> <i className="fi-rs-sign-out mr-10" />Login</Link>
                    </div>
                  </>
              }

              <div className="single-mobile-header-info">
                <a href="#"><i className="fi-rs-headphones" />(+01) - 2345 - 6789 </a>
              </div>
            </div>
            <div className="mobile-social-icon mb-50">
              <h6 className="mb-15">Follow Us</h6>
              <a href="#"><img src="../assets/imgs/theme/icons/icon-facebook-white.svg" alt="/" /></a>
              <a href="#"><img src="../assets/imgs/theme/icons/icon-twitter-white.svg" alt="/" /></a>
              <a href="#"><img src="../assets/imgs/theme/icons/icon-instagram-white.svg" alt="/" /></a>
              <a href="#"><img src="../assets/imgs/theme/icons/icon-pinterest-white.svg" alt="/" /></a>
              <a href="#"><img src="../assets/imgs/theme/icons/icon-youtube-white.svg" alt="/" /></a>
            </div>
            <div className="site-copyright">Copyright 2021 © /. All rights reserved. Powered by ColeBrook.</div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Header