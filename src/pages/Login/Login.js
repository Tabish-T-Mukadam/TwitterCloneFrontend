import React, { useState } from 'react'
import twitterImage from "../../assets/images/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import {useSignInWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setError] = useState('');
    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
    
    if (user||googleuser) {
    navigate('/')  
    // console.log(user)
    // console.log(googleuser)
    }

    if (error) {
        console.log(error.message)
    }

    if (loading) {
            console.log('loading..')
    }    

    const handleSubmit = e => {
      e.preventDefault();
      console.log('email, password');  
      signInWithEmailAndPassword(email,password)
    }
    const handleGoogleSignIn = ()=>{
      signInWithGoogle();
      }

  return (
    <div className='login-container'>
        <div className="image-container">
        <img className='image' src={twitterImage} alt=''/>    
        </div> 
        <div className="form-container">
<div className='form-box'>
  <TwitterIcon style={{color: 'skyblue'}}/>  
<h2  className='heading'>Happing now</h2>     
<h3  className='heading1'>What happening today</h3>  
<form onSubmit={handleSubmit}>
    <input type="email"
           className="email"
           placeholder='Email address'
           onChange={(e) => setEmail(e.target.value)}
           />

    <input type="password"
           className="password"
           placeholder='Password'
           onChange={(e) => setPassword(e.target.value)}
           />
    <div className='btn-login'>
        <button type='submit' className='btn'>Login</button>
    </div>
</form> 
</div>
<hr/>
<div className='google-button'>
  <GoogleButton
     className='g-btn'
     type='light'
     onClick={handleGoogleSignIn}
     />
</div>
<div>
 Don't have an account?
 <Link
    to='/signup'
    style={{
    textDecoration:'none',
    color:'skyblue',
    fontWeight:'600',
    marginLeft:'5px'

   }}>
   Sign up
  </Link>
</div>       
        </div>
    </div>
  
  )
}

export default Login
