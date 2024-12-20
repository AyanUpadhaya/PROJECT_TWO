const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, default: Date.now },
    stores: [
      {
        store_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Store",
          required: true,
        },
        books: [
          {
            book_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Book",
              required: true,
            },
            qty: { type: Number, required: true },
            price: { type: Number, required: true }, // Price per book
          },
        ],
        total_price: { type: Number, required: true }, // Total price for books in this store
      },
    ],
    overall_total_price: { type: Number, required: true }, // Total price for all stores
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    payment_method: { type: String, default: "Cash on Delivery" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
