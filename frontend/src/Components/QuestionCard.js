import React, {useState, useEffect} from 'react'

import axios from 'axios'

const QuestionCard = () => {



	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [loading , setLoading] = useState(true);
    const [error, setError] = useState(null);
    let [questions, setQuestions] = useState([]);

    const easy_question_array = questions.easy_questions;
    
    // console.log(easy_question_array);
    console.log(questions);

    
    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/api/tests/1/get_test/")
        .then((response) => {
            setQuestions(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setError('Error fetching the data please try again');
            setLoading(false);
        });
    }, []);
      
    // const handleAnswerOptionClick = (isCorrect) => {
	// 	if (isCorrect) {
	// 		setScore(score + 1);
	// 	}

	// 	const nextQuestion = currentQuestion + 1;
	// 	if (nextQuestion < questions.length) {
	// 		setCurrentQuestion(nextQuestion);
	// 	} else {
	// 		setShowScore(true);
	// 	}
	// }
    //    {/* {questions[currentQuestion].answerOptions.map((answerOption) => ( */}
     //       // <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
     //   {/* ))} */}
     if(loading) {
        return <div>Loading...</div>
     }
     if (error) {
        return <div>{error}</div>;
      }
  return (
    <div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>      {easy_question_array.map((question) => (
                        <div>
                        <div className='question-section' key={questions.id}>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>question{questions.title}</div>
                        </div>
                        

                            <div className='answer-section'>
                                    <button>{question.text}</button>
                                    {question.choices.map((choice) =>(
                                      <button>{choice.text}</button>
                                    ))} 

                            </div>
                         
                    
                    </div>
                    ))} 
				</>
            )}<br/>
		</div>
	);
};

export default QuestionCard