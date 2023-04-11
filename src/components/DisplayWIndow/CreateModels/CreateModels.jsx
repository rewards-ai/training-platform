import React, {useState} from 'react'
import './CreateModels.css'
import Steps from './Steps/Steps'
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'
import Swal from 'sweetalert2/dist/sweetalert2'
import "@sweetalert2/theme-dark"
import axios from 'axios'

const CreateModels = ({sessionJson, setSessionJson, setIsWin}) => {
  const [curStep, setCurStep] = useState(1)

  function createSession() {
    axios.post(`http://127.0.0.1:8000/api/v1/create_session/session_id?=${sessionJson["model_id"]}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function writeEnvParams() {
    axios.post(`http://127.0.0.1:8000/api/v1/write_env_params`,
    {
      "session_id": sessionJson["model_id"],
      "environment_name": "car-race",
      "environment_world": sessionJson["environment_world"],
      "mode": "training",
      "car_speed": 20
    }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  function writeAgentParams() {
    axios.post(`http://127.0.0.1:8000/api/v1/write_agent_params`,
      {
        "session_id": "string",
        "model_configuration": String(sessionJson["model_configuration"]),
        "learning_rate": sessionJson["learning_rate"],
        "loss_fn": sessionJson["loss_fn"],
        "optimizer": sessionJson["optimizer"],
        "num_episodes": sessionJson["num_episodes"]
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function writeTrainingParams() {
    axios.post(`http://127.0.0.1:8000/api/v1/write_training_params`,
      {
        "session_id": sessionJson["model_id"],
        "learning_algorithm": sessionJson["learning_algorithm"],
        "enable_wandb": false,
        "reward_function": sessionJson["reward_function"]
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Saved!',
          'Your experiment is saved.',
          'success'
        )
        console.log(sessionJson)
        setIsWin(2)
        /*
        TODO:
          - Add check if model name is unique
        */
        createSession()
        writeEnvParams()
        writeAgentParams()
        writeTrainingParams()
      } else {}
    })
  }
  return (
    <div className='create-model-window'>
      <div className='create-model-head'>
        <p>Create Model</p>
      </div>
      <div className='create-model-body'>
        <div className='create-model-steps'>
          <Steps curStep={curStep} setCurStep={setCurStep} />
        </div>
        <div className='create-model-display'>
          <div className='create-model-container'>
            {curStep == 1 && <Step1 sessionJson={sessionJson} setSessionJson={setSessionJson} />}
            {curStep == 2 && <Step2 sessionJson={sessionJson} setSessionJson={setSessionJson} />}
            {curStep == 3 && <Step3 sessionJson={sessionJson} setSessionJson={setSessionJson} />}
          </div>
          <div className='create-model-controller'>
            {curStep == 3 && <button className="styled-button" onClick={handleClick}>Save Changes</button>}
            <button className='styled-button' onClick={(e)=>{setCurStep(curStep == 1 ? curStep : curStep-1)}}>Prev</button>
            <button className='styled-button' onClick={(e)=>{setCurStep(curStep == 3 ? curStep : curStep+1)}}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateModels