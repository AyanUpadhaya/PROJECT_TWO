import React from "react";
import UserBooksTable from "./UserBooksTable";
import { useNavigate } from "react-router-dom";
import useBooks from "../../../../hooks/useBooks";
import FullPageLoader from "../../../../components/loader/FullPageLoader";
//load books here - use context
const UserBooks = () => {
  const navigate = useNavigate();
  const { storeBooks, error, loading, errorMessage } = useBooks();


   if (loading) {
     return <FullPageLoader></FullPageLoader>;
   }
  if (storeBooks.length == 0) {
    return (
      <div className="w-full d-flex flex-column gap-2 justify-content-center">
        <div className="text-center">
          <h2>You currently don't have any books</h2>
          <button onClick={() => navigate("add")} className="btn btn-success">
            Create Book
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Books {storeBooks && storeBooks?.length}</h2>
          </div>
          <div>
            <button onClick={() => navigate("add")} className="btn btn-success">
              Add Book
            </button>
          </div>
        </div>
        {/* table */}
        <div>
          <UserBooksTable data={storeBooks}></UserBooksTable>
        </div>
      </div>
    </div>
  );
};

export default UserBooks;
