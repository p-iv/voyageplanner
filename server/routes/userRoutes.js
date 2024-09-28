const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);

<<<<<<< HEAD
=======
router.post("/login", authController.login);

>>>>>>> d642b13c1109b281b0e799c627e62ba7e12996c9
module.exports = router;
