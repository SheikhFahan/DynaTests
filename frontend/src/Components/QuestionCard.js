import React, {useState, useEffect} from 'react'

import axios from 'axios'

const QuestionCard = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [loading , setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);

    const easy_question_array = questions.easy_questions;
    
    
    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/api/tests/1/get_test/")
        .then((response) => {
            setQuestions(response.data)
            setLoading(false)
            // console.log(JSON.stringify(questions))
            // console.log("coming here ")

        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setError('Error fetching the data please try again');
            setLoading(true);
        });
    }, []);
      
    function handleAnswers(difficulty, choiceId) {
        const newAnswer = {
            difficulty: difficulty,
            answer_id: choiceId,
          };
        setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
        
    }

    const handleSubmitAnswers = async (e) => {
        e.preventDefault();
        const data = answers;
        console.log(data);
        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/tests/submit_ans",
                data,
                {
                    headers : {
                        "Content-Type" : 'application/json'
                    },
                }
            );
            console.log("Response" , response.data)
        } catch (error) {
            console.error('Error:' , error);
        }
    };

     if(loading) {
        return <div>Loading...</div>
     }
     if (error) {
        return <div>{error}</div>;
      }
  return (
    showScore ? (
        <div className='score-section'>
            You scored {score} out of 
        </div>
    ) : (
        <>
        <h1>{questions.title}</h1>
        {easy_question_array.map((question) => (
        <div className='app' key={question.id}>            
            <div className='question-section' >
                <div className='question-count'>
                    <span>Question {currentQuestion + 1} </span>
                    <br></br>
                </div>
                <div className='question-text'>question {question.text}</div>
            </div>
            <div className='answer-section'>
                {question.choices.map((choice) =>(
                    <button 
                        key={choice.id}
                        onClick={()=> handleAnswers(choice.difficulty, choice.pk)}
                        >{choice.text}</button>

                ))} 
            </div>             			
		</div>
        ))}
        <button onClick={handleSubmitAnswers}>Submit</button>
        </>
        )
    
	);
};

export default QuestionCard