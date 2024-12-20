import React, { useEffect } from 'react'
import UserStoreOrdersTable from "./UserStoreOrdersTable";
import useLoadUser from '../../../../hooks/useLoadUser';
import useOrdersApi from '../../../../hooks/useOrdersApi';
import useOrders from '../../../../hooks/useOrders';

const UserStoreOrders = () => {
  const { user } = useLoadUser();
  const { fetchOrdersByStore, loading, error, orders } = useOrders();

  useEffect(() => {
      fetchOrdersByStore(user.store_id);
  }, []);

  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Store orders</h2>
          </div>
        </div>
        {/* table */}
        <div>
          <UserStoreOrdersTable orders={orders}></UserStoreOrdersTable>
        </div>
      </div>
    </div>
  );
}

export default UserStoreOrders