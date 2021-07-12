const mongoose = require('mongoose');

//user schema
var user = new mongoose.Schema({
	email: {type:String,unique:true,required:true},
	Allergens : [String]
});

module.exports = mongoose.model('User', user);
