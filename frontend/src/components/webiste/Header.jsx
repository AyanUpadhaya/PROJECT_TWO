import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { cartpic, logoblack, smalllogo } from "../../assets/getAssets";
import "./Header.css";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { cart, addToCart } = useCart();
  const location = useLocation();

  function isActive(path, location) {
    return path.includes(location.pathname) ? "active-color" : "";
  }
  return (
    <div className="bg-white shadow-sm">
      <div className="custom-container ">
        <Link to="/" className="nav-link ">
          <img src={logoblack} alt="The Buchhandlung" className="custom-logo" />
        </Link>

        {/* Navigation Links */}
        <ul className="custom-nav">
          <li>
            <Link
              to="/"
              className={`nav-link p-2 ${isActive(["/"], location)}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={`nav-link p-2 ${isActive(["/cart"], location)}`}
            >
              Cart{" "}
              {cart?.length > 0 && (
                <span className="custom-badge">{cart && cart?.length}</span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link p-2  ${isActive(["/about"], location)}`}
            >
              About
            </Link>
          </li>
        </ul>
        <ul className="auth-btn-container list-unstyled">
          {!isAuthenticated ? (
            <li className="nav-item">
              <Link to={"/login"} className="auth-btn">
                Login
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to={"/dashboard"}
                  className="btn btn-lg btn-dark"
                  aria-current="page"
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
