import Error from "./component/404error";
import BestSellers from "./component/BestSellers/BestSellers";
import Cart from "./component/Cart/Cart";
import Checkout from "./component/Checkout/Checkout";
import Contact from "./component/Contact/Contact";
import Dashboard from "./component/Dashboard/Dashboard";
import Home from "./component/Home/Home";
import Login from "./component/Login";
import PrivacyPolicy from "./component/Privacy-policy/PrivacyPolicy";
import Product from "./component/Product/Product";
import Register from "./component/Register";
import ShopProduct from "./component/Shop-product/ShopProduct";
import ShopProductCategory from "./component/Shop-product/ShopProductCategory";
import Terms_Service from "./component/Terms-Service/Terms_Service";
import RefundPolicy from "./component/RefundPolicy/RefundPolicy";
import ReturnExchangePolicy from "./component/ReturnExchangePolicy/ReturnExchangePolicy";
import ShippingDelivery from "./component/ShippingDelivery/ShippingDelivery";
import Wishlist from "./component/Wishlist/wishlist";
import OrderDetail from "./component/OrderDetail/OrderDetail";
import TicketsDetail from "./component/TicketsDetail/TicketsDetail";


export default  [
  {
    path:'/',
    element:() => <Home />,
    exact:true,
  },
  {
    path:'/ShopProduct',
    element:() => <ShopProduct/>,
    exact:true,
  },
  {
    path:'/ShopProduct/:name',
    element:() => <ShopProductCategory/>,
    exact:true,
  },
  {
    path:'/:id',
    element:() => <Product/>,
    exact:true,
  },
  {
    path:'/wishlist',
    element:() => <Wishlist/>,
    exact:true,
  },
  {
    path:'/Cart',
    element:() => <Cart/>,
    exact:true,
  },
  {
    path:'/Checkout',
    element:() => <Checkout/>,
    exact:true,
  },
  {
    path:'/Register',
    element:() => <Register/>,
    exact:true,
  },
  {
    path:'/Login',
    element:() => <Login/>,
    exact:true,
  },
  {
    path:'/Contact',
    element:() => <Contact/>,
    exact:true,
  },
  {
    path:'/Privacy-Policy',
    element:() => <PrivacyPolicy/>,
    exact:true,
  },
  {
    path:'/Terms-Service',
    element:() => <Terms_Service/>,
    exact:true,
  },
  {
    path:'/Refund-Policy',
    element:() => <RefundPolicy/>,
    exact:true,
  },
  {
    path:'/Return-Exchange-Policy',
    element:() => <ReturnExchangePolicy/>,
    exact:true,
  },
  {
    path:'/Shipping-Delivery',
    element:() => <ShippingDelivery/>,
    exact:true,
  },
  {
    path:'/Dashboard',
    element:() => <Dashboard/>,
    exact:true,
  },
  {
    path:'*',
    element:() => <Error/>,
    exact:true,
  },  
  {
    path:'/OrderDetail',
    element:() => <OrderDetail/>,
    exact:true,
  },  
  {
    path:'/TicketsDetail',
    element:() => <TicketsDetail/>,
    exact:true,
  }

]

