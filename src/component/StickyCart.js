import React from "react";
import { useAppContext } from "../context";
import { Link } from "react-router-dom";

const StickyCart = () => {
  const { totalCount } = useAppContext();
  return (
    <div className="productList">
      <h4>There are {totalCount.length} products in your cart.</h4>
      <div className="footer-button">
        <Link to={"/Checkout"}>
          <button className="btn btn-sm">CheckOut</button>
        </Link>
        <Link to={"/Cart"}>
          <button className="btn btn-sm">Add to cart</button>
        </Link>
      </div>
    </div>
  );
};

export default StickyCart;
