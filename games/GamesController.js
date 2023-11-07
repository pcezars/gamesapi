const express = require("express");
const router = express.Router();
const Game = require("./Game");
const auth = require("../middlewares/auth");

router.get("/games", auth, (req, res) => {    
    Game.findAll({raw: true})
        .then(games => {
            res.json(games);
        })
    res.statusCode = 200;
    
});


router.get("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    } else{
        var id = parseInt(req.params.id);

        Game.findOne({
            where: {id: id}
        }).then(game => {
            if(game != undefined){
                res.statusCode = 200;
                res.json(game);
            } else{
                res.sendStatus(404);
            }
        })
    }
});

router.post("/game", (req, res) => {
    var {title, price, year} = req.body;
    
    Game.create({
        title: title,
        price: price,
        year: year
    })

    res.sendStatus(200);
});

router.delete("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    } else{
        var id = parseInt(req.params.id);
        Game.destroy({
            where: {id: id}
        }).then(()=> {
            res.sendStatus(200);
        })
    }
});

router.put("/game/:id", (req, res) => {    
    var {title, price, year} = req.body;
    
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    } else{
        var id = parseInt(req.params.id);
        Game.update({
            title: title,
            year: year,
            price: price
        }, {
            where: {
                id: id
            }
        }).then(() => {
            res.sendStatus(200);
        })
    }
});

module.exports = router;