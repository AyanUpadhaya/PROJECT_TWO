const Store = require("../models/Store");
const User = require("../models/User");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// Create a new store
const createStore = async (req, res) => {
  try {
    const { name, location, description, created_by } = JSON.parse(
      req.body.data
    );

    // Fetch user from the request
    const user = await User.findById(created_by);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new store
    const store = await Store.create({
      name,
      location,
      description,
      created_by,
    });
    if (user.is_store_owner) {
      return res
        .status(400)
        .json({ message: "You already have a store", data: user });
    }
    // Update the user's `store_id`
    user.store_id = store._id;
    user.is_store_owner = true; // Ensure this is set to true
    await user.save();

    res.status(201).json({
      message: "Store created successfully.",
      data: store,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create store.", error: error.message });
  }
};

// Get all stores
const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().populate("created_by", "name email"); // Populate user details if needed
    res.status(200).json(stores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch stores.", error: error.message });
  }
};

// Get a store by ID
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).populate(
      "created_by",
      "name email"
    );
    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }
    res.status(200).json(store);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch store.", error: error.message });
  }
};

// Delete a store
const deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Ensure the user deleting the store is the owner
    if (store.created_by.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this store." });
    }

    // Check if the store has associated books
    if (store.book_ids.length > 0) {
      return res
        .status(400)
        .json({ message: "Store contains books and cannot be deleted." });
    }

    // Delete the store
    await Store.findByIdAndDelete(req.params.id);

    // Reset the user's `store_id` and `is_store_owner` fields
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { store_id: 1 },
      is_store_owner: false,
    });

    res.status(200).json({ message: "Store deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete store.", error: error.message });
  }
};

// get all stores created by the user
const getUserStores = async (req, res) => {
  try {
    const { userId } = req.params;

    const stores = await Store.find({ created_by: userId });

    if (stores.length === 0) {
      return res
        .status(404)
        .json({ message: "No stores found for this user." });
    }

    res.status(200).json({
      message: "Stores fetched successfully.",
      data: stores,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch stores.", error: error.message });
  }
};

// update store details
const updateStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const reqBody = JSON.parse(req.body.data);

    // Find the store by ID
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Ensure the user updating the store is the owner
    if (store.created_by.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this store." });
    }

    const updatedStore = await Store.findByIdAndUpdate(storeId, reqBody, {
      new: true,
    });

    res.status(200).json({
      message: "Store updated successfully.",
      data: updatedStore,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update store.", error: error.message });
  }
};

const updateCoverPicture = async (req, res) => {
  const storeId = req.params.id;
  try {
    // Find the store by ID
    const [result, fileName] = await uploadToCloudinary(req);
    const newData = { cover_photo: result };
    const updatedStore = await Store.findByIdAndUpdate(storeId, newData, {
      new: true,
    });
    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }
    res
      .status(200)
      .json({ message: "Picture updated successfully", data: updatedStore });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  deleteStore,
  getUserStores,
  updateStore,
  updateCoverPicture,
};
