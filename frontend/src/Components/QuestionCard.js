import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../Context/AuthContext';
import axios from "axios";

const QuestionCard = () => {
  // let {name} = useContext(AuthContext)
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
  const allAnswers = {
    easy: [...answersForEasy.easy],
    medium: [...answersForMedium.medium],
    hard: [...answersForHard.hard],
  };
  const [questions, setQuestions] = useState([]);

  const easy_question_array = questions.easy_questions;
  const medium_question_array = questions.medium_questions;
  const difficult_question_array = questions.difficult_questions;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tests/1/get_test/")
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
        // console.log(JSON.stringify(questions))
        // console.log("coming here ")
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching the data please try again");
        setLoading(true);
      });
  }, []);

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
    const data = allAnswers;
    console.log(data);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tests/submit_ans",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response", response.data);
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
      {showScore} ? (
      <div className="score-section">You scored {score} out of</div>) : (
      <>
        {easy_question_array.map((question) => (
          <div className="app" key={question.id}>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1} </span>
                <br></br>
              </div>
              <div className="question-text">question {question.text}</div>
            </div>
            <div className="answer-section">
              {question.choices.map((choice) => (
                <button
                  className="card-button"
                  key={choice.id}
                  onClick={() => handleEasyAnswers(question.pk, choice.pk)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        ))}

        {easy_question_array.map((question) => (
          <div className="app" key={question.id}>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1} </span>
                <br></br>
              </div>
              <div className="question-text">question {question.text}</div>
            </div>
            <div className="answer-section">
              {question.choices.map((choice) => (
                <button
                  className="card-button"
                  key={choice.id}
                  onClick={() => handleMediumAnswers(question.pk, choice.pk)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        ))}
        {easy_question_array.map((question) => (
          <div className="app" key={question.id}>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1} </span>
                <br></br>
              </div>
              <div className="question-text">question {question.text}</div>
            </div>
            <div className="answer-section">
              {question.choices.map((choice) => (
                <button
                  className="card-button"
                  key={choice.id}
                  onClick={() => handleHardAnswers(question.pk, choice.pk)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleSubmitAnswers}>Submit</button>
      </>
      );
    </div>
  );
};

export default QuestionCard;
