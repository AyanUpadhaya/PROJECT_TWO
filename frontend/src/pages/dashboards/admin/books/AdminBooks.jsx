import React from "react";
import AdminBooksTable from "./AdminBooksTable";
import useBooks from "../../../../hooks/useBooks";
import FullPageLoader from "../../../../components/loader/FullPageLoader";

const AdminBooks = () => {
  const { books, error, loading, errorMessage } = useBooks();

  if (error) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <h2>Something went wrong</h2>
          <p className="text-center">{errorMessage ? errorMessage : ""}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <FullPageLoader></FullPageLoader>;
  }
  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Books</h2>
          </div>
        </div>
        {/* table */}
        <div>
          <AdminBooksTable data={books}></AdminBooksTable>
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;
