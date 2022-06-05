import React, { useState } from "react";

function CreateS() {
 const [myArray, setList] = useState([]);
 const [q, setQ] = useState("");
 const [name, setName] = useState("");
  const [h1_Text, setHeading] = useState("");
  const [isMousedOver, setMouseOver] = useState(false);

  function handle_change1(event) {
    setName(event.target.value);
    console.log(event.target.value);
    // console.log(event);
    // console.log(event.target.type);
    // console.log(event.target.placeholder);
  }
  function handle_change(event) {
    setQ(event.target.value);
    console.log(event.target.value);
    // console.log(event);
    // console.log(event.target.type);
    // console.log(event.target.placeholder);
  }

  function handleMouseOver() {
    setMouseOver(!isMousedOver);
  }

  
  function handle_click(event) {
    setList(oldArray => [...oldArray, q]);
    event.preventDefault();
  }
  function handle_click1(event) {
    setName(name);
    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Survey Name: {name} </h1>
        <form onSubmit={handle_click1}>
            <input
            onChange={handle_change1}
            type="text"
            placeholder="Survey Name"
            value={name}
            />
           
        </form>
      <h1> Questions: {myArray} </h1>
        <form onSubmit={handle_click}>
            <input
            onChange={handle_change}
            type="text"
            placeholder="Question"
            value={q}
            />
            <button
            style={{ backgroundColor: isMousedOver ? "Yellow" : "white" }}
            type="submit"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOver}
            >
            Add Question
            </button>
        </form>
    </div>
  );
}

export default CreateS;
