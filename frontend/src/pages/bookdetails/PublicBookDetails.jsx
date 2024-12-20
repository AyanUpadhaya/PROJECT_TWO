import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackToPrev from "../../components/dashboard/shared/BackToPrev";
import useCart from "../../hooks/useCart";
import FullPageLoader from "../../components/loader/FullPageLoader";

const PublicBookDetails = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/books/${book_id}`);
        setBook(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [book_id]);

  if (loading) return <FullPageLoader></FullPageLoader>; // Show loading state
  if (error) return <p style={{ color: "red" }}>{error}</p>; // Show error state

  return (
    <div className="container mt-4 ">
      <BackToPrev className={"mb-2"} path={"/"} title={"Back"}></BackToPrev>

      <div className="row">
        <div className="col-md-4">
          <img
            src={book?.cover_photo}
            className="img-fluid rounded-start"
            alt={book?.title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{book?.title}</h5>
            <br />
            <div>
              <button
                disabled={cart.includes(book._id)}
                onClick={() => addToCart(book._id)}
                className="btn btn-success custom-bg"
              >
                {cart.includes(book._id) ? "Added to Cart" : "Add to Cart "}
              </button>
            </div>
            <p className="card-text">
              <strong>Author:</strong> {book?.author}
            </p>
            <p className="card-text">
              <strong>Category:</strong> {book?.category_id?.name || "N/A"}
            </p>

            <p className="card-text">
              <strong>Price:</strong> €{book?.price}
            </p>
            <p className="card-text">
              <strong>Sell Price:</strong> €{book?.sell_price}
            </p>
            <p className="card-text">
              <strong>Quantity:</strong> {book?.qty}
            </p>
            <p className="card-text">
              <strong>Language:</strong> {book?.language}
            </p>
            <p className="card-text">
              <strong>Published Date:</strong>{" "}
              {book?.published_date
                ? new Date(book?.published_date).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="card-text">
              <strong>Tags:</strong> {book?.tags?.join(", ")}
            </p>
            <p className="card-text">
              <strong>About:</strong> {book?.about}
            </p>
            <p className="card-text">
              <small className="text-muted">
                Created on {new Date(book?.createdAt).toLocaleDateString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicBookDetails;
