import React, { useEffect, useState } from 'react'
import serviceIcon from '../../service-icon.svg'
import Footer from '../Footer'
import Header from '../Header'
import { useAppContext } from '../../context/index'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlConstant from "../../constants/urlConstant";
import { ToasterError, ToasterWarning, ToasterSuccess } from "../../common/toaster";
import { ToastContainer } from "react-toastify";
import Loding from '../Loding';
import CommonService from "../../services/commonService";
import { useShippingContext } from '../../context/shippingContext';
import Select2 from "react-select2-wrapper";
import {config} from '../../constants/config'
import Moment from 'moment';


function Dashboard() {
    let common = new CommonService();
    const { UserName, user_id } = useAppContext();
    // const { TrackOrder } = useShippingContext();

    const navigate = useNavigate()
    const SignOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem("type");
        localStorage.removeItem("user_id");
        localStorage.removeItem("tempid");
        localStorage.removeItem("category");
        localStorage.removeItem("brand");
    }

    const [id, setId] = useState(0);
    const [addressId, setAddressId] = useState(0);
    const [name, SetName] = useState("");
    const [address, SetAddress] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, SetPhone] = useState("");
    const [password, SetPassword] = useState("");
    const [cpassword, SetCPassword] = useState("");
    const [CurrentPassword, SetCurrentPassword] = useState("");
    const [OrdersList, setOrdersList] = useState([]);
    const [TrackOrderData, setTrackOrder] = useState([]);
    const [TrackOrderDiv, setTrackOrderDiv] = useState('none');
    const [UserInfoList, setUserInfoList] = useState([]);
    const [userAddressesList, setUserAddressesList] = useState([]);
    const [userSupportTicketsList, setSupportTicketsList] = useState([]);
    const [TrackOrderId, setTrackOrderId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [ListStates, setListStates] = useState([]);
    const [ListCountries, setListCountries] = useState([]);
    const [ListCity, setListCity] = useState([]);
    const [state, Setstate] = useState(null);
    const [city, Setcity] = useState("");
    const [Country, SetCountry] = useState("");
    const [PostalCode, SetPostalcode] = useState("");
    // const [DefaultAdd, SetDefaultAddress] = useState("");
    
    function handleCountryChange(e) {
        SetCountry(e.target.value);
        StatesGet(e.target.value);
    };

    function handleStateChange(e) {
        Setstate(e.target.value);
        CityGet(e.target.value);
    };

    const handleCityChange = (e) => {
        Setcity(e.target.value);
    };

    function CountriesGet() {
        setIsLoading(true)
        const listOfCountry = [{
            id : '',
            text : "Select Country",
        }];
        const GetCountries = `${urlConstant.Checkout.Countries}`;
        common.httpGet(GetCountries).then(function (res) {
            const countryList = res.data.data;
            countryList.forEach(function countriesList(item, index){
                const myArray = {
                    id : item.id,
                    text : item.name,
                }
                listOfCountry.push(myArray);
            })
            setListCountries(listOfCountry);
            setIsLoading(false)
        })
            .catch(function (error) {
                // ToasterError("Error");
                setIsLoading(false)
            });
    }

    function CityGet(state_id = null) {
        if(state_id == null) {
            setIsLoading(false)
        }
        // setIsLoading(true)
        const Getcity = `${urlConstant.Checkout.city}/`+state_id;
        // const Getcity = `${urlConstant.Checkout.city}/${state}`;
        common.httpGet(Getcity).then(function (res) {
            let listOfCity = [{
                id : '',
                text : "Select City",
            }];
            const cityList = res.data.data;
            cityList.forEach(function citiesList(item, index){
                const myArray = {
                    id : item.id,
                    text : item.name,
                }
                listOfCity.push(myArray);
            })
            setListCity(listOfCity);
            // setIsLoading(false)
        }).catch(function (error) {
                // ToasterError("Error");
                // setIsLoading(false)
        });
    }

    function StatesGet(country_id = null) {
        if(country_id == null) {
            setIsLoading(false)
        }
        // setIsLoading(true)
        const StatesData = `${urlConstant.Checkout.States}/`+country_id;
        // const StatesData = `${urlConstant.Checkout.States}/${Country}`;
        common.httpGet(StatesData).then(function (res) {
            const listOfState = [{
                id : '',
                text : "Select State",
            }];
            const stateList = res.data.data;
            stateList.forEach(function statesList(item, index){
                const myArray = {
                    id : item.id,
                    text : item.name,
                }
                listOfState.push(myArray);
            })
            setListStates(listOfState);
            // setIsLoading(false)
        }).catch(function (error) {
                // ToasterError("Error");
                // setIsLoading(false)
        });
    }

    function GetOrdersList(P_Id) {
        try {
            setIsLoading(true)
            const Data = { user_id: parseInt(user_id) }
            const OrdersData = `${urlConstant.Dashboard.OrdersList}`;
            axios.post(OrdersData, Data, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
            }).then((res) => {
                setOrdersList(res.data.data.data);
                setIsLoading(false)
            })
        }
        catch (error) {
            ToasterError("Error")
            setIsLoading(false)
        }
    }

    function GetUserInfo() {
        const GetUserInfo1 = `${urlConstant.User.UserInfo}/${user_id}`;
        common.httpGet(GetUserInfo1).then(function (res) {
            setUserInfoList(res.data.data[0]);
        })
            .catch(function (error) {
                // ToasterWarning(error.message)
                console.log(error);
            });
    }

    function GetUserAddresses() {
        const GetUserAddresses = `${urlConstant.User.UserAddresses}/${user_id}`;
        common.httpGet(GetUserAddresses).then(function (res) {
            setUserAddressesList(res.data.data);
        }).catch(function (error) {
            // ToasterWarning(error.message)
            console.log(error);
        });
    }

    function GetsupportTickets() {
        const GetsupportTickets = `${urlConstant.User.GetTickets}/${user_id}`;
        common.httpGet(GetsupportTickets).then(function (res) {
            if (res.data.status != false) {
                setSupportTicketsList(res.data.data);
            }
        }).catch(function (error) {
            // ToasterWarning(error.message)
            console.log(error);
        });
    }

    // function editAddress(address_id) {
    const editAddress = async (address_id) => {
        setIsLoading(true)
        const GetAddress = `${urlConstant.User.UserUpdateAddresses}/`+address_id;
        await common.httpGet(GetAddress).then(function (res) {
            setAddressId(address_id);
            SetName(res.data.data.name);
            SetPhone(res.data.data.phone);
            SetAddress(res.data.data.address);
            SetCountry(res.data.data.country_id);
            SetPostalcode(res.data.data.postal_code);
            StatesGet(res.data.data.country_id);
            CityGet(res.data.data.state_id);
            setTimeout(() => {
                Setstate(res.data.data.state_id);
                Setcity(res.data.data.city_id);
                setIsLoading(false)
            }, 3000);
        }).catch(function (error) {
            // ToasterWarning(error.message)
            console.log(error);
        });
    }

    function deleteAddress(address_id) {
        try {
            setIsLoading(true)
            const Data = { id: address_id }
            const DeleteAddress1 = `${urlConstant.User.UserDeleteAddresses}`;
            axios.post(DeleteAddress1, Data, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
            }).then((res) => {
                setIsLoading(false)
                ToasterSuccess("Your address deleted successfully...!!");
                GetUserAddresses();
            })
        } catch (error) {
            setIsLoading(false)
        }
    }

    const AddAddress = async () => {
        if (!addressId || !name || !phone || !address || !Country || !state || !city || !PostalCode) {
            ToasterWarning('Please select or add the address')
            return
        }
        try {
            setIsLoading(true)
            const Data = { addressId, userId: user_id, name, phone, address, Country, state, city, PostalCode, phone }
            const AddAddress1 = `${urlConstant.User.UserAddAddresses}`;
            await axios.post(AddAddress1, Data, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
            }).then((res) => {
                setIsLoading(false)
                ToasterSuccess("Your address added successfully...!!");
                GetUserAddresses();
                setAddressId(0);
                SetName("");
                SetPhone("");
                SetAddress("");
                SetCountry("");
                SetPostalcode("");
                Setstate("");
                setListStates([]);
                Setcity("");
                setListCity([]);
            })
        } catch (error) {
            setIsLoading(false)
        }
    }

    const ProfileUpdate = async () => {
    // function ProfileUpdate() {
        if (password != cpassword) {
            ToasterError('Not same password')
            return
        }

        try {
            setIsLoading(true)
            const Data = { id: user_id, name, email, password, phone }
            const ProfileUpdate1 = `${urlConstant.User.UserUpdate}`;
           await axios.post(ProfileUpdate1, Data, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
            }).then((res) => {
                setIsLoading(false)
                ToasterSuccess("Your detail Updated...!!");
                setOrdersList(res.data.data.data);
            })
        }
        catch (error) {
            // ToasterError("Error")
            setIsLoading(false)
        }
    }

    function TrackOrder(awd_no) {
        const TrackOrder1 = `${urlConstant.ShippingApi.TrackOrder}`;
        console.log(awd_no);
        const Data = {
            "data": {
                "awb_number_list": awd_no,
                "access_token": config.access_token,
                "secret_key": config.secret_key
            }
        }
        axios.post(TrackOrder1, Data).then(function (res) {
            const setVal = '901234567109';
            // const trackArray = Object.values(res.data.data);
            console.log(res.data.data[setVal]);
        })
        // axios.post(GetPinCode1, Data).then(function (res) {
        //   const delhiveryArray = Object.values(res.data.data[PinCode].delhivery);
        //   setPinMessage(null);
        //   if (delhiveryArray[0] == 'Y' || delhiveryArray[1] == 'Y') {
        //     setPinMessage('This product is available for courier delivery at '+PinCode+' location.');
        //   } else if(delhiveryArray[0] == 'Y' || delhiveryArray[1] == 'N'){
        //     setPinMessage('This product is not available for cash on drlivary.');
        //   } else {
        //     setPinMessage('This product is not available for courier delivery.');
        //   } 
        //   console.log(delhiveryArray);
        // })
        .catch(function (error) {
          ToasterError("Error");
        });
    }

    function GetTrackOrder(awd_no) {
        try {
            setIsLoading(true)
            const Data = { user_id: parseInt(user_id), order_code:awd_no }
            const OrdersData = `${urlConstant.Dashboard.TrackOrderData}`;
            axios.post(OrdersData, Data, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
            }).then((res) => {
                console.log(res.data.data);
                setTrackOrderDiv('show');
                setTrackOrder(res.data.data);
                setIsLoading(false)
            })
        }
        catch (error) {
            ToasterError("Error")
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!user_id) {
            navigate('/')
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        GetOrdersList();
        CountriesGet();
        GetUserInfo();
        GetUserAddresses();
        GetsupportTickets();        
    }, [])
    return (
        <div>
            <Header />
            <ToastContainer />
            {isLoading ? <Loding /> : Dashboard}

            <main className="main pages">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <Link to="/" rel="nofollow"><i className="fi-rs-home mr-5" />Home</Link>
                            <span /> My Account
                        </div>
                    </div>
                </div>
                <div className="page-content pt-150 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="dashboard-menu">
                                            <ul className="nav flex-column" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" id="dashboard-tab" data-bs-toggle="tab" href="#dashboard" role="tab" aria-controls="dashboard" aria-selected="false"><i className="fi-rs-settings-sliders mr-10" />Dashboard</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="addresses-tab" data-bs-toggle="tab" href="#addresses" role="tab" aria-controls="addresses" aria-selected="false"><i className="fi-rs-marker mr-10" />My Addresses</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="orders-tab" data-bs-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="false"><i className="fi-rs-shopping-bag mr-10" />Orders</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="track-orders-tab" data-bs-toggle="tab" href="#track-orders" role="tab" aria-controls="track-orders" aria-selected="false"><i className="fi-rs-shopping-cart-check mr-10" />Track Your Order</a>
                                                </li>
                                                {/* <li className="nav-item">
                                                    <a className="nav-link" id="address-tab" data-bs-toggle="tab" href="#address" role="tab" aria-controls="address" aria-selected="true"><i className="fi-rs-marker mr-10" />My Address</a>
                                                </li> */}
                                                <li className="nav-item">
                                                    <a className="nav-link" id="account-detail-tab" data-bs-toggle="tab" href="#account-detail" role="tab" aria-controls="account-detail" aria-selected="true"><i className="fi-rs-user mr-10" />Account details</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="support-ticket-tab" data-bs-toggle="tab" href="#support-ticket" role="tab" aria-controls="support-ticket" aria-selected="true"><svg className='mr-10' width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_1_5)"> <path d="M17.5093 12.3392V11.2C17.5093 9.29045 16.7182 7.45909 15.3099 6.10883C13.9016 4.75857 11.9916 4 9.99998 4C8.00839 4 6.09834 4.75857 4.69009 6.10883C3.28181 7.45909 2.49066 9.29045 2.49066 11.2V12.3392C1.61553 12.7086 0.899343 13.3551 0.461982 14.1705C0.0246223 14.9858 -0.10736 15.9203 0.0881303 16.8178C0.283621 17.7153 0.794719 18.5211 1.53586 19.1004C2.277 19.6797 3.2032 19.9973 4.1594 20H5.82812V12H4.1594V11.2C4.1594 9.71477 4.77474 8.2904 5.87006 7.2402C6.96542 6.19 8.45099 5.6 9.99998 5.6C11.549 5.6 13.0346 6.19 14.1299 7.2402C15.2253 8.2904 15.8406 9.71477 15.8406 11.2V12H14.1718V18.4H10.8343V20H15.8406C16.7968 19.9973 17.723 19.6797 18.4641 19.1004C19.2053 18.5211 19.7164 17.7153 19.9119 16.8178C20.1074 15.9203 19.9754 14.9858 19.538 14.1705C19.1006 13.3551 18.3845 12.7086 17.5093 12.3392ZM4.1594 18.4C3.49553 18.4 2.85885 18.1471 2.38943 17.6971C1.92 17.247 1.65629 16.6365 1.65629 16C1.65629 15.3635 1.92 14.753 2.38943 14.3029C2.85885 13.8529 3.49553 13.6 4.1594 13.6V18.4ZM15.8406 18.4V13.6C16.5045 13.6 17.1411 13.8529 17.6106 14.3029C18.08 14.753 18.3437 15.3635 18.3437 16C18.3437 16.6365 18.08 17.247 17.6106 17.6971C17.1411 18.1471 16.5045 18.4 15.8406 18.4Z" fill="#7E7E7E" fill-opacity="0.6"/> </g> <defs> <clipPath id="clip0_1_5"> <rect width="20" height="24" fill="white"/> </clipPath> </defs> </svg>Support Tickets</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" onClick={SignOut} href="/"><i className="fi-rs-sign-out mr-10" />Logout</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="tab-content account dashboard-content pl-50">
                                            <div className="tab-pane fade active show" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Hello {name || UserInfoList.name}!</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>
                                                            From your account dashboard. you can easily check &amp; view your <a href="#">recent orders</a>,<br />
                                                            manage your <a href="#">shipping and billing addresses</a> and <a href="#">edit your password and account details.</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="addresses" role="tabpanel" aria-labelledby="addresses-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">My Address</h3>
                                                    </div>
                                                    <div className={userAddressesList.length == 0 ? 'addresses hideAddress' : 'addresses'}>
                                                        <div className="row product-grid-4">
                                                            {
                                                                userAddressesList.map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                                                                                <div className="product-cart-wrap userAddresses mb-40 mt-30 wow animate__animated animate__fadeIn" data-wow-delay=".1s">
                                                                                    <div className="product-content-wrap">
                                                                                        <div className="product-action-1 edit">
                                                                                            <a className="action-btn"><i className="fi-rs-pencil" onClick={(e) => {editAddress(item.id)}}/></a>
                                                                                        </div>
                                                                                        <div className="product-action-1 delete">
                                                                                            <a className="action-btn"><i className="fi-rs-trash" onClick={(e) => {deleteAddress(item.id)}}/></a>
                                                                                        </div>
                                                                                        <h2>{item.name}</h2>
                                                                                        <h3><b>{item.address}, {item.city_name}, {item.state_name}, {item.country_name} - {item.postal_code}</b></h3><br/>
                                                                                        <h3><b>Mobile: </b>{item.phone}</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <form method="post" name="address">
                                                        <div className="row">
                                                            <div className="form-group col-md-6">
                                                                <label>Full Name <span className="required">*</span></label>
                                                                <input required value={name} onChange={(e) => { SetName(e.target.value) }} className="form-control" name="name" type="text" />
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label>Phone <span className="required">*</span></label>
                                                                <input required value={phone} onChange={(e) => { SetPhone(e.target.value) }} className="form-control" name="phone" type="text" />
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <label>Address <span className="required">*</span></label>
                                                                <input required value={address} onChange={(e) => { SetAddress(e.target.value) }} className="form-control" name="address" type="text" />
                                                            </div>
                                                            <div className="form-group col-lg-6">
                                                                <div className="custom_select">
                                                                    <label>Country<span className="required">*</span></label>
                                                                    {
                                                                        <Select2 required placeholder="Select Country" name="country" className="form-control select-active" defaultValue={Country} data = {ListCountries} onChange={handleCountryChange}/>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-lg-6">
                                                                <div className="custom_select">
                                                                    <label>State<span className="required">*</span></label>
                                                                    {
                                                                        <Select2 required className="form-control select-active" name="state" defaultValue={state} data = {ListStates} onChange={handleStateChange}/>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-lg-6">
                                                                <div className="custom_select">
                                                                    <label>City<span className="required">*</span></label>
                                                                    {
                                                                        <Select2 required className="form-control select-active" name="city" defaultValue={city} data = {ListCity} onChange={handleCityChange}/>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label>Postal Code<span className="required">*</span></label>
                                                                <input required value={PostalCode} onChange={(e) => { SetPostalcode(e.target.value) }} className="form-control" name="dname" type="text"/>
                                                            </div>
                                                            {/* <div className="form-group">
                                                                <div className="checkbox">
                                                                    <div className="custome-checkbox">
                                                                        <input className="form-check-input" onChange={(e) => { SetDefaultAddress(e.target.value) }} type="checkbox" name="checkbox" id="setDefault" />
                                                                        <label className="form-check-label label_info" data-bs-toggle="collapse" aria-controls="collapsePassword" htmlFor="setDefault"><span>Is this your default address ?</span></label>
                                                                    </div>
                                                                </div>
                                                            </div> */}

                                                            <div className="col-md-12">
                                                                <button type="button" onClick={AddAddress} className="btn btn-fill-out submit font-weight-bold" >Save Change</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="support-ticket" role="tabpanel" aria-labelledby="support-ticket">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Support Ticket</h3>
                                                    </div>
                                                    <div className='card-body'>
                                                        <div className="table-responsive shopping-summery">
                                                            {
                                                                userSupportTicketsList.length <= 0 ?                                                                    
                                                                    <>
                                                                        <h2>Oops, no Support Tickets in your list</h2>
                                                                    </>
                                                                :
                                                                    <table className="table table-wishlist">
                                                                        <thead>
                                                                            <tr className="main-heading">
                                                                                <th className='start pl-30'>Order</th>
                                                                                <th>Date</th>
                                                                                <th>Status</th>
                                                                                <th>Subject</th>
                                                                                <th className='end'>Actions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                userSupportTicketsList.map((item, i) => {
                                                                                    return (
                                                                                        <>
                                                                                            <tr key={i}>
                                                                                                <td className='pl-30'>#{item.code}</td>
                                                                                                <td>{Moment(item.created_at).format('DD-MM-YYYY')}</td>
                                                                                                <td>{item.status}</td>
                                                                                                <td>{item.subject}</td>
                                                                                                <td><Link to={`/TicketsDetail?id=${item.id}`}>View</Link></td>
                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                            }
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Your Orders</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="table-responsive shopping-summery">
                                                            {
                                                                OrdersList == '' ?
                                                                    <>
                                                                        <h2>Oops, no Order in your list</h2>
                                                                    </>
                                                                :
                                                                    <table className="table table-wishlist">
                                                                        <thead>
                                                                            <tr className="main-heading">
                                                                                <th className='start pl-30'>Order</th>
                                                                                <th>Date</th>
                                                                                <th>Status</th>
                                                                                <th>Total</th>
                                                                                <th className='end'>Actions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                OrdersList.map((item, i) => {
                                                                                    return (
                                                                                        <>
                                                                                            <tr key={i}>
                                                                                                <td className='pl-30'>#{item.id}</td>
                                                                                                <td>{Moment(item.delivery_history_date).format('DD-MM-YYYY')}</td>
                                                                                                <td>{item.delivery_status}</td>
                                                                                                <td>₹{item.grand_total}</td>
                                                                                                <td><Link to={`/OrderDetail?id=${item.id}`}>View</Link></td>
                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="track-orders" role="tabpanel" aria-labelledby="track-orders-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Orders tracking</h3>
                                                    </div>
                                                    <div className="card-body contact-from-area">
                                                        <p>To track your order please enter your OrderID in the box below and press "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <div className="contact-form-style mt-30 mb-50">
                                                                    <div className="input-style mb-20">
                                                                        <label>Order ID</label>
                                                                        <input name="order-id" placeholder="Found in your order confirmation" type="text" value={TrackOrderId} onChange={(e)=>{setTrackOrderId(e.target.value)}} />
                                                                    </div>
                                                                    <button className="submit submit-auto-width" onClick={(e)=>{GetTrackOrder(TrackOrderId)}}>Track</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    TrackOrderDiv == 'show' ?
                                                    <>
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h3 className="mb-0">Your Orders</h3>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="table-responsive shopping-summery">
                                                                    {
                                                                        TrackOrderData.length == 0 ?
                                                                            <>
                                                                                <h2>Oops, no Order in your list</h2>
                                                                            </>
                                                                        :
                                                                            <table className="table table-wishlist">
                                                                                <thead>
                                                                                    <tr className="main-heading">
                                                                                        <th className='start pl-30'>Order Id</th>
                                                                                        <th>Delivery Status</th>
                                                                                        <th>Order Date</th>
                                                                                        <th>Delivery Date</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td className='pl-30'>#{TrackOrderData.code}</td>
                                                                                        <td>{TrackOrderData.delivery_status}</td>
                                                                                        <td>{TrackOrderData.date}</td>
                                                                                        <td>{TrackOrderData.delivery_date}</td>
                                                                                    </tr>
                                                                                                
                                                                                </tbody>
                                                                            </table>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </>: null
                                                    }
                                            </div>
                                            <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="card mb-3 mb-lg-0">
                                                            <div className="card-header">
                                                                <h3 className="mb-0">Billing Address</h3>
                                                            </div>
                                                            <div className="card-body">
                                                                <address>
                                                                    3522 Interstate<br />
                                                                    75 Business Spur,<br />
                                                                    Sault Ste. <br />Marie, MI 49783
                                                                </address>
                                                                <p>New York</p>
                                                                <a href="#" className="btn-small">Edit</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h5 className="mb-0">Shipping Address</h5>
                                                            </div>
                                                            <div className="card-body">
                                                                <address>
                                                                    4299 Express Lane<br />
                                                                    Sarasota, <br />FL 34249 USA <br />Phone: 1.941.227.4444
                                                                </address>
                                                                <p>Sarasota</p>
                                                                <a href="#" className="btn-small">Edit</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="account-detail" role="tabpanel" aria-labelledby="account-detail-tab">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>Account Details</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <form method="post" name="enq">
                                                            <div className="row">
                                                                <div className="form-group col-md-12">
                                                                    <label>Name <span className="required">*</span></label>
                                                                    <input required value={name || UserInfoList.name} onChange={(e) => { SetName(e.target.value) }} className="form-control" name="name" type="text" />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>Email Address <span className="required">*</span></label>
                                                                    <input required value={email || UserInfoList.email} onChange={(e) => { SetEmail(e.target.value) }} className="form-control" name="email" type="email" />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>Phone<span className="required">*</span></label>
                                                                    <input required value={phone || UserInfoList.phone} onChange={(e) => { SetPhone(e.target.value) }} className="form-control" name="dname" type="text" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="checkbox">
                                                                        <div className="custome-checkbox">
                                                                            <input className="form-check-input" type="checkbox" name="checkbox" id="createaccount" />
                                                                            <label className="form-check-label label_info" data-bs-toggle="collapse" href="#collapsePassword" data-target="#collapsePassword" aria-controls="collapsePassword" htmlFor="createaccount"><span>change your password ?</span></label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div id="collapsePassword" className="form-group create-account collapse in">
                                                                    <div className="form-group col-md-12">
                                                                        <label>Current Password <span className="required">*</span></label>
                                                                        <input required className="form-control" name="password" type="password" />
                                                                    </div>
                                                                    <div className="form-group col-md-12">
                                                                        <label>New Password <span className="required">*</span></label>
                                                                        <input required className="form-control" name="npassword" type="password" value={password} onChange={(e) => { SetPassword(e.target.value) }} />
                                                                    </div>
                                                                    <div className="form-group col-md-12">
                                                                        <label>Confirm Password <span className="required">*</span></label>
                                                                        <input required className="form-control" name="cpassword" type="password" value={cpassword} onChange={(e) => { SetCPassword(e.target.value) }} />
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <button type="button" onClick={ProfileUpdate} className="btn btn-fill-out submit font-weight-bold" >Save Change</button>
                                                                </div>
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
                    </div>
                </div>
            </main>


            <Footer />
        </div>
    )
}

export default Dashboard