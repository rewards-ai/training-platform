import React, {useEffect, useState} from 'react'
import './Leaderboard.css'
import axios from 'axios'
import Cell from './Cell'

const Leaderboard = ({sessionJson, setSessionJson}) => {
  const [data, setData] = useState([])
  const rewards_api = axios.create({baseURL: import.meta.env.VITE_REWARDS_API})

  useEffect(() => {
    rewards_api.get('/get_user_list')
    .then((response) => {
      setData(response.data.leaderboard_data)
      console.log("userlist", response.data.leaderboard_data)
    })
  }, [])
  
  return (
    <div className='leaderboard-cont'>
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