import React, {useState} from 'react'
import { useEffect } from 'react'
import './Step1.css'
import axios from 'axios'
import Track from './Track/Track'

const Step1 = ({sessionJson, setSessionJson}) => {
  
  const rewards_api = axios.create({baseURL: import.meta.env.VITE_REWARDS_API})
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    rewards_api.post(`/get_all_tracks`, sessionJson["environment"])
    .then((response) => {
      console.log(response)
      setTracks(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  const [curTrack, setCurTrack] = useState(sessionJson["environment_world"])

  return (
    <div className='step1-container'>
      <div className='step1-model-details'>
        <div className='step1-model-name-cont'>
          <p>Session name</p>
          <input type='text' placeholder='session-name' 
            onChange={(e) => {setSessionJson({...sessionJson, "model_id": e.target.value})}}
            value={sessionJson["model_id"]}
          />
        </div>
        <div className='step1-model-desc-cont'>
          <p>Session Description</p>
          <textarea placeholder='This session uses stay left technique'
            onChange={(e) => {setSessionJson({...sessionJson, "model_description": e.target.value})}}
            value={sessionJson["model_description"]}
          />
        </div>
      </div>
      <div className='step1-track-details'>
        <p>Choose Track</p>
        <div className='tracks-list'>
          {tracks.map((url, i) => (<Track key={i} i={i} url={url} curTrack={curTrack} 
            setCurTrack={setCurTrack} 
            sessionJson={sessionJson}
            setSessionJson={setSessionJson}/>))}
        </div>
      </div>
    </div>
  )
}

export default Step1