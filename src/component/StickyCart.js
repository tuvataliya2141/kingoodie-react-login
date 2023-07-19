import React from "react";
import { useAppContext } from "../context";
import { Link } from "react-router-dom";

const StickyCart = () => {
  const { totalCount } = useAppContext();
  return (
    <div className="productList">
      <h4>There are <span>{totalCount.length}</span> products in your cart.</h4>
      <div className="footer-button">
        <Link to={"/Checkout"}>
          <button className="btn btn-xs">CheckOut</button>
        </Link>
        <Link to={"/Cart"}>
          <button className="btn btn-xs">Go to cart</button>
        </Link>
      </div>
    </div>
  );
};

export default StickyCart;
