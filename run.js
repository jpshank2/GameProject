const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.static("./assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});


const PORT = process.env.PORT || 3500
app.listen(PORT, function() {
    console.log("You are now listening to port " + PORT +".");
});