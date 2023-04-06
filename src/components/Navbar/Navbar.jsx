import React, {useState} from 'react'
import './Navbar.css'
import logo from '../../assets/images/logo.jpg'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({isWin, setIsWin}) => {
  const [isEnv, setIsEnv] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [isModels, setIsModels] = useState(false)
  const [isDocs, setIsDocs] = useState(false)

  return (
    <div className='navbar'>
        <div className='navbar-logo'>
          <img src={logo}/>
          {/* <p>rewards.ai</p> */}
        </div>
        <div className='navbar-actions'>
          <div className='navbar-actions-1 navbar-action-elements' 
            // onMouseOver={e => setIsEnv(true)} 
            // onMouseLeave={e => setIsEnv(false)} 
            onClick={(e) => {setIsWin(0)}}
          >
            {(isEnv || isWin == 0) && <div className='navbar-element-select'></div>}
            <WbSunnyOutlinedIcon className='icons'/> 
            <p>Environments</p>
          </div>
          <div className='navbar-actions-2 navbar-action-elements' 
            // onMouseOver={e => setIsCreate(true)} 
            // onMouseLeave={e => setIsCreate(false)} 
            onClick={e => setIsWin(1)}
          > 
            {(isCreate || isWin == 1) && <div className='navbar-element-select'></div>}
            <AddCircleOutlineOutlinedIcon className='icons'/> 
            <p>Create Models</p>
          </div>
          <div className='navbar-actions-3 navbar-action-elements'
            // onMouseOver={e => setIsModels(true)} 
            // onMouseLeave={e => setIsModels(false)} 
            onClick={e => setIsWin(2)}
          > 
            {(isModels || isWin == 2) && <div className='navbar-element-select'></div>}
            <TocOutlinedIcon className='icons'/> 
            <p>Your Models</p>
          </div>
          <div className='navbar-actions-4 navbar-action-elements' 
            // onMouseOver={e => setIsDocs(true)} 
            // onMouseLeave={e => setIsDocs(false)} 
            onClick={e => setIsWin(3)}
          > 
            {(isDocs || isWin == 3) && <div className='navbar-element-select'></div>}
            <ArticleOutlinedIcon className='icons'/> 
            <p>Documentation</p>
          </div>
        </div>
        <div className='navbar-exit navbar-action-elements'>
          <LogoutIcon className='icons'/>
          <p>Logout</p>
        </div>
    </div>
  )
}

export default Navbar