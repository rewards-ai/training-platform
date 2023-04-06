import React from 'react'
import './DisplayWindow.css'
import Environments from './Environments/Environments'
import CreateModels from './CreateModels/CreateModels'
import Models from './Models/Models'
import Documentation from './Documentation/Documentation'

const DisplayWindow = ({isWin, setIsWin}) => {
  return (
    <div className='display-window-container'>
        <div className='display-window'>
            {isWin == 0 && <Environments />}
            {isWin == 1 && <CreateModels />}
            {isWin == 2 && <Models />}
            {isWin == 3 && <Documentation />}
        </div>
    </div>
  )
}

export default DisplayWindow