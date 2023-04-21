import React from 'react';
import './LandingPage.css';
import { supabase } from './authClient/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import logo from "./assets/images/rewards_ai.svg"

const LandingPage = () => {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (e) => {
    if (e === 'SIGNED_IN') {
      navigate('/success')
    } else {
      navigate('/')
    }
  });

  return (
    <div className="landing">
      <div className='landing-navbar'>
        <p>GitHub</p>
        <p>Docs</p>
        <Auth supabaseClient={supabase} theme="dark" providers={['google']} appearance={{ theme: ThemeSupa }}/>
      </div>
      <div className='landing-body'>
        <img className='rewards_landing_logo' src={logo} alt='rewards-ai'/>
        <div className='rewards_descp'>
          <h1><strong>rewards.ai</strong></h1>
          <p>rewards.ai is an open-source low-code reinforcement learning training platform created by 
             <a href='https://www.linkedin.com/in/pratyush-patnaik-1394a91b8/'> Pratyush Kumar Patnaik </a> and 
             <a href='https://in.linkedin.com/in/anindyadeep-sannigrahi-38683b1b6'> Anindyadeep Sannigrahi </a>. 
            The overall project comprises various components, such as rewards-sdk, rewards-api, and rewards-ui. 
            It is currently in <strong>beta</strong>. We are beginning GitHub contributions from <strong>June 23</strong>. Any form of contributions are welcome!</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
