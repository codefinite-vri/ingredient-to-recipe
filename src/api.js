
export const getRemedies = () => fetch("/api/home-remedies").then(res => res.json());

export const getRecipes = async (search,cookTimes,servings,mode,allergies) => {

    let obj = {mode:mode, searchTerm:search, cookTimes:cookTimes, servings:servings,allergies:allergies}
    //console.log(obj)
    const res = await fetch(`/api/recipes`,
        { method: 'POST', 
        headers: 
            {   'Content-Type':'application/json',
                'Accept': 'application/json'
            }, 
    body: JSON.stringify(obj)});
    return await res.json();
    
/*    const decoded = decodeURIComponent(search);
    let url = '';
    if(decoded.length > 0 ){
        if(cookTimes.length > 0 && servings)
            url = `/api/recipes${decoded}&cookTimes=${cookTimes}&servings=${servings}&mode=${mode}`; 

        else if(cookTimes.length > 0 && !servings)
            url = `/api/recipes${decoded}&cookTimes=${cookTimes}&mode=${mode}`; 

        else if(cookTimes.length === 0 && servings)
            url = `/api/recipes${decoded}&servings=${servings}&mode=${mode}`; 
        
        else 
            url = '/api/recipes'
    }

    else {
        if(cookTimes.length > 0 && servings)
        url = `/api/recipes?cookTimes=${cookTimes}&servings=${servings}&mode=${mode}`; 

        else if(cookTimes.length > 0 && !servings)
            url = `/api/recipes?cookTimes=${cookTimes}&mode=${mode}`; 

        else if(cookTimes.length === 0 && servings)
            url = `/api/recipes?servings=${servings}&mode=${mode}`; 
            
        else
            url = `/api/recipes?mode=${mode}`; 
    }

        
    const res = await fetch(url);
    //console.log(res)
    return await res.json();
*/
}

export const getFavRecipes = async (user) =>{
    const res = await fetch(`/api/users/${user}/favorites`);
    const jsonData  = await res.json();
    if(jsonData.length > 0)
        return jsonData[0].Favorites.map(obj =>
            ({title : obj.recipeTitle , 
            id : obj._id,
            likes:obj.likes,
            ingredients:obj.ingredients,
            instructions:obj.instructions,
            images:obj.image,
            cooktime : obj.cookTime,
            servings : obj.servings

    }));
    else return [];
}

export async function getFavorites(user){
    //console.log(user)
    const res = await fetch(`/api/users/${user}/favorites/show`);
    return await res.json();
}

export async function addFavorites(user,recipeID){
    //console.log(user,recipeID)
    const res = await fetch(`/api/users/${user}/favorites/add/${recipeID}`);
    return await res.json();
}

export async function delFavorites(user,recipeID){
    const res = await fetch(`/api/users/${user}/favorites/del/${recipeID}`);
    return await res.json();
}

export function createShop(user){
    const data = { userID: user };
    console.log("in createshop API")
    fetch("/api/createShop",{ method: 'POST', headers: {'Content-Type':'application/json',}, body: JSON.stringify(data),}).then(res => console.log(res));
}

export function getShopList(user){
    console.log("in getshop API")
    return fetch("/api/userShopList/"+user).then(res => res.json());
}

export function addShopList(user,item){
    console.log("in updateshop add API")
    return fetch("/api/userShopList/add/"+user+"/"+item).then(res => res.json());
}

export function delShopList(user,item){
    console.log("in updateshop del API")
    return fetch("/api/userShopList/del/"+user+"/"+item).then(res => res.json());
}

export async function getMeals(user) {
    const res = await fetch(`/api/users/${user}/mealPlanner/show`);
    return await res.json();
}

export async function getMealRecipe(recipeID) {
    const res = await fetch(`/api/recipes/${recipeID}`);
    return await res.json();
}

export async function addMeal(user,meal)
{
   const res = await fetch(`/api/users/${user}/mealPlanner/add`,
    { method: 'POST', 
    headers: {'Content-Type':'application/json',
            'Accept': 'application/json'}, 
    body: JSON.stringify(meal)});
    return await res.json();
}

export async function delMeal(user,mealID)
{
    const res = await fetch(`/api/users/${user}/mealPlanner/${mealID}/del`);
    return await res.json()
}

export async function editMeal(user,id,meal)
{
    const res = await fetch(`/api/users/${user}/mealPlanner/${id}/edit`,

    { method: 'POST', 
    headers: {'Content-Type':'application/json',}, 
    body: JSON.stringify(meal)});
    return await res.json();
}

export async function getSurpriseRecipe(user,allergenArr,randomIng){
    const surprise = {email:user, allergens: allergenArr , ing:randomIng};
    //console.log(surprise)
    const res = await fetch(`/api/surprise-recipe`,
    { method: 'POST', 
    headers: {'Content-Type':'application/json',}, 
    body: JSON.stringify(surprise)});
    return await res.json();
}

export function getImageSearch(url){
    console.log("in ImageSearch API");
    return fetch("/api/imageSearch/?url="+url).then(res => res.json());
}

export async function postImgbb(img){
    console.log("in Imgbb API");
    const obj ={base64:img}
    try{
        let response = await fetch("/api/imgbb", {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Accept': 'application/json'}, 
            body: JSON.stringify(obj)
        });
        if(response.ok) {
            return response.json();
        }
    }catch(error){
        console.log(error)
    }
}

export async function submitRecipe(username,email,recipe)
{
    const obj ={username:username,email:email,recipe:recipe}
    console.log('in add api')
    console.log(obj);
   const res = await fetch(`/api/tempRecipes/add`,
    { method: 'POST', 
    headers: {'Content-Type':'application/json',
            'Accept': 'application/json'}, 
    body: JSON.stringify(obj)});
    return await res.json();
}

export async function getTempRecipes(){
    const res = await fetch('/api/tempRecipes');
    return await res.json();
}

export async function approveRecipe(recipe)
{
    const obj ={recipe:recipe}
    console.log(obj);
   const res = await fetch(`/api/TempRecipes/accept`,
    { method: 'POST', 
    headers: {'Content-Type':'application/json',
            'Accept': 'application/json'}, 
    body: JSON.stringify(obj)});
    return await res.json();
}

export async function rejectRecipe(recipe,comment)
{
    const obj ={recipe:recipe, comment:comment}
    console.log(obj);
   const res = await fetch(`/api/tempRecipes/reject`,
    { method: 'POST', 
    headers: {'Content-Type':'application/json',
            'Accept': 'application/json'}, 
    body: JSON.stringify(obj)});
    return await res.json();
}

export async function getMyRecipes(userid){
    const res = await fetch(`/api/users/${userid}/myRecipes`);
    const data = await res.json();
    console.log(data);
    return data;
}

export function getImgbb(url){
    console.log("in ImageSearch API");
    return fetch("/api/imgbb/?url="+url, {method: 'POST'}).then(res => res.json());
}

export async function getPopularChips(){
    const res = await fetch(`/api/popularSearch`);
    const data = await res.json();
    console.log(data);
    return data;
}

export async function getAllergens(email){
    const res = await fetch(`/api/users/${email}/allergens`);
    const data = await res.json();
    console.log(data);
    return data;
}

export async function getIngredients(){
    const res = await fetch(`/api/ingredients`);
    const data = await res.json();
    console.log(data);
    return data;
}