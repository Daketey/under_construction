import './lib.css';
import { useEffect, useState } from 'react';
import { loadGoogleScript } from './GoogleLogin';
import {useDispatch, useSelector } from 'react-redux';
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const dispatch = useDispatch();
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const {isLoggedIn} = useSelector((state)=> state.isLoggedIn)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState();
  
  const onSuccess = (googleUser) => {
    dispatch({type:"TRUE"});
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };
  
  const onFailure = () => {
    dispatch({type:"FALSE"});
  }
  
  const logOut = () => {
    (async() => {
      await googleAuth.signOut();
      dispatch({type:"FALSE"});
      renderSigninButton(gapi);
    })();
  };
  
  const renderSigninButton = (_gapi) => {
    _gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure 
    });
  }
  
  
  useEffect(() => {
    
    //window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
     
      const _gapi = window.gapi;
      setGapi(_gapi);
      
      _gapi.load('auth2', () => {
        (async () => { 
          const _googleAuth = await _gapi.auth2.init({
           client_id: googleClientId
          });
          setGoogleAuth(_googleAuth);
          renderSigninButton(_gapi);
        })();
      });
    }
    
    //ensure everything is set before loading the script
    loadGoogleScript();
    
  }, []);
  
  
  return (
    <div >
        {!isLoggedIn &&
          <div id="google-signin"></div>
        }
        {isLoggedIn &&
          <div>
            <div>
              <img src={imageUrl} />
            </div>
            <div>{name}</div>
            <div>{email}</div>
            <button className='btn-primary' onClick={logOut}>Log Out</button>
          </div>
        }
    </div>
  );
}

export default App;