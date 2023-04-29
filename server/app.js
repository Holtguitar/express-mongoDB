require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Create express App
const app = express();

//Handle CORS + Middleware

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); //if using .fetch and not using axios
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Database 
const uri = process.env.mongoDBConnection;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected!");
}).catch((error) => {
    console.log(error);
});

app.use(bodyParser.json());

// Routes
app.get("/", (res, req) => {
    // res.send("Hello New Mongo User!");
});

const ToDosRoute = require("./routes/todos");
    app.use("/todos", ToDosRoute);

const UsersRoute = require("./routes/users");
    app.use("/users", UsersRoute)

//Start Server
app.listen(3000, () => {
    console.log("Listening at port 3000")
});


