const mongoose = require('mongoose');

//dadiKeNuske schema
var dadiKeNuskeSchema = new mongoose.Schema({
	ailment_category: String,
	ailment_name: String,
	methods: String
});

module.exports = mongoose.model('DadiKeNuske', dadiKeNuskeSchema,"dadiKeNuske");
