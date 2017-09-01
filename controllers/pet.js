var petModel = require("../models/pet");
var personModel = require("../models/person");
//list all pets
exports.pet_list = function(req,res){
	//res.send("not finished: list all pets");
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test",{useMongoClient: true});
	promise.then(function(db){
		petModel.find().exec(function(err, results){
			if(err) return handleError(err);
			res.render("pet_list.pug", {title: "pet list", pets: results});
			
		});
	});	
};
//display detail page for a specific pet
exports.pet_detail = function(req, res){
	//res.send("not finished: display the detailed page for a pet");
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test", {useMongoClient: true});
	promise.then(function(db){
		petModel.find().where("id").equals(req.params.id).exec(function(err, results){
			res.render("pet_detail.pug",{title: "the pet detail", pet:results[0]});
		});
	});
};


//display pet create form on get
exports.pet_create_get = function(req, res){
	res.send("not finished: pet create get form");
};
//handle pet create on post
exports.pet_create_post = function(req, res){
	res.send("not finished: pet create post a new pet");
};


//display pet delete form on get
exports.pet_delete_get = function(req, res){
//	res.send("not finished: pet delete get form");
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test",{useMongoClient:true});
	promise.then(function(err, results){
		petModel.find().where("id").equals(req.params.id).exec(function(err, results){
			console.log(results[0]);
			res.render("pet_delete_confirm.pug",{title: "confirm to delete", deleteRecord:results[0]});
			
		});
	});

};
//handle pet delete on post
exports.pet_delete_post = function(req, res){
	//res.send("not finished: pet delete post");
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test", {useMongoClient: true});
	promise.then(function(db){
		console.log("prepare to delete");
		
		console.log(req.body.id);
		petModel.findByIdAndRemove(mongoose.Types.ObjectId(req.body.id), function(err){
			if(err){
				console.log("enter error")
				return(next);
			}else{
				console.log("will redirect");
				res.redirect("/process/pets");
			}
		});
	})
/*		console.log("find by id", req.body.id);
		console.log("object: ", mongoose.Types.ObjectId(req.body.id));
		petModel.findById(mongoose.Types.ObjectId(req.body.id), function(err,doc){
			if(err){ 
				console.log("enter error ");
				console.log(err);
				return;
			}
			console.log("found: ", doc.id);
		})
	});
*/

};
//handle pet update on get
exports.pet_update_get = function(req, res){
	res.send("not finished: pet update get");
};
//handle pet update on post
exports.pet_update_post = function(req, res){
	res.send("not finished: pet update post");
};
