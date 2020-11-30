import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import io from 'socket.io-client'
import QuestionCard from './QuestionCard'
import TimerBar from './TimerBar'
import ScoreDisplay from './ScoreDisplay'
import Modal from './Modal'
import { Container, Row, Col, Alert } from 'react-bootstrap'

/**
 * Events sent from server:
 *  - "player_joined" :: {} : a new player has joined the room (not you)
 *
 *  - "score_updated" :: {target, currentCount} : the score (currentCount) has been updated
 *                                               (also sent when you join the room to let you know current status)
 *
 *  - "target_reached" :: {} : sent when the team reach the target correct answers
 *                             followed immediately by a "score_update" message to inform of new target
 */

const connectionOptions = {
  forceNew: false,
  reconnection: true,
  transports: ['websocket'],
}
const socket = io.connect(connectionOptions)

const QuestionAreaContainer = () => {
  const [currentQuestionId, setQuestionId] = useState(null)
  const [currentQuestion, setQuestion] = useState(null)
  const [questionResult, setResult] = useState(null)
  const [scoreResult, setScore] = useState(0)
  const [teamCount, setTeamCount] = useState(0)
  const [streakCount, setStreakCount] = useState(0)
  const [joinResponse, setJoinResponse] = useState('')
  const [congratsResponse, setCongratsResponse] = useState('')
  const [duration, setDuration] = useState(15)

  // Modal
  const [show, setShow] = useState(false)
  const handleModalClose = () => {
    setShow(false)
    window.location.reload()
  }
  const handleModalShow = () => setShow(true)
  // End modal

  const reloadTimeBar = () => {
    const timeBar = document.querySelector('.round-time-bar')
    timeBar.classList.remove('round-time-bar')
    timeBar.offsetWidth
    timeBar.classList.add('round-time-bar')
  }

  const fetchQuestion = () => {
    Axios.get('/api/question').then((response) => {
      let upNext = response.data

      setQuestion(upNext.question)
      setQuestionId(upNext.id)
      setResult(null)
      setDuration(15)
      reloadTimeBar()
    })
  }

  const handleSubmitAnswer = (userResponse) => {
    Axios.post('/api/answer', {
      id: currentQuestionId,
      answer: userResponse,
    }).then((response) => {
      setResult(response.data.result)
      if (response.data.result === 'correct') {
        let score = scoreResult + 1
        setScore(score)
        if (score >= streakCount) setStreakCount(score)
      } else if (response.data.result === 'incorrect') {
        setTeamCount(() => teamCount - scoreResult)
        setScore(0)
      }
    })
  }
  useEffect(() => {
    socket.on('player_joined', (data) => {
      setJoinResponse(<Alert variant="info">A New Player has joined</Alert>)
      setTimeout(() => setJoinResponse(''), 3000)
    })
    socket.on('score_updated', (data) => {
      setTeamCount(data.currentCount)
    })
    socket.on('target_reached', (data) => {
      setCongratsResponse('Target reached by your team')
    })
    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    fetchQuestion()
    if (congratsResponse) handleModalShow()
  }, [congratsResponse])

  return (
    <>
      <TimerBar duration={duration} fetchQuestion={fetchQuestion} />

      <Container>
        {joinResponse}
        <Row>
          <Col lg={5} className="mx-auto">
            <QuestionCard
              questionResult={questionResult}
              handleSubmitAnswer={handleSubmitAnswer}
              question={currentQuestion}
              handleNextQuestion={fetchQuestion}
            />
          </Col>
          <Col lg={3}>
            <ScoreDisplay score={scoreResult} streak={streakCount} team={teamCount} />
          </Col>
        </Row>
      </Container>
      <Modal show={show} handleClose={handleModalClose} congratsResponse={congratsResponse} />
    </>
  )
}

export default QuestionAreaContainer
