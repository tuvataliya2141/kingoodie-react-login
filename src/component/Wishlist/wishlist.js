import React, { useState, useEffect } from "react";
import Footer from '../Footer'
import Header from '../Header'
import CommonService from "../../services/commonService";
import urlConstant from "../../constants/urlConstant";
import { ToasterWarning } from "../../common/toaster";
import { ToastContainer } from "react-toastify";
import { useAppContext } from '../../context/index';
import swal from 'sweetalert'
import Pagination from "../Pagination";
import { Link, useNavigate } from 'react-router-dom';



function Wishlist() {
    const navigate = useNavigate()
    let common = new CommonService();
    const { user_id, Loding, CartPost } = useAppContext();

    const [List, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = List.slice(firstPostIndex, lastPostIndex);

    function GetWishlist() {
        setIsLoading(true)
        const GetAllWishlist = `${urlConstant.Wishlist.GetAllWishlist}/${user_id}`;
        common.httpGet(GetAllWishlist).then(function (res) {
            setList(res.data.data);
            setIsLoading(false)
        })
            .catch(function (error) {
                setIsLoading(false)
            });
    }


    const deletehandler = async (id) => {

        swal({
            title: 'Are You Sure Delete Data?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setIsLoading(true)
                const deleteWishlist = `${urlConstant.Wishlist.DeleteWishlist}?product_id=${id}&user_id=${user_id}`;
                common.httpGet(deleteWishlist).then((res) => {
                    GetWishlist();
                    setIsLoading(false);
                });
            }
            else {
                ToasterWarning("Your Data Safe...!!");
                setIsLoading(false);
            }
        })

    };

    const WishlistLength = List.length
    useEffect(() => {
        if (!user_id) {
            navigate('/')
        }
        GetWishlist();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    return (
        <div>
            {isLoading ? <Loding /> : Wishlist}
            <ToastContainer />
            <Header />
            <main className="main">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <a rel="nofollow"><i className="fi-rs-home mr-5" />Home</a>
                            <span /> wishlist
                        </div>
                    </div>
                </div>

                <div className="mb-30 mt-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 m-auto">
                                <div className="mb-50">
                                    <h1 className="heading-2 mb-10">Your Wishlist</h1>
                                    <h6 className="text-body">There are <span className="text-brand">{List.length}</span> products in this list</h6>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-40" style={{ textAlign: "end" }}>
                                        <a href="/" className="btn btn-fill-out btn-block mt-30"><i className="fi-rs-arrow-left mr-10" />  Continue Shopping</a>
                                    </div>
                                </div>
                                <div className="table-responsive shopping-summery">
                                    <table className="table table-wishlist">
                                        <thead>
                                            <tr className="main-heading">
                                                <th className="custome-checkbox start pl-30">
                                                    {/* <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox11" defaultValue />
                        <label className="form-check-label" htmlFor="exampleCheckbox11" /> */}
                                                </th>
                                                <th scope="col" colSpan={2}>Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Stock Status</th>
                                                <th scope="col">Action</th>
                                                <th scope="col" className="end">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {

                                                List == '' ? <h1 style={{ textAlign: "center" }}>Oops, no product in your list</h1> :
                                                    currentPosts.map((item, i) => {

                                                        const { name, thumbnail_image, base_price, rating, id, InStock, variant,slug } = item.product;

                                                        const iamge = thumbnail_image == '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu9zuWJ0xU19Mgk0dNFnl2KIc8E9Ch0zhfCg&usqp=CAU' : thumbnail_image;

                                                        return (
                                                            <tr className="pt-30">
                                                                <td className="custome-checkbox pl-30">
                                                                    {/* <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox1" defaultValue />
                                    <label className="form-check-label" htmlFor="exampleCheckbox1" /> */}
                                                                </td>
                                                                <td className="image product-thumbnail pt-40"><img src={iamge} alt={iamge} /></td>
                                                                <td className="product-des product-name">
                                                                    <h6>{name}</h6>
                                                                    <div className="product-rate-cover">
                                                                        <div className="product-rate d-inline-block">
                                                                            <div className="product-rating" style={{ width: '90%' }} />
                                                                        </div>
                                                                        <span className="font-small ml-5 text-muted">{(rating)}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="price" data-title="Price">
                                                                    <h3 className="text-brand">{base_price}</h3>
                                                                </td>
                                                                <td className="text-center detail-info" data-title="Stock">
                                                                    {
                                                                        InStock == 0 ? <span className="stock-status out-stock">Out of stock</span> :
                                                                            <span className="stock-status in-stock mb-0"> In Stock</span>
                                                                    }
                                                                </td>
                                                                <td className="text-right" data-title="Cart">
                                                                    {
                                                                        InStock == 0 ? <Link to="/Contact"><button className="btn btn-sm" >Contact Us</button></Link> :
                                                                        <Link to={`/${slug}`}><button className="btn btn-sm">Add to cart</button></Link>
                                                                            // <button className="btn btn-sm" onClick={() => { CartPost(id, variant) }} >Add to cart</button>
                                                                    }
                                                                </td>
                                                                <td className="action text-center" data-title="Remove" onClick={() => deletehandler(id)}>
                                                                    <a className="text-body"><i style={{ fontSize: "28px" }} className="fi-rs-cross-circle" /></a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                            }



                                        </tbody>
                                    </table>
                                    <hr/>
                                    <div className="cart-action d-flex justify-content-between">
                                    <Pagination
                                        totalPosts={List.length}
                                        postsPerPage={postsPerPage}
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                    />
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

export default Wishlist