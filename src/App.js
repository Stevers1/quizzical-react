
import './App.css';
import React, { useEffect } from 'react';
import Question from './Components/Question';
import { nanoid } from 'nanoid' 


function App() {
  const he = require('he');
  const [firstLogin, setLogin] = React.useState(true)
  const [data, setData] = React.useState([])
  const [formQuestion, setFormQuestion] = React.useState(null) //To change with options

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  
  useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data1 => {
      setData(data1)
      const questionsObj = data1.results.map(question => {
        let allChoices = [...question.incorrect_answers, question.correct_answer]
        shuffleArray(allChoices)
        return {
          question: question.question, 
          correct:question.correct_answer, 
          isCorrect:false, 
          id: nanoid(), 
          value:"",
          allOptions: allChoices
        }
      })
      setFormQuestion(questionsObj)
    })
  },[])
    console.log(formQuestion);

  function renderQuestions() {
    if(data.results){
      const arrayQuestions= formQuestion.map((el,index) => {

        const decodedQ = he.decode(el.question);

        return <Question 
          key= {el.id}
          id = {el.id}
          question = {decodedQ} 
          incorrect ={el.incorrect} 
          correct = {el.correct}
          handleOptions ={toggleHeld}
          name= {index}
          allOptions = {el.allOptions}
        />
      })
      return arrayQuestions
    }else {
      return <p>Wait until server respond</p>
    }
  }


  //For the options in question
  function toggleHeld(id,value) {
    setFormQuestion(prevValues => {
      return prevValues.map((el) => {
        if(id === el.id){
          return{...el, value:value}
        }else return {...el}
      })
    })
    console.log(formQuestion,"after")
  }
  function Login() {


    setLogin(prev => !prev)
  }
  
  

  
  return (
    <main>
      {firstLogin && 
        <div className='intial_screen'>
          <h1 className='title'>Quizzical</h1>
          <p>This app generates quiz questions to evaluate our knowledge made by <a href='https://github.com/Stevers1'>Esteban Serrano</a></p>
          <button className="glow-on-hover" onClick={Login}>Start Quiz!</button>
        </div>
      }
      {!firstLogin && 
        renderQuestions()
      }
    </main>

  );
}

export default App;
