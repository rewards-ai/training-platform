import React, {useState} from 'react'
import './Models.css'
import Row from './Row/Row'

const Models = () => {

  const [curExp, setCurExp] = useState(0)

  const list = [
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
    {"session_id": "model 1", "environment_name": "car-racer", "environment_world": "1", "learning_algorithm": "dqn"},
  ]

  function getList() {
    /*
    TODO: 
      - Get list from server
    */
    return [
      'ds', 'sad'
    ]
  }  
  
  return (
    <div className='models-window-cont'>
      <div className='models-window-head'>
        <p>Experiments List</p>
      </div>
      <div className='models-window-body'>
        <div className='models-window-display'>
          <div className='models-window-list'>
            <div>{list.map((ele, i) => (<Row key={i} i={i} data={ele} curExp={curExp} setCurExp={setCurExp}/>))}</div>
          </div>
          <div className='models-window-controller'>
            <button className='styled-button'style={{margin: '0px', marginBottom: '10px', marginTop: '20px'}}>Delete</button>
            <button className='styled-button'style={{margin: '0px', marginBottom: '10px'}}>Re-Train</button>
            <button className='styled-button'style={{margin: '0px', marginBottom: '10px'}}>Evaluate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Models