import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { cartpic, smalllogo } from "../../assets/getAssets";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { cart, addToCart } = useCart();
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-success shadow-lg "
        data-bs-theme="dark"
      >
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            <img src={smalllogo} className="img-fluid" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav  mb-2 ms-auto mb-lg-0 d-flex gap-3">
              <div>
                {!isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link
                        to={"login"}
                        className="btn btn-lg btn-secondary text-white"
                        aria-current="page"
                      >
                        Login
                      </Link>
                    </li>
                  </>
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
              </div>

              <div className="position-relative ms-auto">
                <Link
                  to={"cart"}
                  className="btn btn-lg btn-light"
                  aria-current="page"
                >
                  <img src={cartpic} alt="" />
                  <span className="text-dark">{cart && cart?.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
