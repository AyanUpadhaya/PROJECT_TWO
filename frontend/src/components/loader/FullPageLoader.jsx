import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FullPageLoader.css"; // Custom CSS for loader

const FullPageLoader = () => {
  return (
    <div className="full-page-loader d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default FullPageLoader;
