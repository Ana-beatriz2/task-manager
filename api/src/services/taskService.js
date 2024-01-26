const knex = require("../database");
const { v4 } = require("uuid")
const Joi = require("joi");

class TaskService {
    static async getOneTask(userId, taskId){

    }

    static async getAllUserTasks(userId){

    }

    static async getTaskByName(userId, taskName){

    }

    static async createTask(userId, name, deadline, description){
        const taskValidation = Joi.object({
            name: Joi.string().min(3).required(),
            deadline: Joi.date().allow('', null),
            description: Joi.string()
        })

        const { error } = taskValidation.validate({name, deadline, description})

        if (error){throw new Error(`Informações inseridas inválidas - ${error.message}`)}

        await knex("task").insert({
            id: v4(),
            name,
            deadline,
            description,
            user_id: userId
        });

        return "Tarefa criada com sucesso!";
    }

    static async updateTask(userId){

    }

    static async deleteTask(userId){

    }
}

module.exports = TaskService;