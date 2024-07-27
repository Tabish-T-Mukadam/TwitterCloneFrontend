import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import TweetBox from './Feed/TweetBox/TweetBox'
import {Outlet} from 'react-router-dom'
import Widgets from './Widgets/Widgets'
import { signOut } from 'firebase/auth'
import auth from '../firebase.init'
import { useAuthState } from 'react-firebase-hooks/auth'
//import useLoggedInUser from '../hooks/useLoggedInUser'

const Home = () => {
  const user = useAuthState(auth)
  //console.log(user[0]?.email);
  //const [loggedInUser] = useLoggedInUser();
  //console.log(loggedInUser)

  const handleLogout =()=>{
    signOut(auth)
  }

  return (
    <div className='app'>
    <Sidebar handleLogout={handleLogout} user={user}/>
    <TweetBox/>
    <Outlet/>
    <Widgets/>
    </div>
  )
}

export default Home

