import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const CombinationQuestions = () => {
  let { categoryId } = useParams();
  const { AuthTokens } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [data, setData] = useState([]);
  const [questionsCount, setQuestionsCount] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/tests/${categoryId}/get_comb_test/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        const test_data = response.data;
        // console.log(response.data);
        const newQuestions = {};

        for (const key in test_data) {
          const categoryData = test_data[key];

          setQuestionsCount((prevQuestionsCount) => {
            return {
              ...prevQuestionsCount,
              [key]: {
                count_easy: categoryData.easy_questions.length || 0,
                count_medium: categoryData.medium_questions.length || 0,
                count_hard: categoryData.hard_questions.length || 0,
              },
            };
          });
          newQuestions[key] = {
            easy_questions: categoryData.easy_questions || [],
            medium_questions: categoryData.medium_questions || [],
            hard_questions: categoryData.hard_questions || [],
          };
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


  const handleAnswer = (categoryId, difficulty, questionId, choiceId) => {
    // Create a copy of the current selectedChoices state
    const newSelectedChoices = { ...selectedChoices };

    // Check if the category exists in the state
    if (!newSelectedChoices[categoryId]) {
      newSelectedChoices[categoryId] = {};
    }

    // Check if the difficulty exists in the category
    if (!newSelectedChoices[categoryId][difficulty]) {
      newSelectedChoices[categoryId][difficulty] = {};
    }
    const existingChoice =
      newSelectedChoices[categoryId][difficulty][questionId];
    if (existingChoice == choiceId) {
      delete newSelectedChoices[categoryId][difficulty][questionId];
    } else {
      // Save the selected choice for the specific question
      newSelectedChoices[categoryId][difficulty][questionId] = choiceId;
    }

    // Update the state with the new selectedChoices
    setSelectedChoices(newSelectedChoices);
  };

  console.log(selectedChoices)

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();
    const data = {
      answers: selectedChoices,
      count: questionsCount,
      category : categoryId
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tests/submit_comb_ans/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthTokens.access}`,
          },
        }
      );
      setShowScore(response.data);
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
        <div className="score-section">You scored {showScore} out of 100</div>
      ) : (
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
                        onClick={() =>
                          handleAnswer(
                            categoryKey,
                            "easy",
                            question.pk,
                            choice.pk
                          )
                        }
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
                        onClick={() =>
                          handleAnswer(
                            categoryKey,
                            "medium",
                            question.pk,
                            choice.pk
                          )
                        }
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
                        onClick={() =>
                          handleAnswer(
                            categoryKey,
                            "hard",
                            question.pk,
                            choice.pk
                          )
                        }
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <button onClick={handleSubmitAnswers}>Submit</button>
        </>
      )}
      ;
    </div>
  );
};

export default CombinationQuestions;
