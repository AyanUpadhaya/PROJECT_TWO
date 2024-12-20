const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const verifyToken = require("../middlewares/verifyToken");


// Create a new category
router.post("/categories", verifyToken, categoryController.createCategory); //**

// Get all categories
router.get("/categories", categoryController.getCategories); //**

// Get a category by ID
router.get("/categories/:id", categoryController.getCategoryById); //**

// Update a category
router.put("/categories/:id", verifyToken, categoryController.updateCategory); //**

// Delete a category
router.delete(
  "/categories/:id",
  verifyToken,
  categoryController.deleteCategory
); //**

module.exports = router;
