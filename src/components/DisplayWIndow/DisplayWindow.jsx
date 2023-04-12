import React, {useState} from 'react'
import { useEffect } from 'react'
import './DisplayWindow.css'
import axios from 'axios'
import Environments from './Environments/Environments'
import CreateModels from './CreateModels/CreateModels'
import Models from './Models/Models'
import Documentation from './Documentation/Documentation'

const DisplayWindow = ({isWin, setIsWin}) => {
  const [sessionJson, setSessionJson] = useState(null)

  useEffect(() => {
    axios.get('src/components/DisplayWIndow/default.json')
      .then(response => {setSessionJson(response.data);})
      .catch(error => {console.error(error);});
  }, []);

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