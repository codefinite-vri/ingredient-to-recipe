const mongoose = require('mongoose');

//temp recipe schema
var tempRecipeSchema = new mongoose.Schema({
    userEmail:String,
    cookTime: Number,
    image: String,
    ingredients: String,
    ingredientNameList:[String],
    recipeTitle : String,
    servings : String,
    instructions : [
      {type:  String}
    ],
    uploadDate: { type: Date, default: Date.now },
    maxServings:Number
});

module.exports = mongoose.model('TempRecipe', tempRecipeSchema);
