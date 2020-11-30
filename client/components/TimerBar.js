import React, { useEffect } from 'react'
import '../css/TimerBar.css'

const TimerBar = ({ duration, fetchQuestion }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchQuestion()
    }, duration * 1000)
    return () => clearTimeout(timer)
  }, [duration, fetchQuestion])
  const style = { '--duration': duration }
  return (
    <div className="round-time-bar" data-style="smooth" style={style}>
      <div></div>
    </div>
  )
}

export default TimerBar
