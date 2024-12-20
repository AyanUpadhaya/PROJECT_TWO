const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    cover_photo: { type: String, required: true },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: { type: String, required: true },
    author: { type: String, required: true },
    about: { type: String },
    published_date: { type: Date },
    language: { type: String, default: "English" },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    sell_price: { type: Number, required: true },
   
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
