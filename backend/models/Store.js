const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    description: { type: String },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // User who created the store
    book_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    cover_photo: {
      type: String,
      default: "https://iili.io/2Nf6Yga.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
