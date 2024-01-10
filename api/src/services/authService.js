const knex = require("../database");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { compareSync } = require("bcryptjs");
require("dotenv").config();


class AuthService {
    static async login(email, password){
        const loginValidation = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).pattern(new RegExp("[A-z0-9]")).required()
        })

        const { error } = loginValidation.validate({ email, password });

        if (error){throw new Error(`Informações de login inválidas - ${error.message}`)}

        const user = await knex("user").select("id", "name", "email", "password").where({ email }).first();

        if (!user){throw new Error("Usuário não encontrado!")}

        if(!compareSync(password, user.password)){throw new Error("Senha incorreta!")}

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, 
            process.env.TOKEN_KEY,
            { expiresIn: "24h" }
        );

        return token;
    }
}

module.exports = AuthService;