import React, { useState } from "react";
import TrashIcon from "../../components/dashboard/icons/TrashIcon";

const BookRow = ({ book, onQuantityChange, handleRemoveBook }) => {
  const handleQuantityChange = (newQty) => {
    const clampedQty = Math.max(1, Math.min(newQty, book.qty)); // Ensure within range
    onQuantityChange(book._id, clampedQty);
  };
  return (
    <>
      <tr key={book._id}>
        <td className="p-4">
          <div className="media align-items-center">
            <img
              src={book.cover_photo}
              className="d-block ui-w-40 ui-bordered mr-4"
              alt={book.title}
            />
            <div className="media-body">
              <a href="#" className="d-block text-dark">
                {book.title}
              </a>
              <div>
                <span className="text-muted">Author:</span> {book.author} <br />
                <span className="text-muted">Category:</span>{" "}
                {book.category_id.name}
                <br />
                <span className="text-muted">In Stock:</span>{" "}
                {book.qty - book.userQty}
              </div>
            </div>
          </div>
        </td>
        <td className="text-right font-weight-semibold align-middle p-4">
          €{book.sell_price}
        </td>
        <td className="align-middle p-4">
          <div className="input-group d-flex">
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityChange(book.userQty - 1)}
              disabled={book.userQty <= 1}
            >
              -
            </button>
            <input
              type="number"
              className="form-control text-center"
              value={book.userQty}
              min="1"
              max={book.qty}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityChange(book.userQty + 1)}
              disabled={book.userQty >= book.qty}
            >
              +
            </button>
          </div>
        </td>
        <td className="text-right font-weight-semibold align-middle p-4">
          €{(book.sell_price * book.userQty).toFixed(2)}
        </td>
        <td className="text-center align-middle px-0">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleRemoveBook(book._id)}
          >
            <TrashIcon></TrashIcon>
          </button>
        </td>
      </tr>
    </>
  );
};

export default BookRow;
