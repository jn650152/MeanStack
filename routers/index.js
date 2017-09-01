//uncomment/**/ if want to insert new records into db
var express = require("express");
var router = express.Router();
router.get("/about",function(req, res){
	res.render("index",{name: "Bob"});
	//connect local mongodb
	var mongoose = require("mongoose");
	mongoose.Promise = require('bluebird');
	var promise = mongoose.connect('mongodb://localhost/test', {
  	useMongoClient: true
	});
	var personModel = require("../models/person");
	promise.then(function(db) {
  		// Use `db`, for instance `db.model()`
		//insert and save a record
  		console.log("after mongodb connection");
 		/*var personInstance = new personModel({name: "jinggougou", age: "25"});
		console.log(personInstance.name);
	  	personInstance.save(function(err){
        		console.log("enter save funciton");
        		if(err) return handleError(err);
        		//save
       	 		console.log("the new person is saved");
  		});
		*/
		//search db
		console.log("before search");
  		//personModel.find().select("name age").exec(function(err, persons){
  		personModel.find().select("name").exec(function(err, persons){
			if(err) return handleError(err);
			var index = 0;
			for(; index < persons.length; index++){
				console.log("found person: ", persons[index].name);
			}
		/*	for(person in persons){
        			console.log("person: ",person);
			}*/
  		});
		

		//reference
		var petModel = require("../models/pet");
		/*var petInstance = new petModel({generic: "dog", owner: personInstance._id,id: 1});
		petInstance.save(function(err){
			if(err) return handleError(err);
			console.log("the new pet is saved");
		})*/
		//test
		petModel.find().where("generic").equals("dog").select("owner id").exec(function(err,pets){
		if(err) handleError(err);
		console.log("found pet: ", pets[0]);
		});
	});
	

});
module.exports = router;
