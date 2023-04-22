import React, {useEffect, useState} from 'react'
import './Leaderboard.css'
import axios from 'axios'
import Cell from './Cell'

const Leaderboard = ({sessionJson, setSessionJson}) => {
  const [data, setData] = useState([])
  const [showLoading, setShowLoading] = useState(false);
  const rewards_api = axios.create({baseURL: import.meta.env.VITE_REWARDS_API})

  useEffect(() => {
    setShowLoading(true)
    rewards_api.get('/get_user_list')
    .then((response) => {
      response.data.leaderboard_data.sort(compareScore)
      setData(response.data.leaderboard_data)
      console.log("userlist", response.data.leaderboard_data)
      setShowLoading(false)
    })
  }, [])

  function compareScore(a, b) {
    if (a["score"] > b["score"]) {
      return -1;
    } else if (a["score"] < b["score"]) {
      return 1;
    } else {
      return 0;
    }
  }
  
  return (
    <div className='leaderboard-cont'>
      {showLoading && <div className="loadingSpinnerContainer"><div className="loadingSpinner"></div></div>}
      <div className='leaderboard-head'><p>LeaderBoard</p></div>
      <div className='leaderboard-body'>
        <div className='leadboard-list-cont'>
          {data.map((e) => (<Cell data={e}/>))}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard