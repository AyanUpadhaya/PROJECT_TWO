import React from "react";

const UserPurchaseTable = ({ orders }) => {
  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered ">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Store</th>
              <th>Books</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order?.stores?.map((store, index) => (
                <tr key={`${order?._id}-${store?._id}`}>
                  {/* Order ID and Date should  displayed in the first row for each order */}
                  {index === 0 && (
                    <>
                      <td rowSpan={order?.stores?.length}>{order?._id}</td>
                      <td rowSpan={order?.stores?.length}>
                        {new Date(order?.date).toLocaleDateString()}
                      </td>
                    </>
                  )}
                  <td>{store.store_id.name}</td>
                  <td>
                    <ul className="list-unstyled">
                      {store.books.map((book) => (
                        <li key={book?.book_id?._id}>
                          <span className="fw-bold">
                            {book?.book_id?.title}
                          </span>
                          <br /> by {book?.book_id?.author}
                          <br />
                          Qty: {book?.qty}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>€{store?.total_price}</td>
                  {/* Status should also only appear in the first row for each order */}
                  {index === 0 && (
                    <td rowSpan={order?.stores?.length}>{order?.status}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPurchaseTable;
