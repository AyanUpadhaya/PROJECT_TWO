import React from "react";
import { Link } from "react-router-dom";

const BackToPrev = ({ path, className, title }) => {
  return (
    <Link
      to={path}
      className={`d-flex align-items-center gap-2 text-decoration-none btn btn-dark text-white max-w-max mb-5`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          d="M11.0782 21.3484C11.5332 20.8934 11.5332 20.1584 11.0782 19.7034L6.56323 15.1651H24.2616C24.9032 15.1651 25.4282 14.6401 25.4282 13.9984C25.4282 13.3568 24.9032 12.8318 24.2616 12.8318H6.56323L11.0899 8.3051C11.5449 7.8501 11.5449 7.1151 11.0899 6.6601C10.6349 6.2051 9.8999 6.2051 9.4449 6.6601L2.91156 13.1818C2.45656 13.6368 2.45656 14.3718 2.91156 14.8268L9.43323 21.3484C9.88823 21.7918 10.6349 21.7918 11.0782 21.3484Z"
          fill="#fff"
        />
      </svg>
      <span className={`fw-bold text-white text-lg`}>{title}</span>
    </Link>
  );
};

export default BackToPrev;
