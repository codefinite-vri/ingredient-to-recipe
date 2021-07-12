const mongoose = require('mongoose');

//myRecipe schema
var myRecipeSchema = new mongoose.Schema({
    userID : {type: String, unique:true, required:true},
    AcceptedRecipes:[
        {    
        type:mongoose.Schema.Types.ObjectId,
        ref:"Recipe"
    }
    ],
    PendingRecipes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'TempRecipe'
        }],

    RejectedRecipes:[
      {
        recipeTitle:String,
        comment:String,
        rejectionDate:Date
    }
    ],
});

module.exports = mongoose.model('MyRecipe', myRecipeSchema);
