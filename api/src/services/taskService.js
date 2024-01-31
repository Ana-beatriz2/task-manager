const knex = require("../database");
const { v4 } = require("uuid")
const Joi = require("joi");
const moment = require("moment")

function convertDate(date){
    return moment(date).locale("pt").format("DD/MM/YYYY [às] HH:mm:ss");
}

function taskValidation(name, deadline, description) {
    const taskValidation = Joi.object({
        name: Joi.string().min(3).required(),
        deadline: Joi.date().allow('', null),
        description: Joi.string().allow('', null)
    })

    const { error } = taskValidation.validate({name, deadline, description})

    if (error){throw new Error(`Informações inseridas inválidas - ${error.message}`)}

    return;
}

class TaskService {
    static async getOneTask(userId, taskId){
        const task = await knex("task").select("*").where({id: taskId}).first();

        if (!task){throw new Error("Tarefa não encontrada!")}

        if (task.user_id != userId){throw new Error("Essa tarefa não pertence a você!")}

        const deadline = task.deadline

        if (deadline){
            task.deadline = convertDate(deadline);
        }

        return task;
    }

    static async getAllUserTasks(userId){
        const tasks = await knex("task").select("*").where({user_id: userId});

        if (!tasks.length){return "Nenhuma tarefa foi encontrada!"}

        tasks.forEach(task => {
            let deadline = task.deadline;

            if (deadline){
                task.deadline = convertDate(deadline)
            }
        })

        return tasks;
    }

    static async getTaskByName(userId, taskName){
        const task = await knex("task").select("*").where({name: taskName}).first();

        if (!task){throw new Error("Tarefa não encontrada!")}

        if (task.user_id != userId){throw new Error("Essa tarefa não pertence a você!")}

        const deadline = task.deadline

        if (deadline){
            task.deadline = convertDate(deadline);
        }

        return task;
    }

    static async getExpiredTasks(userId){
        const today = new Date().toISOString();
        
        const userTasks = await knex("task").select("*").where('user_id', userId) 
        .whereRaw('deadline < ?', [today]);
        
        return userTasks;
    }

    static async createTask(userId, name, deadline, description){
        taskValidation(name, deadline, description);

        await knex("task").insert({
            id: v4(),
            name,
            deadline,
            description,
            user_id: userId
        });

        return "Tarefa criada com sucesso!";
    }

    static async updateTask(userId, taskId, taskData){
        taskValidation(taskData.name, taskData.deadline, taskData.description);

        await this.getOneTask(userId, taskId);

        await knex("task").where({id: taskId}).update(taskData);

        return "Tarefa alterada com sucesso!";
    }

    static async deleteTask(taskId, userId){
        await this.getOneTask(userId, taskId);

        await knex("task").where({id: taskId}).del();

        return "Tarefa deletada com sucesso!";
    }
}

module.exports = TaskService;