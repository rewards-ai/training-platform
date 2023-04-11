import React, {useState} from 'react'
import { useEffect } from 'react'
import './Step1.css'
import axios from 'axios'
import Track from './Track/Track'

const Step1 = ({sessionJson, setSessionJson}) => {
  /*
  TODO:
    - get list of tracks from server
  */

    const [tracks, setTracks] = useState([])

  useEffect(() => {
    axios.post(`http://127.0.0.1:8000/api/v1/get_all_tracks`, sessionJson["environment"])
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
          <p>Model name</p>
          <input type='text' placeholder='new-model-keep-left-only' 
            onChange={(e) => {setSessionJson({...sessionJson, "model_id": e.target.value})}}
            value={sessionJson["model_id"]}
          />
        </div>
        <div className='step1-model-desc-cont'>
          <p>Model Description</p>
          <textarea placeholder='This model is superior'
            onChange={(e) => {setSessionJson({...sessionJson, "model_description": e.target.value})}}
            value={sessionJson["model_description"]}
          />
        </div>
      </div>
      <div className='step1-track-details'>
        <p>Choose Track</p>
        <div className='tracks-list'>
          {tracks.map((url, i) => (<Track key={i} i={i}  url={url} curTrack={curTrack} 
            setCurTrack={setCurTrack} 
            sessionJson={sessionJson}
            setSessionJson={setSessionJson}/>))}
        </div>
      </div>
    </div>
  )
}

export default Step1