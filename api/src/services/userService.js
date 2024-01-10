const knex = require("../database");
const { v4 } = require("uuid")
const bcrypt = require("bcryptjs")
const Joi = require("joi");

class UserService {
    static async getOneUser(id){
        const user = await knex("user").select("id", "name", "email").where({id}).first();

        if (!user){
            throw new Error("Usuário não encontrado!");
        }

        return user;
    }

    static async getAllUsers(){
        const users = await knex("user").select("id", "name", "email");
        return users; 
    }

    static async createUser(name, email, password){
        const userValidation = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).pattern(new RegExp("[A-z0-9]")).required()
        });

        const { error } = userValidation.validate({name, email, password});

        if (error){throw new Error(`Informações de cadastro inválidas - ${error.message}`)}

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
    }

    static async updateUser(id, userData){
        const userUpdateValidation = Joi.object({
            name: Joi.string().min(3),
            password: Joi.string().min(6).pattern(new RegExp("[A-z0-9]"))
        });

        const { error } = userUpdateValidation.validate(userData);

        if (error){throw new Error(error.message)}

        const user = this.getOneUser(id);

        if (!user){
            throw new Error("Usuário não encontrado!");
        }

        if (userData.email){
            throw new Error("Não é permitido alterar o email!");
        }

        if (userData.password){
            userData.password = await bcrypt.hash(userData.password, 10)
        }

        await knex("user").where({id}).update(userData)

        return "Alteração realizada com sucesso!";
    }

    static async deleteUser(id){
        const user = await this.getOneUser(id);

        if (!user){
            throw new Error("Usuário não encontrado!");
        }

        await knex("user").where({id}).del();

        return "Usuário excluido com sucesso!";
    }
}


module.exports = UserService;