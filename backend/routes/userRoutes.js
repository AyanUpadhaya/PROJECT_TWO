const express = require("express");
const {
  register,
  login,
  updateUserDetails,
  changePassword,
  updateProfilePicture,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

//auth routes
router.post("/register", register);
router.post("/login", login);

// update routes
router.put("/users/:user_id", updateUserDetails);
router.put("/users/:user_id/password", changePassword);
router.patch("/users/:user_id/picture", updateProfilePicture);

// users
router.get("/users", getAllUsers);

module.exports = router;
