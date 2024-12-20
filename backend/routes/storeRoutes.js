const express = require("express");
const {
  createStore,
  getAllStores,
  getStoreById,
  deleteStore,
  getUserStores,
  updateStore,
  updateCoverPicture,
} = require("../controllers/storeController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

//Get 
router.get("/stores", getAllStores); 
router.get("/stores/:id", getStoreById); 
router.get("/stores/user/:userId", getUserStores); 
// Create a new store
router.post("/stores", verifyToken, createStore); 

// Update and delete
router.delete("/stores/:id", deleteStore); 
router.patch("/stores/:id/picture", verifyToken, updateCoverPicture); 
router.put("/stores/:id", verifyToken, updateStore); 


module.exports = router;
