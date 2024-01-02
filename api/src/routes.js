const express = require('express');
const router = express.Router();
const userController = require("./controllers/userController")

router
    .get("/user/:id?", userController.getUser)

    .post("/user", userController.createUser)

    .patch("/user/:id", userController.updateUser)

    .delete("/user/:id", userController.deleteUser)

module.exports = router;