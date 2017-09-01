var mongoose = require("mongoose");
var schema = mongoose.Schema;
var someModelSchema = new schema({
	name:String,
	age:Number
});
var someModel = mongoose.model("someModel", someModelSchema);
module.exports = someModel;
