import React from 'react'
import './Steps.css'
import { Slider } from '@mui/material'

const Steps = ({curStep, setCurStep}) => {
  let slider_sx = {
    '.MuiSlider-track': {color: 'white'},
    '.MuiSlider-thumb': {color: 'yellow', width: '10px', height: '10px'},
    '.MuiSlider-rail': {color: 'white'},
  }
  return (
    <div className='steps-container'>
        <Slider
          orientation='vertical'
          defaultValue={1}
          value={curStep}
          disabled={true}
          step={1}
          min={1}
          max={3}
          className='slider'
          sx={slider_sx}
        />
        <div className='steps-bar-cont'>
          <p>Model Details</p>
          <p>Hyper-parameters</p>
          <p>Reward Function</p>
        </div>
    </div>
  )
}

export default Steps