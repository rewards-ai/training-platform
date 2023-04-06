import React from 'react'
import './Steps.css'

const Steps = ({curStep, setCurStep}) => {
  return (
    <div className='steps-container'>
        <div className='steps-bar'>
            <div className='step-1 step-num'>step 1</div>
            <div className='step-2 step-num'>step 2</div>
            <div className='step-3 step-num'>step 3</div>
            <div className='step-4 step-num'>step 4</div>
        </div>
    </div>
  )
}

export default Steps