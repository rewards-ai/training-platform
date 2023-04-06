import React, {useState} from 'react'
import './Step1.css'
import Track from './Track/Track'

const Step1 = () => {
  /*
  TODO:
    - get list of tracks from server
  */
  const tracks_list = ["asd", "rwe", "sad", "iupo", "qwe"]
  const [curTrack, setCurTrack] = useState(0)

  return (
    <div className='step1-container'>
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
          {tracks_list.map((url, i) => (<Track key={i} i={i}  url={url} curTrack={curTrack} setCurTrack={setCurTrack} />))}
        </div>
      </div>
    </div>
  )
}

export default Step1