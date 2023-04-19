import React, {useState} from 'react'
import './CreateModels.css'
import Steps from './Steps/Steps'
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'
import Swal from "sweetalert2/src/sweetalert2"
import "@sweetalert2/theme-dark"
import axios from 'axios'

const CreateModels = ({sessionJson, setSessionJson, setIsWin}) => {
  const [curStep, setCurStep] = useState(1)
  const rewards_api = axios.create({baseURL: import.meta.env.VITE_REWARDS_API})

  async function createSession() {
    let valid = await rewards_api.get('/get_all_sessions')
    .then(async (response) => {
      let sessions_list = Object.keys(response.data)
      console.log(sessions_list)
      if (!sessions_list.includes(sessionJson["model_id"])) {      
        await rewards_api.post(`/create_session?session_id=${sessionJson["model_id"]}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
        return true
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Model already exists',
          text: 'Please choose a different name',
          confirmButtonText: 'OK'
        });
        return false
      }
    }) 
    return valid
  }

  async function writeEnvParams() {
    let data = {
      "session_id": sessionJson["model_id"],
      "environment_name": "car-race",
      "environment_world": sessionJson["environment_world"] + 1,
      "mode": "training",
      "car_speed": 20
    }
    console.log(data)
    await rewards_api.post(`/write_env_params`, data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  async function writeAgentParams() {
    let data = {
      "session_id": sessionJson["model_id"],
      "model_configuration": JSON.stringify(sessionJson["model_configuration"]),
      "learning_rate": sessionJson["learning_rate"],
      "loss_fn": sessionJson["loss_fn"],
      "optimizer": sessionJson["optimizer"],
      "gamma": sessionJson["gamma"],
      "epsilon": sessionJson["epsilon"],
      "num_episodes": sessionJson["num_episodes"]
    }
    console.log(data)
    await rewards_api.post(`/write_agent_params`, data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async function writeTrainingParams() {
    let data = {
      "session_id": sessionJson["model_id"],
      "learning_algorithm": sessionJson["learning_algorithm"],
      "enable_wandb": 0,
      "reward_function": sessionJson["reward_function"]
    }
    console.log(data)
    await rewards_api.post(`/write_training_params`, data)
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
      text: "Changes except environment world will not be allowed",
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
        createSession()
        .then((e) => {
          console.log("create", e)
          if (e) {
            writeEnvParams()
            .then(() => writeAgentParams())
            .then(() => writeTrainingParams())
            .then(() => setIsWin(2))
          }
        })
        .catch((e) => {
          console.log("error", e)
        })
      }
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