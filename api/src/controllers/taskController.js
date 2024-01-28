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
        const userId = req.user_id;
        const { name } = req.query;

        try{
            const response = await TaskService.getTaskByName(userId, name);
            return res.status(200).json(response);
        } catch (error){
            return res.status(400).json({message: error.message});
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
        const data = req.body;
        const userId = req.user_id;
        const { id } = req.params;
        console.log(data)

        try{
            const response = await TaskService.updateTask(userId, id, data);
            return res.status(200).json(response);
        } catch (error){
            return res.status(400).json({message: error.message});
        }
    }

    static async deleteTask(req, res){
        const { id } = req.params;
        const userId = req.user_id;

        try{
            const response = await TaskService.deleteTask(id, userId);
            return res.status(200).json(response);    
        } catch (error){
            return res.status(400).json({message: error.message});
        }
    }
}

module.exports = TaskController;