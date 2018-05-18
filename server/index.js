'use strict';
require('dotenv').config();
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    http = require("http"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    router = require("./router"),
    path = require("path");

console.log('what what');

mongoose.connect(process.env.MONGO_URL);

app.use(express.static(path.resolve(__dirname, "../client/build")));


app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

router(app);

const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);



