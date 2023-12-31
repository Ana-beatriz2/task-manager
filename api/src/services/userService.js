const knex = require("../database");
const { v4 } = require("uuid")
const bcrypt = require("bcryptjs")
const Joi = require("joi");

module.exports = {
    async getUser(){
        
    },

    async createUser(name, email, password){
        const userValidation = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).pattern(new RegExp("[A-z0-9]")).required()
        });

        const { error } = userValidation.validate({name, email, password});

        if (error){throw new Error(error.message)}

        const user = await knex("user").select("id").where({email}).first();

        if (user){ throw new Error("O email inserido já foi cadastrado!") }

        const hash = await bcrypt.hash(password, 10);

        await knex("user").insert({
            id: v4(),
            name,
            email,
            password: hash
        })

        return "Usuário criado com sucesso!";
        
    },
    async updateUser(req, res){

    },
    async deleteUser(req, res){

    }
}