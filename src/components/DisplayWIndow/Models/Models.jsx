import React, {useState} from 'react'
import { useEffect } from 'react'
import './Models.css'
import Row from './Row/Row'
import { getList, deleteSession, handlePush } from './utils'
import TrainWindow from './TrainWindow/TrainWindow'
import { Modal } from '@mui/material'
import SessionInfo from './SessionInfo/SessionInfo'
import { supabase } from '../../../authClient/supabaseClient'
import Evaluation from './Evaluation/Evaluation'

const Models = () => {
  const [curExp, setCurExp] = useState(0)
  const [expList, setExpList] = useState([])
  const [isEval, setIsEval] = useState(false)
  const [isTraining, setIsTraining] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log("user", value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  useEffect(() => {
    getList(setCurExp, setExpList)
  }, [])

  return (
    <div className='models-window-cont'>
      {console.log("list", expList)}
      {isTraining && <TrainWindow session_id={expList[curExp]["session_id"]} setIsTraining={setIsTraining}/>}
      {isEval && <Evaluation session_id={expList[curExp]["session_id"]}/>}
      <div className='models-window-head'>
        <p>Experiments List</p>
      </div>
      <div className='models-window-body'>
        <div className='models-window-display'>
          <div className='models-window-list'>
            <div>{expList.map((ele, i) => (<Row key={i} i={i} data={ele} setExpList={setExpList} expList={expList} curExp={curExp} setCurExp={setCurExp}/>))}</div>
          </div>
          <div className='models-window-controller'>
            <button className='styled-button' onClick={() => setIsTraining(true)} style={{margin: '0px', marginBottom: '10px'}}>Train</button>
            <button className='styled-button' onClick={() => setIsEval(true)} style={{margin: '0px', marginBottom: '10px'}}>Evaluate</button>
            <button className='styled-button' onClick={handleOpen} style={{margin: '0px', marginBottom: '10px'}}>More Info</button>
            <button className='styled-button' onClick={() => deleteSession(setCurExp, setExpList, expList[curExp])} style={{margin: '0px', marginBottom: '10px', marginTop: '20px'}}>Delete</button>
            <button className='styled-button' onClick={() => handlePush(expList[curExp]["session_id"], user.id, user)} style={{margin: '0px', marginBottom: '10px'}}>Push Model</button>
            <Modal className='session-info' open={open} onClose={handleClose}><SessionInfo session_id={expList[curExp]} /></Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Models