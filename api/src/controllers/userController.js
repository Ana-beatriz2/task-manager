const userService = require("../services/userService")

module.exports = {
    async getUser(req, res){
        
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

    },
    async deleteUser(req, res){

    }
}