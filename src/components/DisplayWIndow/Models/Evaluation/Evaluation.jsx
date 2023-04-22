import React, {useState, useEffect} from 'react'
import "./Evaluation.css"
import axios from 'axios';

const Evaluation = ({session_id}) => {
    const rewards_api = axios.create({baseURL: import.meta.env.VITE_REWARDS_API})
    const [jsonData, setJsonData] = useState()
    useEffect(() => {
        rewards_api.get(`/get_all_params?session_id=${session_id}`)
        .then((response) => {
          setJsonData(response.data)
        })
      })

    return (
        <div className='eval-window'>
            <img id="image" src={`${import.meta.env.VITE_STREAM_API}/evaluate?session_id=${session_id}&mode=evaluation&track_num=1`}/>
            <div className='bt-cont'>
                <button className='styled-button' onClick={() => {
                    window.location.reload()
                    }
                    } >Exit</button>
            </div>
        </div>
    )
}

export default Evaluation