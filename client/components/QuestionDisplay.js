import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

import '../css/QuestionDisplay.css'

const QuestionDisplay = ({ answer, setAnswer, handleClickEnter, question }) => {
  if (!question)
    return (
      <Container>
        <Spinner animation="border" variant="primary" />
      </Container>
    )

  return (
    <div className="question_display_wrapper">
      <div className="question_display">
        <p>
          <span>{question.left}</span>
          <span>{question.operation}</span>
          <span>{question.right}</span>
        </p>
      </div>
      <div className="question_answer_box">
        <label className="text-dark">Answer</label>
        <input
          type="text"
          name="answer"
          className="form-control"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyUp={handleClickEnter}
        />
      </div>
    </div>
  )
}

export default QuestionDisplay
