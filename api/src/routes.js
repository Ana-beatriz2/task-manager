const express = require('express');
const router = express.Router();
const UserController = require("./controllers/userController")
const AuthController = require("./controllers/authController");
const TaskController = require("./controllers/taskController");
const auth = require("./middleware/auth");

router
    .get("/task/busca", auth, TaskController.getTaskByName)
    .get("/user/:id?", auth, UserController.getUser)
    .get("/task/:id?", auth, TaskController.getTask)
    .get("/tasks", auth, TaskController.getExpiredTasks)

    .post("/user", UserController.createUser)
    .post("/login", AuthController.login)
    .post("/task", auth, TaskController.createTask)

    .patch("/user/:id", auth, UserController.updateUser)
    .patch("/task/:id", auth, TaskController.updateTask)

    .delete("/user/:id", auth, UserController.deleteUser)
    .delete("/task/:id", auth, TaskController.deleteTask)

module.exports = router;