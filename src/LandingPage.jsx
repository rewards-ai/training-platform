import React from 'react';
import './LandingPage.css';
import { supabase } from './authClient/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (e) => {
    if (e === 'SIGNED_IN') {
      navigate('/success');
    } else {
      navigate('/');
    }
  });

  return (
    <div className="landing">
      <Auth
        supabaseClient={supabase}
        theme="dark"
        providers={['google']}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  );
};

export default LandingPage;
