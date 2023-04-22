import React, {useState, useEffect} from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutIcon from '@mui/icons-material/Logout'
import { supabase } from '../../authClient/supabaseClient';

const Navbar = ({isWin, setIsWin}) => {
  const [isEnv, setIsEnv] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [isModels, setIsModels] = useState(false)
  const [isDocs, setIsDocs] = useState(false)
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    navigate('/');
  };

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

  return (
    <div className='navbar'>
        {user && <div className='navbar-logo'>
          <img className='avatar' src={user.user_metadata.avatar_url}/>
          <p>{user.user_metadata.full_name}</p>
        </div>}
        <div className='navbar-actions'>
          <div className='navbar-actions-1 navbar-action-elements' 
            onClick={(e) => {setIsWin(0)}}
          >
            {(isEnv || isWin == 0) && <div className='navbar-element-select'></div>}
            <WbSunnyOutlinedIcon className='icons'/> 
            <p>Environments</p>
          </div>
          <div className='navbar-actions-2 navbar-action-elements' 
            onClick={e => setIsWin(1)}
          > 
            {(isCreate || isWin == 1) && <div className='navbar-element-select'></div>}
            <AddCircleOutlineOutlinedIcon className='icons'/> 
            <p>Create Models</p>
          </div>
          <div className='navbar-actions-3 navbar-action-elements'
            onClick={e => setIsWin(2)}
          > 
            {(isModels || isWin == 2) && <div className='navbar-element-select'></div>}
            <TocOutlinedIcon className='icons'/> 
            <p>Your Models</p>
          </div>
          <div className='navbar-actions-4 navbar-action-elements' 
            onClick={e => setIsWin(3)}
          > 
            {(isDocs || isWin == 3) && <div className='navbar-element-select'></div>}
            <ArticleOutlinedIcon className='icons'/> 
            <p>Leaderboard</p>
          </div>
        </div>
        <div style={{cursor: 'pointer'}} onClick={handleSignOut} className='navbar-exit navbar-action-elements'>
          <LogoutIcon className='icons'/>
          <p>Logout</p>
        </div>
    </div>
  )
}

export default Navbar