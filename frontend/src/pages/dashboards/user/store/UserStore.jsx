import React, { useEffect, useState } from "react";
import UserStoreTable from "./UserStoreTable";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useStore from "../../../../hooks/useStore";
import FullPageLoader from "../../../../components/loader/FullPageLoader";

const UserStore = () => {
  const { user } = useAuth();
  const { loading, error, myStore } = useStore();
  const navigate = useNavigate();

  const NoStore = () => {
    const handleNavigate = (path) => {
      navigate(path);
    };
    return (
      <>
        <div className="w-full d-flex flex-column gap-2 justify-content-center">
          <div className="text-center">
            <h2>You currently don't have any store</h2>
            <button
              onClick={() => handleNavigate("add")}
              className="btn btn-success"
            >
              Create Store
            </button>
          </div>
        </div>
      </>
    );
  };

  const content =
    user?.is_store_owner && user?.store_id ? (
      <UserStoreTable data={myStore}></UserStoreTable>
    ) : (
      <NoStore></NoStore>
    );

  if (error) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <h2>Something went wrong</h2>
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
            <h2>Store</h2>
          </div>
        </div>
        {/* table */}
        <div>{content}</div>
      </div>
    </div>
  );
};

export default UserStore;
