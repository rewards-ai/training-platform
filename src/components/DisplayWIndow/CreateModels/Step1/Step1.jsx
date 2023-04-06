import React from 'react'
import './Step1.css'

const Step1 = () => {
  return (
    <div className='Step1-container'>
      <div className='step1-model-details'>
        <div className='step1-model-name-cont'>
          <p>Model name</p>
          <input type='text' placeholder='new-model-keep-left-only'/>
        </div>
        <div className='step1-model-desc-cont'>
          <p>Model Description</p>
          <textarea placeholder='This model is superior'/>
        </div>
      </div>
      <div className='step1-track-details'>
        <p>Choose Track</p>
        <div className='tracks-list'>
          <div className='mock-tracks'></div>
          <div className='mock-tracks'></div>
          <div className='mock-tracks'></div>
          <div className='mock-tracks'></div>
        </div>
      </div>
    </div>
  )
}

export default Step1