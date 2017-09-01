var personModel = require("../models/person");
var petModel = require("../models/pet");
var asycr = require("async");

//list all persons
exports.person_list = function(req,res){
	//res.send("not finished: list all persons");
        //connect local mongodb
        var mongoose = require("mongoose");
        mongoose.Promise = require('bluebird');
        var promise = mongoose.connect('mongodb://localhost/test', {
        	useMongoClient: true
        });
        promise.then(function(db) {
		personModel.find().exec(function(err, results){
		if(err) return handleError(err);
		res.render("person_list.pug", {persons: results});
		});
	});
};
//display detail page for a specific person
exports.person_detail = function(req, res){
	//res.send("not finished: display the detailed page for a person");
        //connect local mongodb
        var mongoose = require("mongoose");
        mongoose.Promise = require('bluebird');
        var promise = mongoose.connect('mongodb://localhost/test', {
                useMongoClient: true
        });
        promise.then(function(db) {
		personModel.find({"name": req.params.id}).exec(function(err, results){
                	if(err) return handleError(err);
			res.render("person_detail.pug", {person:results[0]});
			console.log(req.params.id,results[0]);
                });})
		
};


//display person create form on get
exports.person_create_get = function(req, res){
	res.render("person_create.pug", {title: "create a person"});
	//res.send("not finished: person create get form");
};
//handle person create on post
exports.person_create_post = function(req, res){
	console.log("enter person_Create_post");
	var mongoose = require("mongoose");
        mongoose.Promise = require('bluebird');
        var promise = mongoose.connect('mongodb://localhost/test', {
                useMongoClient: true
        });
	console.log("after connection");
        promise.then(function(db) {
		console.log("enter then");
		req.checkBody("name", "name cannot be empty").notEmpty();
		req.checkBody("age", "age cannot be empty").notEmpty();

		console.log("after check body");
		req.sanitize("name").escape();
		req.sanitize("name").trim();
		req.sanitize("age").escape();
		req.sanitize("age").trim();
		console.log("after sanitize body");
		
		req.getValidationResult().then(function(results){
			console.log("execute validation");
			if(!results.isEmpty()){
				console.log("enter error");
				console.log(results.array());
				res.render("person_create.pug",{title:"create a person",errors: results.array()});
				//return;
			}else{
				console.log("enter save");
              			var person = new personModel({name:req.body.name,
					age: req.body.age});
				console.log("new person: ", req.body.name, req.body.age);	
				person.save(function(err){
					if(err){return;}
					console.log("before redirect");
					res.redirect("/process/persons");
				});
				
			}
			
		});
		/*if(errors){
			console.log("enter errors");
			console.log(errors);
			res.render("person_create.pug",{title:"create a person",errors: errors});
			return;
		}else{
			console.log("enter save");
			person.save(function(err){
				if(err){return;}
				console.log("before redirect");
				res.redirect("/process/persons");
			});
		}*/
 	});
	//mongoose.disconnect(); 
//	res.send("not finished: person create post a new person");
};


//display person delete form on get
exports.person_delete_get = function(req, res){
	//res.send("not finished: person delete get form");
	res.render("person_delete.pug", {title: "delete a person"});
};
//handle person delete on post
/*exports.person_delete_post = function(req, res){
	//res.send("not finished: person delete post");
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
                                console.log("will redirect to persons");
                                res.redirect("/process/persons");
                        }
                });




		petModel.findById(req.body.id, function(err,doc){
                	if(err){
                      	 	console.log("enter error ");
                       		console.log(err);
                       		return;
                	}
                    	console.log("found: ", doc.id);
                });
        })





};*/
exports.person_delete_post = function(req, res){
        var mongoose = require("mongoose");
        mongoose.Promise = require("bluebird");
        var promise = mongoose.connect("mongodb://localhost/test", {useMongoClient: true});
        promise.then(function(db){
                console.log("prepare to delete");
                console.log(req.body.id);
		console.log(req.body.name);
                console.log(mongoose.Types.ObjectId(req.body.id));
                personModel.find({_id:mongoose.Types.ObjectId(req.body.id)}).remove().exec(function(err){
  //              personModel.find({name:req.body.id}).remove().exec(function(err){
                        if(err){
                                console.log("enter error")
                                return(next);
                        }else{
                                console.log("will redirect");
                                res.redirect("/process/persons");
                        }
                });
        })

};


//handle person update on get
exports.person_update_get = function(req, res){
	//res.send("not finished: person update get");
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test",{useMongoClient: true});
	promise.then(function(db){
		console.log("after connect to database");
		personModel.find({_id:mongoose.Types.ObjectId(req.params.id)}).exec(function(err, newPersons){
			if(err){
				console.log("error when find");
				return;
			}else{
				console.log("found the newPerson: ");
				console.log(newPersons[0]);
				res.render("personUpdate.pug", {title: "update a person", person: newPersons[0]});
			}

		});
	})
};
//search and jump to person_search_results.pug
exports.person_search_interface_get = function(req, res){
	console.log("enter person_search_interface_get");
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test", {useMongoClient:true});
	promise.then(function(db){
		console.log("new connection");
		console.log("req.query.name: "+req.query.name);
		if(req.query.name){
			if(req.query.age){
				personModel.find({name:req.query.name, age: req.query.age}).exec(function(err, results){
					if(err) return;
					console.log("age, name");
					console.log(results);
					res.render("person_search_results.pug", {title: "person search results", persons: results})
				});
			}else{
				personModel.find({name:req.query.name}).exec(function(err, results){                                        						    if(err) return;
					console.log("name");
                                        res.render("person_search_results.pug", {title: "person search results", persons: results})
                                });
			}
		}else{
			if(req.query.age){
 				personModel.find({name:req.query.age}).exec(function(err, results){                                                             			    if(err) return;
					console.log("age");
                                        res.render("person_search_results.pug", {title: "person search results", persons: results})
                                });
			}else{
				console.log("no");
				res.render("person_search_results.pug",{title: "no matched person"});
			}
		}
	});

};

//handle person update on post
exports.person_update_post = function(req, res){
        var mongoose = require("mongoose");
        mongoose.Promise = require("bluebird");
        var promise = mongoose.connect("mongodb://localhost/test",{useMongoClient: true});
        promise.then(function(db){
                console.log("after connect to database");
                var newPerson = new personModel({name:req.body.name, age:req.body.age, _id:req.body._id});
		console.log("mongoose.Types.ObjectId(req.body.id): "+mongoose.Types.ObjectId(req.body.id));
                personModel.findById(req.params.id, function(err, result){
			console.log(result);
			if(err){return;}
			result.name = req.body.name;
			result.age = req.body.age;
			result.save(function(err, result){
				if(err) return;
				personModel.find().exec(function(err, results){
					res.render("person_list.pug",{title:"person list", persons:results});	
				});
			});
			});
		});
};

//jump to person_search.pug(fill in blanks)
exports.person_search_get = function(req, res){
	res.render("person_search.pug",{title:"person search"});
};


//person_search_get_ios
exports.person_search_get_ios = function(req, res){
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test", {useMongoClient:true});
	promise.then(function(db){
		console.log("connect");
		personModel.find().exec(function(err, results){
			res.json(results);
		});
	});

};
//person_create_post_ios
exports.person_create_post_ios = function(req, res){
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	console.log("after promise");
	var promise = mongoose.connect("mongodb://localhost/test",{useMongoClient: true});
	promise.then(function(db){
		console.log("connect");
		var newPerson = new personModel({name:req.body.name, age: req.body.age});
		newPerson.save(function(err, theNew){
			console.log("enter save");
			if(err){
				console.log("error when save newPerson");
				return;
			}else{
				console.log("successfully save");
				personModel.find({_id:newPerson._id}).exec(function(err, result){
					if(err) return;
					console.log("found the new");
					res.json(result);
				});
			}
		});
		
	});

};
//person_delete_post_ios
exports.person_delete_post_ios = function(req, res){
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test", {useMongoClient: true});
	promise.then(function(db){
		personModel.find({_id:req.body._id}).remove().exec(function(err){
			if(err) return;
			console.log("successfully delete via ios");
			res.json({"result":"successfully removed"});
		});

	});

};
//person_update_post_ios
exports.person_update_post_ios = function(req, res){
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test",{useMongoClient:true});
	promise.then(function(db){
		personModel.find({"_id":req.params.id}).exec(function(err, results){
			var result = results[0];
			result.name = req.body.name;
			result.age = req.body.age;
			console.log("result.age:"+result.age+", result.name:"+result.name);
			result.save(function(err){
				if(err) return;
				res.json({"result": "successfully update"});
				console.log("successfully update");
			}); 
		});
	
	});

};
//person_search_one_get_ios
exports.person_search_one_get_ios = function(req, res){
	var mongoose = require("mongoose");
	mongoose.Promise = require("bluebird");
	var promise = mongoose.connect("mongodb://localhost/test",{useMongoClient:true});
	promise.then(function(db){
		console.log("req.query.name"+req.query.name+"req.query.age"+req.query.age);
		personModel.find({name:req.query.name, age:req.query.age}).exec(function(err, results){
			if(err) return;
			console.log("search one succeed");
			res.json(results);
		});
	});
};
