const   express = require('express'),
        app = express(),
        cors = require('cors'),
        mongoose = require('mongoose'),
        DadiKeNuske = require('./models/dadiKeNuske.js'),
        Recipe = require('./models/recipe.js'),
        TempRecipe = require('./models/tempRecipe.js'),
        Favorite = require('./models/favorite.js'),
        shopList = require('./models/shopList.js'),
        MealPlan = require('./models/mealPlan'),
        Meals = require('./models/meals'),
        User = require('./models/user'),
        Ingredient = require('./models/ingredient'),
        MyRecipe = require('./models/myRecipe'),
        PopularSearch = require('./models/popularSearch'),
        PORT = 8080;


const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

app.use(express.json())
app.use(cors());

const imgApiKey=process.env.IMAGE_API_KEY;
const imgApiSecret=process.env.IMAGE_API_SECRET;
const uri = process.env.MONGO_DB_URI;
var MongoClient = require('mongodb').MongoClient;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));;

app.get('/api/home-remedies',(req,res) => {
    DadiKeNuske.find({},(err,dKNFound) =>{
        if(err) console.log(err);
        else {
        res.json(dKNFound);
        }
    });
});


app.post('/api/recipes', (req,res) => {
    console.log(req.body)
    let searchArray = [] , obj_arr = [], query, allergies = '',
    searchTerm = req.body.searchTerm
    const allergArray = req.body.allergies;
    

    const 
          mode = req.body.mode,
          servings = req.body.servings,
          cookTime = req.body.cookTimes;

    if(mode === 'Ingredient' && searchTerm.length > 0){
        searchArray = searchTerm.split(' ');
        let newSA = searchArray.map(sa => sa.charAt(0).toUpperCase() + sa.slice(1))

    newSA.forEach(sa => {
        if(sa.length > 0)
            PopularSearch.findOneAndUpdate({'name': sa},{$inc:{'count':1}},{new:true,upsert:true},
            (err,ps) => {
                if(err)
                    console.log(err)
                else console.log(ps)
            }
            )
    })        
    }

    //if cooktime filter is used     
    if(cookTime.length > 0){ 
        let obj = {}, i = 0;

        while(i < cookTime.length){
            if(i === cookTime.length-1)
                if(cookTime%2 !== 0)
                    { //last statement 
                    obj = {cookTime: {$gte:150}};
                    break;
                }
            
            obj = {$and: [{"cookTime": {$gte: cookTime[i]}},{"cookTime": {$lte: cookTime[i+1]}},]};
            i += 2 ;
            
            obj_arr.push(obj);
    }}
   
   if(searchTerm === undefined || searchTerm === ''){
    allergies = allergArray.join('|')
    if(cookTime.length > 0 && servings && allergies.length > 0) //111
    query = {$and: [
        {$or: obj_arr},
        {ingredients : { $not: { $regex:  allergies, $options: 'i'}}},
        {'maxServings':{$lte: servings}}]}

    else if(cookTime.length > 0 && !servings && allergies.length > 0) //101
        query = 
        {
            $and: [{$or: obj_arr},{ingredients : { $not: { $regex:  allergies, $options: 'i'}}}]
        }
        
    
    else if(!cookTime.length > 0 && !servings && allergies.length > 0) //001
        query = 
        {ingredients : { $not: { $regex:  allergies, $options: 'i'}}}
    
        
    else if(!cookTime.length > 0 && servings && allergies.length > 0) //011
        query = {$and: [{'maxServings':{$lte: servings}},
        {ingredients : { $not: { $regex:  allergies, $options: 'i'}}}
    ]}

    else if(cookTime.length > 0 && !servings && allergies.length === 0) //100
        query = {$or: obj_arr}
    
    else if(!cookTime.length > 0 && servings && allergies.length === 0) //010
        query = {'maxServings':{$lte: servings}}
    
    else query = {} //000

        console.log(query)

    Recipe.find(query,(err,recipesFound) =>{
        if(err) console.log(err);
        else {
        //console.log(recipesFound)
        res.json(recipesFound);
        }
    }).limit(12).sort({'likes': -1}) //descending order sort based on number of likes
}

else{ 
    console.log('in else')
    allergies = allergArray.map(aa => '-' + aa).join(' ');
    searchTerm += ' ' + allergies

    if(cookTime.length > 0 && servings)
        query = {$and: [
            {$or: obj_arr},
            {'maxServings':{$lte: servings}},
            {$text : {$search : searchTerm,$caseSensitive :false}}]} ;
    
    else if(cookTime.length > 0 && !servings)
        query = {$and: [
            {$or: obj_arr},
            {$text : {$search : searchTerm,$caseSensitive :false}}]} ;  
            
    else if(!cookTime.length > 0 && servings)
        query = {$and: [
        {'maxServings':{$lte: servings}},
        {$text : {$search : searchTerm,$caseSensitive :false}}]} ;
    
    else 
        query = {$text : {$search : searchTerm,$caseSensitive :false}} ;

console.log(query)
    Recipe.find( query ,  
        { score : { $meta: "textScore" } } , 
        function(err,recipesFound)
        {
            if(err) console.log(err);
            else {
            res.json(recipesFound);
            }
        }).limit(12).sort({ score : { $meta : 'textScore' } });
}

})

/*
app.get('/api/recipes',(req,res) => {
    let searchTerm = req.query.search_query;
    let mode = req.query.mode;
    let searchArray = [];
    let query,obj_arr = [],servings,cookTime = [];

    if(mode === 'Ingredient'){
        searchArray = searchTerm.split(' ');
        let newSA = searchArray.map(sa => sa.charAt(0).toUpperCase() + sa.slice(1))

    newSA.forEach(sa => {
        if(sa.length > 0)
            PopularSearch.findOneAndUpdate({'name': sa},{$inc:{'count':1}},{new:true,upsert:true},
            (err,ps) => {
                if(err)
                    console.log(err)
                else console.log(ps)
            }
            )
    })        
    }

    //if cooktime filter is used 
    if(req.body.cookTimes){ 
        cookTime = req.query.cookTimes.split(',').map(ct => parseInt(ct)); 
        let obj = {}, i = 0;

        while(i < cookTime.length){
            if(i === cookTime.length-1)
                if(cookTime%2 !== 0)
                    { //last statement 
                    obj = {cookTime: {$gte:150}};
                    break;
                }
            
            obj = {$and: [{"cookTime": {$gte: cookTime[i]}},{"cookTime": {$lte: cookTime[i+1]}},]};
            i += 2 ;
            
            obj_arr.push(obj);
    }}
    
    //if servings filter is used
    if(req.query.servings){ 
         servings = parseInt(req.query.servings);
    }

    if(searchTerm === undefined || searchTerm === ''){

        if(cookTime.length > 0 && servings)
        query = {$and: [
            {$or: obj_arr},
            {'maxServings':{$lte: servings}}]}

        else if(cookTime.length > 0 && !servings)
            query = {$or: obj_arr}
        
        else if(!cookTime.length > 0 && servings)
            query = {'maxServings':{$lte: servings}}
        
        else query = {}

        Recipe.find(query,(err,recipesFound) =>{
            if(err) console.log(err);
            else {
            res.json(recipesFound);
            }
        }).limit(12).sort({'likes': -1}) //descending order sort based on number of likes
    }

    else{ 
        console.log('in else')

        if(cookTime.length > 0 && servings)
            query = {$and: [
                {$or: obj_arr},
                {'maxServings':{$lte: servings}},
                {$text : {$search : searchTerm,$caseSensitive :false}}]} ;
        
        else if(cookTime.length > 0 && !servings)
            query = {$and: [
                {$or: obj_arr},
                {$text : {$search : searchTerm,$caseSensitive :false}}]} ;  
                
        else if(!cookTime.length > 0 && servings)
            query = {$and: [
            {'maxServings':{$lte: servings}},
            {$text : {$search : searchTerm,$caseSensitive :false}}]} ;
        
        else 
            query = {$text : {$search : searchTerm,$caseSensitive :false}} ;


        Recipe.find( query ,  
            { score : { $meta: "textScore" } } , 
            function(err,recipesFound)
            {
                if(err) console.log(err);
                else {
                res.json(recipesFound);
                }
            }).limit(12).sort({ score : { $meta : 'textScore' } });
}});

app.get('/api/recipes/:recipeID', (req,res)=>{
    Recipe.findById(req.params.recipeID,(err,recFound) =>{
        if(err) console.log(err);
        else{
            console.log(recFound);
            return res.json(recFound);
        }
    })
})

*/


app.post('/api/createShop',(req,res) => {
    console.log("In createshop");
    shopList.exists({'userID': req.body.userID},function (err, doc){
        if (err){
            console.log(err)
        }else{
            if(!doc){
                MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("recipe-app");
                    var myobj = { userID: req.body.userID };
                    dbo.collection("shoppingList").insertOne(myobj, function(err) {
                    if (err) throw err;
                    db.close();
                    console.log("ShoppingList Document created");
                    res.send();
                    });
                });
            }else{
                console.log("ShoppingList Document Exists");
                res.send();
            }            
        }
    });
});

app.get('/api/userShopList/:id',(req,res) => {
    shopList.findOne({ 'userID': req.params.id }, 'userID Items', function (err, list) {
        if (err) return handleError(err);
        // console.log(list);
        res.json(list);
      });
});

app.get('/api/userShopList/add/:id/:item',(req,res) => {
    shopList.exists({'userID': req.params.id, Items:{"$in": [req.params.item]}},function (err, doc){
        if (err){
            console.log(err)
        }else{
            //console.log("Result :", doc);
            if(doc==false){
                shopList.findOneAndUpdate({'userID': req.params.id}, { $push:{Items:req.params.item} }, {new:true}, function (err, list) {
                if (err) return handleError(err);
                // console.log(list);
                res.json(list);
              });
            }else{
                res.json({Items: [],
                    _id: null,
                    userID: "Item Already Exists!"});
            }
        }
    });

    
});

app.get('/api/userShopList/del/:id/:item',(req,res) => {
    shopList.findOneAndUpdate({'userID': req.params.id}, { $pull:{Items:req.params.item} }, {new:true, multi:false}, function (err, list) {
        if (err) return handleError(err);
        // console.log(list);
        res.json(list);
      });
});

app.get('/api/users/:userid/favorites/add/:id' , (req,res) => {
    console.log(req.params.userid,req.params.id)
    //favorite.exists({ userID: req.params.userid }).then(exists =>{
        //if(exists){
            Favorite.findOneAndUpdate(
                { userID: req.params.userid }, 
                { $addToSet: { Favorites: req.params.id } },{new:true,upsert:true},(err,updateFav) =>{
                    if(err) console.log(err);
                    //else console.log(updateFav);
                }
                );

            Recipe.findByIdAndUpdate(req.params.id,{$inc:{likes:1}},{new:true},(err,recUp) =>{
                    if(err) console.log(err)
                    //else console.log(recUp)
            })
       /* }
        else
        {favorite.create({userID: req.params.userid, 
            $push: { Favorites: req.params.id }},(err,newFav) =>{
            if(err) console.log(err);
            })}
    })*/

})

app.get('/api/users/:userid/favorites/show' , (req,res) => {
    Favorite.exists({ userID: req.params.userid }).then(exists =>{
        if(exists){
            Favorite.find(
                { userID: req.params.userid },{Favorites:1,_id:0},{new:true} ,(err,allFavs) =>{
                    if(err) console.log(err);
                    //console.log(allFavs[0].Favorites)
                    else 
                    res.send(allFavs)
                }
                );
        }
        else return [];
    })

})

app.get('/api/users/:userid/favorites',(req,res) =>{
    Favorite.find({ userID: req.params.userid }).populate("Favorites").exec(function (err, favs)
    {
        if (err) console.log(err);
        else 
        return res.json(favs);
    })    
})


app.get('/api/users/:userid/favorites/del/:id' , (req,res) => {
            Favorite.findOneAndUpdate(
                { userID: req.params.userid }, 
                { $pull: { Favorites: req.params.id } },(err,delFav) =>{
                    if(err) console.log(err);
                }
            );

            Recipe.findByIdAndUpdate(req.params.id,{$inc:{likes:-1}},{new:true},(err,recUp) =>{
                if(err) console.log(err)
               // else return true;
        })
})

app.post('/api/users/:userid/mealPlanner/add',(req,res) =>{
        MealPlan.create(req.body , (err,newMeal) =>{
            if(err) console.log(err)
            else{
                        Meals.findOneAndUpdate(
                            { userID: req.params.userid }, 
                            { $push: { Meals: newMeal._id } },{upsert:true},(err,addMeal) =>{
                                if(err) console.log(err);
                            }
                            );                    
                }
                let obj = newMeal.toJSON();
                obj.id = newMeal._id;
                delete obj._id;

                return res.json(obj);
            })

            
        })

app.get('/api/users/:userid/mealPlanner/show',(req,res) =>{
    Meals.exists({ userID: req.params.userid }).then(exists =>{
        if(exists){
            Meals.find({ userID: req.params.userid }).populate("Meals").exec(function (err, myMeals){
                    if (err) console.log(err);
                    else {
                        let obj_arr = [];
                        myMeals[0].Meals.forEach(meal => {
                            let obj = meal.toJSON();
                            obj.id = meal._id;
                            delete obj._id;
                            obj_arr.push(obj);
                        })
                        return res.json(obj_arr)
                    }
                })
        }
        else return [];
    })
})

app.get('/api/users/:userid/mealPlanner/:id/del' , (req,res) => {
    MealPlan.findByIdAndDelete(req.params.id,(err,del)=>{
        if(err) console.log(err);  
        else {
            if(del !== null){
                Meals.findOneAndUpdate(
                    { userID: req.params.userid }, 
                    { $pull: { Meals: req.params.id } },(err,delMealID) =>{
                        if(err) console.log(err);
                    }
                );
            }
            return res.redirect(`/api/users/${req.params.userid}/mealPlanner/show`)
        }
    }
        
    );
})

app.post('/api/users/:userid/mealPlanner/:id/edit',(req,res)=>{
    MealPlan.findByIdAndUpdate(req.params.id, {$set: req.body},
        {new:true} ,
        (err,updatedMeal) =>{
        if(err) console.log(err)
        else {
            return res.redirect(`/api/users/${req.params.userid}/mealPlanner/show`)
        }
    })
})

app.post('/api/surprise-recipe',(req,res)=>{
    User.find({email:req.body.email},(req,res)=>{
        //gets allergen details
    })
    const allergenArr = req.body.allergens;
    allergenArr.forEach((part,index) =>{
       allergenArr[index] = '-' + allergenArr[index];
    })
    
    const allergens = allergenArr.join(' ') ;
    const searchTerm  = req.body.ing;
    const filter = { ingredients: { $regex: searchTerm , $options :'i'} };
    Recipe.aggregate([
      { $match: filter },
      {$sample : {size:1}}
    ]).then((succ,err)=> {
        if(err) console.log(err)
      else if(succ.length > 0)
            res.json(succ[0])
    else res.json({})
    });
});

// app.get('/api/imageSearch',(req,res) => {
//     var unirest = require("unirest");
//     req = unirest("GET", "https://api.imagga.com/v2/tags");
//     req.query({
//     "image_url": "https://images.financialexpress.com/2020/02/2-94.jpg",
//     "version": "2"
//     });
//     req.headers({
//     "accept": "application/json",
//     "authorization": "Basic YWNjXzhiMDk2MGYwODViNzNhODo1YTIwYmZkY2QyN2U0NDI4YzJiMDBlZTUwMTRjYmNmNg=="
//     });


//      req.end(function (respons) {
//     if (res.error) throw new Error(res.error);
//     console.log(res.body);
//     return res.body;
//     });

// });

app.get('/api/imageSearch',(req,res) => {
    console.log(req.query.url);
    const got = require('got');
    const apiKey = imgApiKey;
    const apiSecret = imgApiSecret;

    //const imageUrl = req.query.url;
    const imageUrl = "https://images.financialexpress.com/2020/02/2-94.jpg";
    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);
    (async () => {
        try {
            const response = await got(url, {username: apiKey, password: apiSecret});
            console.log('in response')
            console.log(response.body);
            res.json(response.body);
        } catch (error) {
            console.log(error.response.body);
        }
    })();

});

app.post('api/imgbb',(req,res)=>{
    const imgbbUploader = require("imgbb-uploader");
        console.log("in analyse");
        imgbbUploader("7625ed871ffbb5f3484ecd40733526e6", "/home/rushabh/React Projects/BE Project/Ingredient-to-Recipe App/public/images/home006.jpg")
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
});


//adds user submitted recipe to temporary collection
app.post('/api/tempRecipes/add',(req,res) => {
    const data = req.body;
    const email = data.email;
    const author = data.username;
    /**
     * cooktime comes as string. must first isolate minutes,hours etc from it [use regex], then convert to int
     * ingredients comes as an object array of ingname and amount. need to join these 2 fields
     * an additional array of ingredient names to be maintained to update ingredient collection
     * servings comes as a string. use regex to get maxServings
     * iterate through instruction object array and extract step strings
     */

    console.log(data)
    let regex = new RegExp('[0-9]+')
    let cookTime = parseInt(data.recipe.cookTime.match(regex))

    let ingList = data.recipe.ingredients.map(ing => ing.amount+ " " + ing.ingName); //array
    const ingNames = data.recipe.ingredients.map(ing => ing.ingName); //array
    const ingStr = ingList.join('$') //delimeter between 2 consecutive ingredients
    let servings = data.recipe.servings;

    //extract numerical servings from string
    let num_arr = [], max = 0;
    let num = servings.match(regex)
    for(let i = 0 ; i< num.length; i++){
        if(num[i] !== '')
            {
            num_arr.push(parseInt(num[i]))
            i += 1
        }        
    }

    if(num_arr.length === 0)
        max = 1;

    else if(num_arr.length === 1 || num_arr.length > 2)
        max = num_arr[0];

    else if(num_arr.length === 2) 
        if(servings.includes('to'))
            max = num_arr[1];
        else
            max = num_arr[0];

    if(servings.includes('dozen'))
        if(num_arr.length === 1)
            max = num_arr[0] * 12;
        else if(num_arr.length === 2)
            max = num_arr[1] * 12;

    //get instruction list
    let instList = data.recipe.procedure.map(inst => inst.step);

    let tmp = {
        userEmail:email,
        cookTime: cookTime,
        image: data.recipe.image,
        ingredients: ingStr,
        ingredientNameList: ingNames,
        recipeTitle : data.recipe.recipeName,
        servings : data.recipe.servings,
        instructions : instList,
        author:author,
        maxServings:max
    }

    console.log(tmp)

        //add recipe to temp database collection
        TempRecipe.create(tmp,(err,newTempRecipe)=>{
            if(err) console.log(err)
            else{
                //add recipe to users myrecipes list
               // myRecipe.exists({ userID: email }).then(exists =>{
                   // if(exists){
                        console.log('my recipe exists')
                        MyRecipe.findOneAndUpdate(
                            { userID: email }, 
                            { $push: { PendingRecipes: newTempRecipe._id } },{upsert:true,new:true},(err,updatePRec) =>{
                                if(err) {
                                    console.log(err);
                                    res.json(false);
                                }
                                else {
                                    //console.log(updatePRec);
                                    res.json(true);
                                }
                            }
                            );
                 /*   }
                    else
                   {
                        console.log('my recipe does not exist')
                        myRecipe.create({userID: email, 
                        $push: { PendingRecipes: newTempRecipe._id }},(err,newPRec) =>{
                        if(err) console.log(err);
                        else console.log(newPRec)
                        })
                    }
                })*/
            }
        })
})


// adds new recipe to recipe collection
app.post('/api/tempRecipes/accept', (req,res) =>{
    /**
     * get recipe id from params
     * query the temp collection for this id
     * ---------------------------------------------- above may not be needed if object is passed from server
     * put this temp recipe object in permanent recipe db
     * remove the temp recipe doc from temprecipes
     */
    const data = req.body.recipe;
    const newrecipe = {
        cookTime: data.cookTime,
        image: data.image,
        ingredients: data.ingredients,
        recipeTitle : data.recipeTitle,
        servings : data.servings,
        instructions : data.instructions,
        maxServings:data.maxServings
    };
    const recipeID = data._id;
    const email = data.userEmail;


    //add recipe to permanent database
    
        Recipe.create(newrecipe,(err1,vnewRecipe)=>{
            if(err1) console.log(err1)
            else{
            //add recipe to users accepted recipes list and remove from pending list
                    MyRecipe.findOneAndUpdate(
                        { userID: email }, 
                        {$pull: { PendingRecipes: recipeID } ,  
                        $push: { AcceptedRecipes: vnewRecipe._id }},
                        {new:true},(err2,accRecipe) =>{
                            if(err2) console.log(err2);
                           // else console.log(accRecipe)
                        }
                        );

           
                    const ingred = data.ingredientNameList; //array of ingredients
            
                    Ingredient.find({}, (err3,ingFound) => {
                        if(err3)
                            console.log(err3);
                        else {                    
                            Ingredient.findOneAndUpdate({_id : ingFound._id},
                                { $addToSet: { Ingredients: { $each:  ingred} } },
                                {upsert:true},
                                (err1,addedIngs) =>{
                                    if(err1) console.log(err1);
                                    //else console.log(addedIngs)
                                }
                                )
                        }
                    })
                
            }
        })
   
        TempRecipe.findByIdAndDelete(recipeID,(err,rec) =>{
            if(err)
                {console.log(err); return false;}
            else return true;
        })
})

//rejection of recipe by admin
app.post('/api/tempRecipes/reject', (req,res) => {
    /**
     * comment,recipe & user object present in body
     * remove from pending
     * add appropriate data to rejected recipes [my recipes]
     * redirect to route to delete from temp
     */
    const date = new Date().toISOString();
    const recipe = req.body.recipe;
    let rej ={ 
       comment: req.body.comment,
       rejectionDate:date,
       recipeTitle: recipe.recipeTitle
    };
       

            MyRecipe.findOneAndUpdate({userID:recipe.userEmail},
                 { $pull: { PendingRecipes: recipe._id } },{new:true},(err,pen) =>{
                     if(err) console.log(err);
                     //else console.log(pen)
                 }
                )

            MyRecipe.findOneAndUpdate({userID:recipe.userEmail},
                    { $push: { RejectedRecipes: rej } },{new:true},(err,reje) =>{
                        if(err) console.log(err);
                        //else console.log(reje)
                    }
                   )

        TempRecipe.findByIdAndDelete(recipe._id,(err,rec) =>{
                    if(err){
                        console.log(err); return false;}
                    else return res.json(true);
                })
        
})

//get all pending recipes
app.get('/api/tempRecipes',(req,res) =>{
    TempRecipe.find({},(err,tFound) => {
        if(err) 
            console.log(err);

        else{
           res.json(tFound);
        }
    })
})

//get myrecipes
app.get('/api/users/:userid/myRecipes',(req,res) =>{
    MyRecipe.find({userID: req.params.userid})
    .populate({path: 'AcceptedRecipes', model: 'Recipe'})
    .populate({path: 'PendingRecipes', model: 'TempRecipe'}).exec((err,myrecs) => {
        if(err)
            console.log(err)
            
        //else {console.log(myrecs)
        return res.json(myrecs);//}
    })
})

app.get('/api/popularSearch', (req,res) =>{
    PopularSearch.find({},(err,popSearches) => {
        let obj_arr = [];
        if(err) console.log(err)
        else {
            popSearches.forEach(ps => {
                let obj = {};
                obj['src'] = 'chip';
                obj['label'] = ps.name;
                obj['key'] = ps._id;

                obj_arr.push(obj);
            })

            return res.json(obj_arr)
        }
    }).limit(12).sort({count:-1})
})

app.get('/api/users/:userid/allergens' , (req,res)=>{
    User.findOne({email:req.params.userid},(err,foundUser) => {
        if(err) console.log(err)
        else res.json(foundUser.Allergens)
    })
})

app.get('/api/ingredients' , (req,res)=>{
    Ingredient.find({},(err,foundIng) => {
        if(err) console.log(err)
        else res.json(foundIng[0].Ingredients)
    })
})

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

