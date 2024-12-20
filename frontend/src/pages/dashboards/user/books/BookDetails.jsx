import React from "react";
import { useLocation } from "react-router-dom";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";

const BookDetails = () => {
  const { state } = useLocation();
  const { payload, type } = state || {};

  return (
    <div className="container mt-4 ">
      <BackToPrev
        className={"mb-2"}
        path={"/dashboard/user/books"}
        title={"Back"}
      ></BackToPrev>
      <div className="row">
        <div className="col-md-4">
          <img
            src={payload?.cover_photo}
            className="img-fluid rounded-start"
            alt={payload?.title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{payload?.title}</h5>
            <br />
            <p className="card-text">
              <strong>Author:</strong> {payload?.author}
            </p>
            <p className="card-text">
              <strong>Category:</strong> {payload?.category_id?.name || "N/A"}
            </p>

            <p className="card-text">
              <strong>Price:</strong> ${payload?.price}
            </p>
            <p className="card-text">
              <strong>Sell Price:</strong> ${payload?.sell_price}
            </p>
            <p className="card-text">
              <strong>Quantity:</strong> {payload?.qty}
            </p>
            <p className="card-text">
              <strong>Language:</strong> {payload?.language}
            </p>
            <p className="card-text">
              <strong>Published Date:</strong>{" "}
              {payload?.published_date
                ? new Date(payload?.published_date).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="card-text">
              <strong>Tags:</strong> {payload?.tags?.join(", ")}
            </p>
            <p className="card-text">
              <strong>About:</strong> {payload?.about}
            </p>
            <p className="card-text">
              <small className="text-muted">
                Created on {new Date(payload?.createdAt).toLocaleDateString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
