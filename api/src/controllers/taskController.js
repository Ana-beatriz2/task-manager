const TaskService = require("../services/taskService");


class TaskController {
    static async getTask(req, res){
        const { id } = req.params;
        const userId = req.user_id;
        let response;

        try{
            if (id){
                response = await TaskService.getOneTask(userId, id);
            } else{
                response = await TaskService.getAllUserTasks(userId);
            }
            
            return res.status(200).json(response);
        } catch (error){
            return res.status(400).json({message: error.message});
        }
    }

    static async getTaskByName(req, res){
        try{
            
        } catch (error){

        }
    }

    static async createTask(req, res){
        const { name, deadline, description } = req.body;
        const userId = req.user_id;

        try{
            const response = await TaskService.createTask(userId, name, deadline, description);
            return res.status(201).json({message: response});
        } catch (error){
            return res.status(400).json({message: error.message});
        }
    }

    static async updateTask(req, res){
        try{
            
        } catch (error){

        }
    }

    static async deleteTask(req, res){
        try{
            
        } catch (error){

        }
    }
}

module.exports = TaskController;