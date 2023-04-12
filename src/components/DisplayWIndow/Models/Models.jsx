import React, {useState} from 'react'
import { useEffect } from 'react'
import './Models.css'
import Row from './Row/Row'
import { getList, deleteSession } from './utils'
import TrainWindow from './TrainWindow/TrainWindow'

const Models = () => {
  const [curExp, setCurExp] = useState(0)
  const [expList, setExpList] = useState([])
  const [isTraining, setIsTraining] = useState(false)

  useEffect(() => {
    getList(setCurExp, setExpList)
  }, [])

  return (
    <div className='models-window-cont'>
      {console.log("list", expList)}
      {isTraining && <TrainWindow session_id={expList[curExp]["session_id"]} setIsTraining={setIsTraining}/>}
      <div className='models-window-head'>
        <p>Experiments List</p>
      </div>
      <div className='models-window-body'>
        <div className='models-window-display'>
          <div className='models-window-list'>
            <div>{expList.map((ele, i) => (<Row key={i} i={i} data={ele} curExp={curExp} setCurExp={setCurExp}/>))}</div>
          </div>
          <div className='models-window-controller'>
            <button className='styled-button' onClick={() => setIsTraining(true)} style={{margin: '0px', marginBottom: '10px'}}>Train</button>
            <button className='styled-button' style={{margin: '0px', marginBottom: '10px'}}>Evaluate</button>
            <button className='styled-button' onClick={() => deleteSession(setCurExp, setExpList, expList[curExp])} style={{margin: '0px', marginBottom: '10px', marginTop: '20px'}}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Models