import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const CombinationQuestions = () => {
  let { categoryId } = useParams();
  const { AuthTokens } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answersForEasy, setAnswersForEasy] = useState({
    easy: [],
  });
  const [answersForMedium, setAnswersForMedium] = useState({
    medium: [],
  });
  const [answersForHard, setAnswersForHard] = useState({
    hard: [],
  });
  const [data, setData] = useState([]);

  const allAnswers = {
    easy: [...answersForEasy.easy],
    medium: [...answersForMedium.medium],
    hard: [...answersForHard.hard],
  };

  const [questionsCount, setQuestionsCount] = useState({
    count_easy: 0,
    count_medium: 0,
    count_hard: 0,
  });

  const easy_question_array = data.easy_questions;
  const medium_question_array = data.medium_questions;
  const hard_question_array = data.hard_questions;

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/tests/${categoryId}/get_comb_test/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        const test_data =  response.data;
        // console.log(response.data);
        const newQuestions = {};

        for (const key in test_data) {
          const categoryData = test_data[key];
          
          newQuestions[key] = {
            easy_questions : categoryData.easy_questions || [],
            medium_questions : categoryData.medium_questions || [],
            hard_questions : categoryData.hard_questions || [],

          }
        }
        setData(newQuestions);
        setLoading(false);


      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching the data please try again");
        setLoading(true);
      });
  }, []);


console.log(data)
  const handleEasyAnswers = (questionId, choiceId) => {
    setAnswersForEasy((prevAnswers) => {
      const existingAnswerIndex = prevAnswers["easy"].findIndex(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers["easy"]];
        updatedAnswers[existingAnswerIndex] = {
          question_id: questionId,
          answer_id: choiceId,
        };

        return { ...prevAnswers, easy: updatedAnswers };
      } else {
        return {
          ...prevAnswers,
          easy: [
            ...prevAnswers["easy"],
            { question_id: questionId, answer_id: choiceId },
          ],
        };
      }
    });
  };
  const handleMediumAnswers = (questionId, choiceId) => {
    setAnswersForMedium((prevAnswers) => {
      const existingAnswerIndex = prevAnswers["medium"].findIndex(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers["medium"]];
        updatedAnswers[existingAnswerIndex] = {
          question_id: questionId,
          answer_id: choiceId,
        };

        return { ...prevAnswers, medium: updatedAnswers };
      } else {
        return {
          ...prevAnswers,
          medium: [
            ...prevAnswers["medium"],
            { question_id: questionId, answer_id: choiceId },
          ],
        };
      }
    });
  };
  const handleHardAnswers = (questionId, choiceId) => {
    setAnswersForHard((prevAnswers) => {
      const existingAnswerIndex = prevAnswers["hard"].findIndex(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers["hard"]];
        updatedAnswers[existingAnswerIndex] = {
          question_id: questionId,
          answer_id: choiceId,
        };

        return { ...prevAnswers, hard: updatedAnswers };
      } else {
        return {
          ...prevAnswers,
          hard: [
            ...prevAnswers["hard"],
            { question_id: questionId, answer_id: choiceId },
          ],
        };
      }
    });
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();
    const data = {
      choices: JSON.stringify(allAnswers),
      count: JSON.stringify(questionsCount),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tests/submit_ans/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthTokens.access}`,
          },
        }
      );
      setShowScore(response.data)
      // console.log("Response", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="card-outer">
      {showScore ? (
      <div className="score-section">You scored {showScore} out of 100</div>) : (
      <>
        <h1>{data.category}</h1>
        {Object.keys(data).map((categoryKey) => (
           <div key={categoryKey}>
            <span>{categoryKey}</span>
           {data[categoryKey].easy_questions.map((question) => (
             <div className="app" key={question.id}>
               <div className="question-section">
                 <div className="question-count">
                   <span>Question x </span>
                   <br />
                 </div>
                 <div className="question-text">{question.text}</div>
               </div>
               <div className="answer-section">
                 {question.choices.map((choice) => (
                   <button
                     className="card-button"
                     key={choice.id}
                     onClick={() => handleEasyAnswers(categoryKey, 'easy', question.pk, choice.pk)}
                   >
                     {choice.text}
                   </button>
                 ))}
               </div>
             </div>
           ))}
       
           {data[categoryKey].medium_questions.map((question) => (
             <div className="app" key={question.id}>
               <div className="question-section">
                 <div className="question-count">
                   <span>Question x </span>
                   <br />
                 </div>
                 <div className="question-text">{question.text}</div>
               </div>
               <div className="answer-section">
                 {question.choices.map((choice) => (
                   <button
                     className="card-button"
                     key={choice.id}
                     onClick={() => handleMediumAnswers(categoryKey, 'medium', question.pk, choice.pk)}
                   >
                     {choice.text}
                   </button>
                 ))}
               </div>
             </div>
           ))}
       
           {data[categoryKey].hard_questions.map((question) => (
             <div className="app" key={question.id}>
               <div className="question-section">
                 <div className="question-count">
                   <span>Question x </span>
                   <br />
                 </div>
                 <div className="question-text">{question.text}</div>
               </div>
               <div className="answer-section">
                 {question.choices.map((choice) => (
                   <button
                     className="card-button"
                     key={choice.id}
                     onClick={() => handleHardAnswers(categoryKey, 'hard', question.pk, choice.pk)}
                   >
                     {choice.text}
                   </button>
                 ))}
               </div>
             </div>
           ))}
         </div>
        ))

        }
      
        <button onClick={handleSubmitAnswers}>Submit</button>
      </>
      )};
      
    </div>
  );
};

export default CombinationQuestions;
