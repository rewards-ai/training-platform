import React from 'react'
import "./Row.css"
import { MenuItem, Select } from '@mui/material'
import axios from 'axios'

const Row = ({i, data, setExpList, expList, curExp, setCurExp}) => {
  const rewards_api = axios.create({baseURL: import.meta.env.VITE_REWARDS_API})
  async function handleChange(e) {
    expList[curExp]["environment_world"] = e.target.value
    let env_data = {
        "session_id": data["session_id"],
        "environment_name": "car-race",
        "environment_world": e.target.value,
        "mode": "training",
        "car_speed": 20
    }
    await rewards_api.post(`/write_env_params`, env_data)
    .catch((error) => {
      console.error(error);
    });
    setExpList(expList)
  }
  return (
    <div className={`table-row ${i === curExp ? 'outlined' : ''}`} onClick={(e) => {setCurExp(i)}}>
        <div title='Model name' className='row-name row-details'><p>{data["session_id"]}</p></div>
        <div title='Environment name' className='row-details'><p>{data["environment_name"]}</p></div>
        <Select defaultValue={data["environment_world"]} onChange={handleChange}>
          <MenuItem value={1}>track-1</MenuItem>
          <MenuItem value={2}>track-2</MenuItem>
          <MenuItem value={3}>track-3</MenuItem>
        </Select>
        <div title='Learning Algorithm' className='row-details'><p>{data["learning_algorithm"]}</p></div>
    </div>
  )
}

export default Row