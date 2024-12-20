const Order = require("../models/Order");
const Store = require("../models/Store");
const Book = require("../models/Book");
// Create a new order
const createOrder = async (req, res) => {
  try {
    const { order_by, stores, payment_method } = req.body;

    let overallTotalPrice = 0;

    // Iterate over stores to calculate totals and validate stock
    for (const store of stores) {
      let storeTotalPrice = 0;
      for (const book of store.books) {
        const bookData = await Book.findById(book.book_id);

        if (book.qty > bookData.qty) {
          return res.status(400).json({
            message: `Insufficient stock for book: ${bookData.title}`,
          });
        }

        // Deduct stock
        bookData.qty -= book.qty;
        await bookData.save();

        storeTotalPrice += book.qty * book.price;
      }
      store.total_price = storeTotalPrice; // Add total price
      overallTotalPrice += storeTotalPrice; // Update overall
    }

    // Create the order
    const newOrder = new Order({
      order_by,
      stores,
      overall_total_price: overallTotalPrice,
      payment_method,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", data: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("order_by", "name email") // Populate the user who ordered
      .populate("book_id", "title author") // Populate the book details
      .populate("store_id", "name"); // Populate the store details

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders.", error: error.message });
  }
};

// Get single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("order_by", "name email")
      .populate("book_id", "title author")
      .populate("store_id", "name");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({
      message: "Order fetched successfully.",
      data: order,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch order.", error: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // Find and update the order
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({
      message: "Order status updated successfully.",
      data: order,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to update order status.",
        error: error.message,
      });
  }
};

// Get orders -  allow store owners to see their orders
const getOrdersByStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    // Find orders for the given store
    const orders = await Order.find({ "stores.store_id": storeId })
      .populate("order_by", "name email")
      .populate("stores.books.book_id", "title author");

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this store" });
    }

    res.status(200).json({ data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error); // Debug log
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Controller to get orders for the logged-in user
const getUserOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Order.find({ order_by: userId })
      .populate("order_by", "name email")
      .populate("stores.store_id", "name address")
      .populate("stores.books.book_id", "title author")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByStore,
  getUserOrders,
};
