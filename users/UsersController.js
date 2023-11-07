const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWTSecret = "secretpasshere";

router.post("/users", (req, res) => {
    var {name, email, password} = req.body;

    User.findOne({
        where: {email: email}
    }).then(user => {
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.sendStatus(200);
                res.json({message: "Usuário adicionado com sucesso!"})
            });
        } else {
            res.sendStatus(400);
        }
    });    
});

router.post("/auth", (req, res) => {
    var {email, password} = req.body;

    if(email != undefined){
        
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if(user != undefined){

                var correct = bcrypt.compareSync(password, user.password);

                if(correct){
    
                    jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn:'48h'},(err, token) =>{
                        if(err){
                            res.status(400);
                            res.json({err: "Falha interna"});
                        }else{
                            res.status(200);
                            res.json({token: token});
                        }
                    })    
                } else {
                    res.status(401);
                    res.json({err: "Credenciais inválidas!"});
                };
            } else {
                res.status(404);
                res.json({err: "O E-mail não existe na base de dados!"});
            };
        })        
    }else{
        res.status(400);
        res.json({err: "E-mail inválido"});
    };
});

module.exports = router;