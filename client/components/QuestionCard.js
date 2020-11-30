import React, { useState } from 'react'
import QuestionDisplay from './QuestionDisplay'
import '../css/QuestionCard.css'

const QuestionCard = ({ question, handleNextQuestion, questionResult, handleSubmitAnswer }) => {
  const [answer, setAnswer] = useState('')
  const handleClickEnter = (event) => {
    if (event.keyCode === 13) handleSubmitAnswer(answer)
  }
  return (
    <div className="card rank-a hearts">
      <span className="rank">A</span>
      <span className="suit">♥</span>
      {questionResult === 'correct' && (
        <img className="answer-img-card" src="img/success.svg"></img>
      )}
      {questionResult === 'incorrect' && (
        <img className="answer-img-card" src="img/close.svg"></img>
      )}

      <QuestionDisplay
        answer={answer}
        setAnswer={setAnswer}
        handleClickEnter={handleClickEnter}
        question={question}
        handleNextQuestion={handleNextQuestion}
      />
      {questionResult ? (
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setAnswer('')
              handleNextQuestion()
            }}
          >
            NEXT
          </button>
        </>
      ) : (
        <button className="btn btn-secondary" onClick={() => handleSubmitAnswer(answer)}>
          GO
        </button>
      )}
    </div>
  )
}

export default QuestionCard
