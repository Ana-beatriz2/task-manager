const UserService = require("../services/userService");

class UserController {
    static async getUser(req, res){
        const userId = req.user_id;
        
        try{
            const user = await UserService.getUser(userId);
            return res.status(200).json(user)
        } catch(error){
         return res.status(400).json({message: error.message});
        }
     }

     static async getAllUsers(req, res){
        try{
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error){
            return res.status(400).json({message: error.message});
        }
     }
 
     static async createUser(req, res){
         const { name, email, password } = req.body;
 
         try{
             const response = await UserService.createUser(name, email, password);
             return res.status(201).json({message: response});
         } catch (error){
             return res.status(400).json({message: error.message});
         }
     }

     static async updateUser(req, res){
         const userData = req.body;
         const userId = req.user_id;
 
         try{
             const response = await UserService.updateUser(userId, userData);
             return res.status(200).json({message: response})
         } catch(error){
             return res.status(400).json({message: error.message});
         }
     }

     static async deleteUser(req, res){
         const userId = req.user_id;
 
         try{
             const response = await UserService.deleteUser(userId);
             return res.status(200).json({message: response});
         } catch (error){
             return res.status(400).json({message: error.message});
         }
     }
}

module.exports = UserController;