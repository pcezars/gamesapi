const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const gamesController = require("./games/GamesController");
const usersController = require("./users/UsersController");
const cors = require("cors");



app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", usersController);
app.use("/", gamesController);



app.listen(8000, () => {
    console.log("API RODANDO!");
})