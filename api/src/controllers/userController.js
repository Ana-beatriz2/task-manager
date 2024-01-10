const UserService = require("../services/userService");

class UserController {
    static async getUser(req, res){
        const { id } = req.params;
        
        try{
            if (id) {
                 const user = await UserService.getOneUser(id);
                 return res.status(200).json(user)
            }
     
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch(error){
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
         const { id } = req.params;
 
         try{
             const response = await UserService.updateUser(id, userData);
             return res.status(200).json({message: response})
         } catch(error){
             return res.status(400).json({message: error.message});
         }
     }

     static async deleteUser(req, res){
         const { id } = req.params;
 
         try{
             const response = await UserService.deleteUser(id);
             return res.status(200).json({message: response});
         } catch (error){
             return res.status(400).json({message: error.message});
         }
     }
}

module.exports = UserController;