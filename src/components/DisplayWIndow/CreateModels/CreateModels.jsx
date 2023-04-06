import React, {useState} from 'react'
import './CreateModels.css'
import Steps from './Steps/Steps'
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'

const CreateModels = () => {
  const [curStep, setCurStep] = useState(1)
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
            {curStep == 1 && <Step1 />}
            {curStep == 2 && <Step2 />}
            {curStep == 3 && <Step3 />}
          </div>
          <div className='create-model-controller'>
            <button className='styled-button' onClick={(e)=>{setCurStep(curStep == 1 ? curStep : curStep-1)}}>Prev</button>
            <button className='styled-button' onClick={(e)=>{setCurStep(curStep == 3 ? curStep : curStep+1)}}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateModels