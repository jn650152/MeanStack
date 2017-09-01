var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var expressValidator = require('express-validator');

//set views loction
app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator()); 

//set router
var router = require("./routers/index.js");
app.use("/", router);
var router_process = require("./routers/process.js");
app.use("/process", router_process);


//set server
app.listen(3000, function(){
	console.log("listening on localhost:3000");
});
