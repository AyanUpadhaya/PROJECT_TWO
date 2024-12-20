import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatToLocaleDateString from "../../../../utils/formatToLocaleDateString";
import useBooks from "../../../../hooks/useBooks";
import ViewIcon from "../../../../components/dashboard/icons/ViewIcon";
import EditIcon from "../../../../components/dashboard/icons/EditIcon";
import TrashIcon from "../../../../components/dashboard/icons/TrashIcon";

const UserBooksTable = ({ data }) => {
  const navigate = useNavigate();
  const { isDeleting, deleteBook, deleteError } = useBooks();
  const [btnIndex, setbtnIndex] = useState(null);

  const handleNavigate = (item, path) => {
    navigate(`${path}`, {
      state: {
        payload: item,
        type: "edit",
      },
    });
  };

  const handleDelete = (id, idx) => {
    setbtnIndex(idx);
    deleteBook(id)
      .then(() => {
        alert("Book is deleted");
        return;
      })
      .catch((error) => {
        alert(error?.message);
      })
      .finally(() => {
        setbtnIndex(null);
      });
  };

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
              <th scope="col">In stock</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
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
                  <td>{book?.qty || "N/A"}</td>
                  <td>{formatToLocaleDateString(book?.createdAt)}</td>
                  <td className="d-flex gap-2 align-items-center">
                    <button
                      onClick={() => handleNavigate(book, "details")}
                      className="btn btn-success"
                    >
                      <ViewIcon />
                    </button>
                    <button
                      onClick={() => handleNavigate(book, "update")}
                      className="btn btn-primary"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(book._id, index);
                      }}
                      disabled={isDeleting && btnIndex == index}
                      className="btn btn-danger"
                    >
                      {isDeleting && btnIndex == index ? (
                        "..."
                      ) : (
                        <TrashIcon></TrashIcon>
                      )}
                    </button>
                  </td>
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

export default UserBooksTable;
