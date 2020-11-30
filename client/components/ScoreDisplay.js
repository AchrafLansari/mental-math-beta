import React from 'react'
import { Button } from 'react-bootstrap'

const ScoreDisplay = (props) => (
  <ul className="list-group list-group-flush">
    <li className="list-group-item">
      <button className="btn btn-block btn-outline-success">
        Score <span className="badge badge-success">{props.score}</span>{' '}
      </button>
    </li>
    <li className="list-group-item">
      <Button block variant="outline-info">
        Streak <span className="badge badge-info">{props.streak} </span>
      </Button>
    </li>
    <li className="list-group-item">
      <Button block variant="outline-dark">
        Team Score <span className="badge badge-dark">{props.team} </span>
      </Button>
    </li>
  </ul>
)

export default ScoreDisplay
