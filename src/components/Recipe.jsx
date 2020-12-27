import React, { useState } from "react";

function Recipe(props) {

  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
   setActive(!isActive);
 };

  return (
    <div className = "recipe" onClick={handleToggle}>
      <h1>{props.title}</h1>
      <p >Calories: {props.calories}</p>
      <img src= {props.image}></img>
      <ul className = {isActive ? "hidden" : "show"}>
      {props.ingredients.map(item =>{
        return <li>{item.text}</li>
      })}
      </ul>
    </div>
  );
}

export default Recipe;
