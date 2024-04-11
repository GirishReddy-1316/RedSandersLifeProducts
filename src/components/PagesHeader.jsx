import "../styles/header.css";
import headerLogo from "../assets/headerlogo.png";
import wishlistIcon from "../assets/wishlist.svg";
import accountIcon from "../assets/account.svg";
import dropdown from "../assets/dd.svg";
import cartIcon from "../assets/cart2.svg";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";

function PagesHeader({ cartCount, wishCount, setCartVisible  }) {
  return (
    <div className="header-container">
    <header className="header">
      <Link to="/">
        <img src={headerLogo} alt="" className="header-logo" />
      </Link>
      <ul className="navigation">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all-products">Shop Now</Link>
        </li>
       
        <li className="pages">
          Company <img className="dd" src={dropdown} alt="dropdown icon" />
          <ul className="dropdown-content">
            <li>
              <Link to="/about">About HRHK</Link>
            </li>
            <li>
              <Link to="/wholesale">Wholesale</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/policies">Policies</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </li>
      </ul>

      <div className="head-icons-container">
        <Search />       
        <Link to="/account">
          {" "}
          <img
            src={accountIcon}
            alt="account-icon"
            className="account-icon head-icons"
          /><span className="icon-text">Login</span> {" "}
        </Link> 
        <Link to="/orders">
          {" "}
          <img
            src={accountIcon}
            alt="account-icon"
            className="account-icon head-icons"
          /><span className="icon-text">Orders</span> {" "}
        </Link> 
      </div>
    </header>
  </div>
  );
}

export default PagesHeader;
