import React, {useState, useEffect} from 'react'
import './Environments.css'
import Environment from './Environment/Environment'
import axios from 'axios'

const Environments = ({sessionJson, setSessionJson}) => {
  const [curEnv, setCurEnv] = useState(0)
  const [envs, setEnvs] = useState([{}])

  useEffect(() => {
    axios.post(`http://127.0.0.1:8000/api/v1/get_all_envs`)
    .then((response) => {
      console.log(response)
      setEnvs(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])
  
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