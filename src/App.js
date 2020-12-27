import React,{useEffect, useState} from "react";
import Recipe from "./components/Recipe"
import './App.css';

function App() {

  const [recipes, setRecipes] = useState([])
  const [search , setSearch] = useState("")
  const [query , setQuery] = useState ("chicken")

  const app_id ="067b9e56"
  const app_key ="1ec712622dbb736f652cf6255936598e"
  const url = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`

  /*
  * we want render only when query changes
  * this way we save resources
  */
  useEffect(()=>{
    recipes_data()
  },[query])

  /*
  * we get the data from the api
  */
  const recipes_data =  async() => {
    try{
      let response = await fetch(url)
      let data = await response.json()
      console.log(data.hits[0].recipe);
      return setRecipes(data.hits)
      }catch(err) {
    alert(err); // TypeError: failed to fetch
      }
  }

  /*
  * we obtain the data that the user enters in the input
  */
  const update_search = (event) =>{
    return setSearch(event.target.value)
  }

  /*
  * with the click we save the user data in a variable that we will use to execute recipes_data
  * We do this step because we have the requests limited to 4 per minute
  */
  const click = (e)=>{
    e.preventDefault()
    setQuery(search)
    setSearch("") //empty input text
  console.log(query);
  }


  return (
    <div className="App">
      <form onSubmit = {click} >
        <input className="search_bar" type="text" value={search} onChange = {update_search}></input>
        <button>Search</button>
      </form>
        <div className="recipes">
          {recipes.map(item =>{
            return <Recipe
            key = {item.recipe.label}
            title = {item.recipe.label}
            calories = {Math.trunc(item.recipe.calories)}
            ingredients = {item.recipe.ingredients}
            image = {item.recipe.image}/>

          })
          }
        </div>
    </div>
  );
}

export default App;
