const mongoose = require('mongoose');

//popularSearch schema

let popularSearchSchema = new mongoose.Schema({
    name: String,
    count:{type:Number, default:0 }
})

module.exports = mongoose.model('PopularSearch', popularSearchSchema,'popularSearches');
//3rd arguement is explicit collection name