const mongoose = require('mongoose');

//ingredient schema
var ingredientSchema = new mongoose.Schema({
    Ingredients:[String]
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
