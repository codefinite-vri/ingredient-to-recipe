
export const getRemedies = () => fetch("/api/home-remedies").then(res => res.json());

export const getRecipes = async (search,cookTimes) => {
    const decoded = decodeURIComponent(search);
    let url = '';
    if(decoded.length > 0)
        url = `/api/recipes${decoded}&cookTimes=${cookTimes}`; 
    else
        url = `/api/recipes${decoded}`;

    console.log(url)
    const res = await fetch(url);
    return await res.json();

}

export const getFavRecipes = async (user) =>{
    const res = await fetch(`/api/users/${user}/favorites`);
    const jsonData  = await res.json();
    if(jsonData.length > 0)
        return jsonData[0].Favorites.map(obj =>
            ({title : obj.recipeTitle , 
            id : obj._id,
            ingredients:obj.ingredients,
            instructions:obj.instructions,
            images:obj.image,
            cooktime : obj.cookTime,
            servings : obj.servings

    }));
    else return [];
}

export async function getFavorites(user){
    const res = await fetch(`/api/users/${user}/favorites/show`);
    return await res.json();
}

export async function addFavorites(user,recipeID){
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
    const res = await fetch(`/api/surprise-recipe`,
    { method: 'POST', 
    headers: {'Content-Type':'application/json',}, 
    body: JSON.stringify(surprise)});
    return await res.json();
}

export async function getImageSearch(url){
    console.log("in ImageSearch API");
    return fetch("/api/imageSearch/?url="+url).then(res => res.json());
}