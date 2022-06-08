import React, { useState, Component, useEffect } from "react";
import '../Styles/App.css';
import Axios from 'axios';
export default function PopUp() {
    
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [answers, setAnswers] = useState([]);
  const [searches, setSearches] = useState([])
  const [query, setQuery] = useState("")
  const [temp, setTemp] = useState("")
  const survName = (localStorage.getItem("CreateSurveyName"));
  console.log(survName)

    const [autoAnswers, setAuto] = useState(["1 - strongly disagree ", "2- disagree", "3 - somewhat disagree", "4 - neither agree nor disagree ",
    "5 - somewhat agree ", " 6 - agree", "7 - strongly agree", "Prefer not to answer" ]);

  const [chars, setChars] = useState([])

  const [postList,setPostList] = useState([]);

  async function getSurveyQuestions(){
    try {
      const str = "http://localhost:4000/ProfChars/"
      const surveys = Axios.get(str)
      return (await surveys).data;
    } catch (err){
      console.log(err);
    }
  }
  
  useEffect(() => {getSurveyQuestions().then( result => {
    if (result){
      setPostList(result);
      
    }});
  }, []);

  function ShowChars(props){

    const rows = props.surveys.map((row) => {
      return(
        <tr key={row.Id}>
          <td>
            <button value = {row.characteristics} onClick = {addChar}>{row.characteristics}</button>
            </td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    )};



    const addChar = (e) => {
      setTemp(e.target.value)
      console.log(e.target.value)
      e.preventDefault();
      setChars(chars => chars.concat(temp))
      //setSearches(searches => searches.concat(query))
      //console.log(e.target.value)
    };

    const changeQ = (e) => {
      setQ(e.target.value)
      //console.log(e.target.value)
    };

    const changeA = (e) => {
      e.preventDefault();
      setA(e.target.value)
    };
    const keyPressed = ({ key }) => {
      // Capture search on Enter key
      if (key === "Enter") {
        handleClick()
      }
    }

    const handleClick = () => {

      setSearches(searches => searches.concat(query))
    }
    const submitHandler = e => {
      // Prevent form submission on Enter key
      e.preventDefault()
    }

  const updateQuery = ({ target }) => {
    // Update query onKeyPress of input box
    setQuery(target.value)
  }


  
  const DropDown = e => {
    return (
      <div>
      <li><a href="#">Lorem Ipsum</a></li> 
      <li><a href="#">Lorem Ipsum</a></li>
      <li><a href="#">Lorem Ipsum</a></li>
      <li><a href="#">Lorem Ipsum</a></li>
      </div>
    );
  }


    const Search = ({ query }) => <li>{query}</li>
      return (
        <div className="App">
          <h1>Add a question to Survey: {survName} </h1>
          {q}
          <h2>Add possible answers</h2>
          <div className = "overflow">
            <ul className="previousSearch">
              {searches.map((query, i) => (
                <Search
                  query={query}
                  // Prevent duplicate keys by appending index:
                  key={query + i}
                />
              ))}
            </ul>

            <ul className="chars">
              {chars.map((query, i) => (
                <Search
                  query={query}
                  // Prevent duplicate keys by appending index:
                  key={query + i}
                />
              ))}
            </ul>
          </div>
            <h1>
          {answers.map(v => <div>{v.value}</div>)}
          </h1>
          <div className="break" />
    
          <form onSubmit={submitHandler}>
            <div>
              <input
                className="search-field-input"
                placeholder="Question Name"
                type="text"
                onChange={changeQ}
                onKeyPress={keyPressed}
              />
              
              
            </div>
          </form>
          <form onSubmit={submitHandler}>
            <div>
              <input
                className="search-field-input"
                placeholder="Search for..."
                type="text"
                onChange={updateQuery}
                onKeyPress={keyPressed}
              />
              
              <button
                className="search-field-button"
                type="button"
                onClick={handleClick}
              >
                Add Answer
              </button>
              
            </div>
            <nav>

          <table>
            <tr>
            <td>
              <label for="touch"><span>Characteristics</span></label>               
              <input type="checkbox" id="touch"/> 

              <ul className="slide">
                <ShowChars surveys={postList}/>
              </ul>
            </td>
            <td>

            
            </td>
            </tr>
          </table>
            

        </nav> 
          </form>
        </div>
      )
}
    
  
  