export const extractOrderFormat = (cartBooks, userId, paymentMethod) => {
  const storesMap = {};

  // Group books by store_id
  cartBooks.forEach(({ store_id, _id, userQty, sell_price }) => {
    if (!storesMap[store_id?._id]) {
      storesMap[store_id._id] = [];
    }
    storesMap[store_id._id].push({
      book_id:_id,
      qty: userQty,
      price: sell_price,
    });
  });

  // Format stores array
  const stores = Object.entries(storesMap).map(([store_id, books]) => ({
    store_id,
    books,
  }));

  // Return final payload
  return {
    order_by: userId, // The logged-in user's ID
    stores,
    payment_method: paymentMethod, // Payment method
  };
  // return storesMap;
};
