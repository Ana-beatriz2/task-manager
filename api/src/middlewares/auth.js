const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next){
    const authToken = req.headers.authorization;

    if (!authToken) return res.status(401).json({ message: "Token não identificado!" });
    
    const parts = authToken.split(" ");

    if (!parts.length === 2) return res.status(401).json({ message: "Token inválido!" })

    const [, token] = parts;

    jwt.verify(token, process.env.TOKEN_KEY, (error, data) => {
        if (error) return res.status(401).json({ message: `Token error - ${error.message}`});

        req.user_id = data.id;
        req.token = token;
        return next();
    })
}

module.exports = auth;