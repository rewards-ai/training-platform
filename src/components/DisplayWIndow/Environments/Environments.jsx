import React, {useState} from 'react'
import './Environments.css'
import Environment from './Environment/Environment'

const Environments = ({sessionJson, setSessionJson}) => {
  const [curEnv, setCurEnv] = useState(0)

  /*
  TODO:
    - get list of environments from backend
  */

  let envs = [
    {
      "name": "Car Racer",
      "thumbnail": "",
      "description": "This is place where a car travels through different tracks and tries to finish it at the best time possible. Let the racing begin!",
      "link": "",
      "isReleased": true
    },
    {
      "name": "Car Racer",
      "thumbnail": "",
      "description": "This is place where a car travels through different tracks and tries to finish it at the best time possible. Let the racing begin!",
      "link": "",
      "isReleased": true
    },
    {
      "name": "Car Racer",
      "thumbnail": "",
      "description": "This is place where a car travels through different tracks and tries to finish it at the best time possible. Let the racing begin!",
      "link": "",
      "isReleased": false
    },
    {
      "name": "Car Racer",
      "thumbnail": "",
      "description": "This is place where a car travels through different tracks and tries to finish it at the best time possible. Let the racing begin!",
      "link": "",
      "isReleased": false
    },
    {
      "name": "Car Racer",
      "thumbnail": "",
      "description": "This is place where a car travels through different tracks and tries to finish it at the best time possible. Let the racing begin!",
      "link": "",
      "isReleased": true
    }
  ]


  return (
    <div className='envs-window'>
      <div className='envs-head'>
        <p>Choose Environment</p>
      </div>
      <div className='envs-body'>
        <div className="env-container">
          {envs.map((e, i) => (<Environment key={i} i={i} 
            env={e} curEnv={curEnv} 
            setCurEnv={setCurEnv} 
            sessionJson={sessionJson}
            setSessionJson={setSessionJson}/>))}
        </div>
      </div>
    </div>
  )
}

export default Environments