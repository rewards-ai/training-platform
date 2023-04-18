import React from 'react'
import "./Row.css"

const Row = ({i, data, curExp, setCurExp}) => {
  console.log("data", data)
  return (
    <div className={`table-row ${i === curExp ? 'outlined' : ''}`} onClick={(e) => {setCurExp(i)}}>
        <div title='Model name' className='row-name row-details'><p>{data["session_id"]}</p></div>
        <div title='Environment name' className='row-details'><p>{data["environment_name"]}</p></div>
        <div title='World num' className='row-details'><p>{data["environment_world"]}</p></div>
        <div title='Learning Algorithm' className='row-details'><p>{data["learning_algorithm"]}</p></div>
    </div>
  )
}

export default Row