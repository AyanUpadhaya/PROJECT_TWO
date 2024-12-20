import React, { useState } from "react";
import formatToLocaleDateString from "../../../../utils/formatToLocaleDateString";

const AdminBooksTable = ({ data }) => {
  const truncate = (text) => {
    return text.length > 34 ? text.slice(0, 34) + "..." : text;
  };
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book Name</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col">Store</th>
              <th scope="col">In stock</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((book, index) => (
                <tr key={book._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{truncate(book?.title)}</td>
                  <td>{truncate(book?.author)}</td>
                  <td>{book?.category_id?.name || "N/A"}</td>
                  <td>{book?.store_id?.name || "N/A"}</td>
                  <td>{book?.qty || "N/A"}</td>
                  <td>{formatToLocaleDateString(book?.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminBooksTable;
