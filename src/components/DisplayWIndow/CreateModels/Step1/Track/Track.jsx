import React from 'react'
import './Track.css'

const Track = ({i, url, curTrack, setCurTrack}) => {

  /*
  TODO:
    - use URL to load images inside these divs
  */

  return (
    <div onClick={()=>{
      setCurTrack(i)
    }} className={`tracks-card ${i === curTrack ? 'outlined' : ''}`} ></div>
  )
}

export default Track