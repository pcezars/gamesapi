const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Game = require("./database/Game");

// connection
//     .authenticate()
//     .then(() => {
//         console.log("Conexão feita com o banco de dados!");
//     })
//     .catch((msgErro) => {
//         console.log(msgErro);
//     });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// var DB = {
//     games: [
//         {
//             id: 23,
//             title: "Call of Duty MW",
//             year: 2019,
//             price: 60
//         },
//         {
//             id: 65,
//             title: "Sea of Thieves",
//             year: 2018,
//             price: 40
//         },
//         {
//             id: 2,
//             title: "Minecraft",
//             year: 2012,
//             price: 20
//         }
//     ]
// }

app.get("/games", (req, res) => {    
    Game.findAll({raw: true})
        .then(games => {
            res.json(games);
        })
    res.statusCode = 200;
    
});


app.get("/game/:id", (req, res) => {
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

app.post("/game", (req, res) => {
    var {title, price, year} = req.body;
    
    Game.create({
        title: title,
        price: price,
        year: year
    })

    res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {
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

app.put("/game/:id", (req, res) => {    
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

app.listen(8000, () => {
    console.log("API RODANDO!");
})