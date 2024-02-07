const express = require('express');
const router = express.Router();
const UserController = require("./controllers/userController")
const AuthController = require("./controllers/authController");
const TaskController = require("./controllers/taskController");
const auth = require("./middlewares/auth");

router
    .get("/task/busca", auth, TaskController.getTaskByName)
    .get("/user", auth, UserController.getUser)
    .get("/users", auth, UserController.getAllUsers)
    .get("/task/:id?", auth, TaskController.getTask)
    .get("/tasks", auth, TaskController.getExpiredTasks)

    .post("/user", UserController.createUser)
    .post("/login", AuthController.login)
    .post("/task", auth, TaskController.createTask)

    .patch("/task/:id", auth, TaskController.updateTask)
    .patch("/user", auth, UserController.updateUser)

    .delete("/task/:id", auth, TaskController.deleteTask)
    .delete("/user", auth, UserController.deleteUser)

module.exports = router;