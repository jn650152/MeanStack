var mongoose = require("mongoose");
var schema = mongoose.Schema;
var personModel = require("./person");
var someModel = new schema({
	generic: String,
	owner: {type: String, ref: personModel},
	id : Number
});
module.exports = mongoose.model("petModel",someModel);
