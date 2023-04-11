import React, {useState} from 'react'
import './DisplayWindow.css'
import Environments from './Environments/Environments'
import CreateModels from './CreateModels/CreateModels'
import Models from './Models/Models'
import Documentation from './Documentation/Documentation'

const DisplayWindow = ({isWin, setIsWin}) => {
  const [sessionJson, setSessionJson] = useState({})
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