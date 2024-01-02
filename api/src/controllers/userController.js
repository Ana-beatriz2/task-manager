const userService = require("../services/userService")

module.exports = {
    async getUser(req, res){
       const { id } = req.params;
       
       try{
           if (id) {
                const user = await userService.getOneUser(id);
                return res.status(200).json(user)
           }
    
           const users = await userService.getAllUsers();
           return res.status(200).json(users);
       } catch(error){
        return res.status(400).json({message: error.message});
       }
    },

    async createUser(req, res){
        const { name, email, password } = req.body;

        try{
            const response = await userService.createUser(name, email, password);
            return res.status(201).json({message: response});
        } catch (error){
            return res.status(400).json({message: error.message});
        }
    },
    async updateUser(req, res){
        const userData = req.body;
        const { id } = req.params;

        try{
            const response = await userService.updateUser(id, userData);
            return res.status(200).json({message: response})
        } catch(error){
            return res.status(400).json({message: error.message});
        }
    },
    async deleteUser(req, res){
        const { id } = req.params;

        try{
            const response = await userService.deleteUser(id);
            return res.status(200).json({message: response});
        } catch (error){
            return res.status(400).json({message: error.message});
        }
    }
}