import "../styles/header.css";
import headerLogo from "../assets/headerlogo.png";
import wishlistIcon from "../assets/wishlist.svg";
import accountIcon from "../assets/account.svg";
import dropdown from "../assets/dd.svg";
import cartIcon from "../assets/cart2.svg";
import cartAdd from "../assets/cart.svg";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from "../redux/action/authActions.js";

function Header({ cartCount, wishCount, setCartVisible }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userInfo);
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLogin);


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
                <Link to="/about">About JiYaBa</Link>
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

          {!isLogin ? <Link to="/account">
            {" "}
            <img
              src={accountIcon}
              alt="account-icon"
              className="account-icon head-icons"
            /> {" "} <strong style={{ color: "white" }}>Login</strong>
          </Link> : (
            <>
              <Link to={"/user-profile"}>
                <img
                  src={accountIcon}
                  alt="account-icon"
                  className="account-icon head-icons"
                /> <strong style={{ color: "white" }}>Profile</strong>
                {" "}
              </Link>
              <Link to="/orders">
                {" "}
                <img
                  src={cartIcon}
                  alt="account-icon"
                  className="account-icon head-icons"
                />{" "}
              </Link>
            </>
          )
          }
          <span className="wishlist-icon-container">
            <Link to="/wishlist">
              {" "}
              <img
                src={wishlistIcon}
                alt="wishlist-icon"
                className="wishlist-icon head-icons"
              />{" "}
            </Link>
            {wishCount > 0 && (
              <span className="wishlist-counter">{wishCount}</span>
            )}
          </span>
          <span className="cart-icon-container">
            <img
              onClick={() => setCartVisible((preview) => !preview)}
              src={cartAdd}
              alt="cart-icon"
              className="cart-icon head-icons"
            />
            {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
          </span>
        </div>
      </header>
    </div>
  );
}

export default Header;
