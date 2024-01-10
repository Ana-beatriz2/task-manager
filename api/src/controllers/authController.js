const AuthService = require("../services/authService");


class AuthController {
    static async login(req, res){
        const { email, password } = req.body;

        try{
            const login = await AuthService.login(email, password);
            return res.status(200).json(login);
        } catch (error){
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = AuthController;