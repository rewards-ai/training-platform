import React from 'react'
import './Track.css'

const Track = ({i, url, curTrack, setCurTrack, sessionJson, setSessionJson}) => {

  /*
  TODO:
    - use URL to load images inside these divs
  */

  return (
    <div onClick={()=>{
      setCurTrack(i)
      setSessionJson({...sessionJson, "environment_world": i})
    }} className={`tracks-card ${i === curTrack ? 'outlined' : ''}`} 
    style={{backgroundImage: `url('../../../src/assets/images/environments/car_racer/${url}')`}}
    ></div>
  )
}

export default Track