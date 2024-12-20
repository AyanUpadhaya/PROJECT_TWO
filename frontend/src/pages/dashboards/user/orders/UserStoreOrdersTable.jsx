import React from "react";
import useOrders from "../../../../hooks/useOrders";
import TickIcon from "../../../../components/dashboard/icons/TickIcon";
import CancelIcon from "../../../../components/dashboard/icons/CancelIcon";
import useLoadUser from "../../../../hooks/useLoadUser";

const UserStoreOrdersTable = ({ orders = [] }) => {
  const { updateOrderStatus, error, statusUpdating } = useOrders();
  const { user } = useLoadUser();

  const handleStatusUpdate = (id, status) => {
    updateOrderStatus(id, status);
  };

  function matchUserStoreId(item) {
    return item.store_id === user.store_id;
  }

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th className="custom-bg text-white">Order ID</th>
              <th className="custom-bg text-white">Customer Name</th>
              <th className="custom-bg text-white">Books Ordered</th>
              <th className="custom-bg text-white">Total Price</th>
              <th className="custom-bg text-white">Status</th>
              <th className="custom-bg text-white">Payment Method</th>
              <th className="custom-bg text-white">Date</th>
              <th className="custom-bg text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order?.stores?.filter(matchUserStoreId)?.map((store) => (
                <tr key={`${order?._id}-${store?._id}`}>
                  <td>{order?._id}</td>
                  <td>{order?.order_by?.name}</td>
                  <td>
                    {store.books.map((book) => (
                      <div key={book?.book_id?._id}>
                        <strong>Title:</strong> {book?.book_id?.title}
                        <br />
                        <strong>Quantity:</strong> {book?.qty}
                        <br />
                        <strong>Price:</strong> ${book?.price}
                        <hr />
                      </div>
                    ))}
                  </td>
                  <td>€{store?.total_price}</td>
                  <td>{order?.status}</td>
                  <td>{order?.payment_method}</td>
                  <td>{new Date(order?.date).toLocaleString()}</td>
                  <td className="d-flex flex-column gap-1">
                    <button
                      disabled={
                        order.status == "completed" ||
                        order.status == "cancelled" ||
                        statusUpdating
                      }
                      onClick={() =>
                        handleStatusUpdate(order?._id, "completed")
                      }
                      className="btn btn-sm btn-dark"
                    >
                      <TickIcon />
                    </button>
                    <br />
                    <button
                      disabled={
                        order.status == "completed" ||
                        order.status == "cancelled" ||
                        statusUpdating
                      }
                      onClick={() =>
                        handleStatusUpdate(order?._id, "cancelled")
                      }
                      className="btn btn-sm btn-danger"
                    >
                      <CancelIcon />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserStoreOrdersTable;
