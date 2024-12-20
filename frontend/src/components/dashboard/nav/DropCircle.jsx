import React from "react";
import { userImage } from "../../../assets/getAssets";
import { Link } from "react-router-dom";
import Logout from "../icons/Logout";

const DropCircle = ({ user, logout }) => {
  return (
    <div className="dropdown">
      <button
        className="user-dropdown"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img className="user-imaage" src={userImage} alt="" />
      </button>
      <ul className="dropdown-menu me-5 " style={{ width: "200px" }}>
        <li>
          <div className="dropdown-item text-dark" href="#">
            <Link
              to={`/dashboard/${user?.role}/profile`}
              className={`btn btn-secondary w-full`}
              aria-current="page"
            >
              Profile
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <button onClick={() => logout()} className="btn btn-danger w-full">
              <Logout />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DropCircle;
