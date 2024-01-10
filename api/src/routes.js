const express = require('express');
const router = express.Router();
const UserController = require("./controllers/userController")
const AuthController = require("./controllers/authController");
const auth = require("./middleware/auth");

router
    .get("/user/:id?", UserController.getUser)

    .post("/user", UserController.createUser)
    .post("/login", AuthController.login)

    .patch("/user/:id", UserController.updateUser)

    .delete("/user/:id", UserController.deleteUser)

module.exports = router;