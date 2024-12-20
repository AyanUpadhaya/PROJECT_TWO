import React, { useEffect, useState } from "react";
import UserPurchaseTable from "./UserPurchaseTable";
import useLoadUser from "../../../../hooks/useLoadUser";
import useOrdersApi from "../../../../hooks/useOrdersApi";
import FullPageLoader from "../../../../components/loader/FullPageLoader";

const UserPurchase = () => {
  const { user } = useLoadUser();
  const { fetchUserOrders, loading, error, orders } = useOrdersApi();

  useEffect(() => {
    fetchUserOrders(user._id);
  }, []);

  if (error) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <h2>{error || "Something went wrong"}</h2>
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
            <h2>My orders</h2>
          </div>
        </div>
        {/* table */}
        <div>
          <UserPurchaseTable orders={orders}></UserPurchaseTable>
        </div>
      </div>
    </div>
  );
};

export default UserPurchase;
