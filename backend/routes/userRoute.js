const express = require("express");
const {
  registerUser,
  loginUser,
  singleUser,
  getAllUsers,
} = require("../controller/Usercontroller");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/singleUser", singleUser);

router.get("/allusers", getAllUsers);

module.exports = router;
