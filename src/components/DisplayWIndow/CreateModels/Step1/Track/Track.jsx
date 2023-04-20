import React from 'react'
import './Track.css'

const Track = ({i, url, curTrack, setCurTrack, sessionJson, setSessionJson}) => {
  return (
    <div onClick={()=>{
      setCurTrack(i)
      setSessionJson({...sessionJson, "environment_world": i})
      console.log("track_check", i, url, curTrack)
    }} className={`tracks-card ${i === curTrack ? 'outlined' : ''}`} 
    style={{backgroundImage: `url('../../../src/assets/images/environments/car_racer/${url}')`}}
    ></div>
  )
}

export default Track