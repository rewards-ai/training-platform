import React, {useState} from 'react'
import './DisplayWindow.css'
import Environments from './Environments/Environments'
import CreateModels from './CreateModels/CreateModels'
import Models from './Models/Models'
import Documentation from './Documentation/Documentation'

const DisplayWindow = ({isWin, setIsWin}) => {
  const [sessionJson, setSessionJson] = useState({
    "environment_name": "car_racer",
    "model_id": "",
    "model_description": "",
    "environment_world": 0,
    "setSessionJson": "dqn",
    "loss_fn": "mse",
    "learning_rate": 60,
    "model_configuration": [[5, 9], [9, 3]],
    "num_episodes": 700,
    "gamma": 90,
    "epsilon": 20,
    "reward_function": 
`def reward_function(params):
  reward = 0
  if params["isAlive"]:
    reward = 1
  return rewards
`

  })
  return (
    <div className='display-window-container'>
        <div className='display-window'>
            {isWin == 0 && <Environments sessionJson={sessionJson} setSessionJson={setSessionJson} />}
            {isWin == 1 && <CreateModels sessionJson={sessionJson} setSessionJson={setSessionJson} setIsWin={setIsWin}/>}
            {isWin == 2 && <Models sessionJson={sessionJson} setSessionJson={setSessionJson} />}
            {isWin == 3 && <Documentation sessionJson={sessionJson} setSessionJson={setSessionJson} />}
        </div>
    </div>
  )
}

export default DisplayWindow