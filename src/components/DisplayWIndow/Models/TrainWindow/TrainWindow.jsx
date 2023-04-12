import React from 'react'
import "./TrainWindow.css"

const TrainWindow = ({session_id, setIsTraining}) => {
  return (
    <div className='training-window'>
        <div className='training-window-inner'>
            <img src={`http://127.0.0.1:8000/api/v1/start_training/${session_id}`}/>
        </div>
        <button onClick={() => {setIsTraining(false)}} >Exit</button>
    </div>
  )
}

export default TrainWindow