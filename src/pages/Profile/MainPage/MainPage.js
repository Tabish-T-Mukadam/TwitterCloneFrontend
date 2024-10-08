import React,{useEffect,useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LockResetIcon from '@mui/icons-material/LockReset';
import AddLinkIcon from '@mui/icons-material/AddLink';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useNavigate } from 'react-router-dom';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import './MainPage.css'
import Post from '../../Feed/Post/Post';
import EditProfile from '../EditProfile/EditProfile';
import axios from 'axios';

const MainPage = ({ user }) => {
    const navigate = useNavigate();
    const [loggedInUser] = useLoggedInUser();
    const [isLoading, setIsLoading] = useState('');
    const [posts, setPosts] = useState([]);
    console.log(loggedInUser[0]);
    let userData = loggedInUser && loggedInUser.length > 0 ? loggedInUser[0]: null
    useEffect(()=>{
        fetch(`http://localhost:5002/userPost?email=${userData ? userData.email : null}`)
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
    },[])
    const username = userData?.username

    const handleUploadCoverImage = (e)=>{
        setIsLoading(true);
        const image = e.target.files[0];
        
        const formData = new FormData();
        formData.set('image', image)
  
        axios.post("https://api.imgbb.com/1/upload?key=6b734baff606732321dbdaca2d170894", formData)
            .then(res => {
            const url = res.data.data.display_url;
            const userCoverImage = {
               email: user?.email,
               coverImage: url 
            }
            setIsLoading(false);
            if (url){
                axios.patch('http://localhost:5002/userUpdates/${user?.email}', userCoverImage)            
            } 
            })
    }
    const handleUploadProfileImage = (e)=>{
        setIsLoading(true);
        const image = e.target.files[0];
        
        const formData = new FormData();
        formData.set('image', image)
  
        axios.post("https://api.imgbb.com/1/upload?key=6b734baff606732321dbdaca2d170894", formData)
            .then(res => {
            const url = res.data.data.display_url;
            const userProfileImage = {
                email: user?.email,
                profileImage: url 
             }
            setIsLoading(false);
            if (url){
                axios.patch('http://localhost:5002/userUpdates/${user?.email}', userProfileImage)            
            } 
            })
    }

    return (
        <div>
            <ArrowBackIcon className='arrow-icon' onClick={()=> { navigate('/') }} />
            <h4 className='heading-4'>@{username}</h4>   
            <div className='mainProfile'>
                <div className='profile-bio'>
                    {
                        <div>
                            <div className='coverImageContainer'>
                               <img src={loggedInUser[0]?.coverImage?loggedInUser[0]?.coverImage:'https://www.proactivechannel.com/Files/BrandImages/Default.jpg' } alt="" className='coverImage'/>
                             
                                <div className='hoverCoverImage'>
                                    <label htmlFor='image' className='imageIcon'>
                                    {
                                        isLoading?
                                        <LockResetIcon className='photoIcon photoIconDisabled'/>
                                        :
                                        <CenterFocusWeakIcon className='photoIcon' />

                                    }  
                                    </label>
                                    <div className='imageIcon_tweetButton'>   
                                        <input type="file"id='image' className='imageInput' onChange={handleUploadCoverImage}/>
                                    </div>
                                 </div>  
                            </div> 
                            <div className='avatar-img'>
                                <div className='avatarContainer'>
                                    <img src={loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' } alt="" className='avatar'/>

                                <div className='hoverAvatarImage'>
                                    <div className='imageIcon_tweetButton'>
                                    <label htmlFor='profileImage' className='imageIcon'>
                                    {
                                        isLoading?
                                        <LockResetIcon className='photoIcon photoIconDisabled'/>
                                        :
                                        <CenterFocusWeakIcon className='photoIcon' />

                                    }   
                                    </label>
                                    <div className='imageIcon_tweetButton'>   
                                        <input type="file"id='profileImage' className='imageInput' onChange={handleUploadProfileImage}/>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className='userInfo'>
                                    <div>
                                        <h3 className='heading-3'>
                                            {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}
                                        </h3>
                                        <p className='usernameSection'>@{username}</p>
                                    </div>
                                    <EditProfile user={userData} loggedInUser={loggedInUser} />
                                </div>    
                                    <div className='infoContainer'>
                                        {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''}   
                                        <div className='locationAndLink'>
                                            {loggedInUser[0]?.location ? <p className='subInfo'><MyLocationIcon/> {loggedInUser[0]?.location} </p>: ''}   
                                            {loggedInUser[0]?.website ? <p className='subInfo link'><AddLinkIcon/> {loggedInUser[0]?.website} </p>: ''}   
                                        </div>
                                    </div>
                                    <h4 className='tweetsText'>Tweets</h4>
                                    
                                    <hr/>
                                </div>
                                {
                                    posts.map(p => <Post id={p._id} p={p} />)
                                }
                            </div>
                        
                    }
                </div>
            </div>
        </div>
    );
};

export default MainPage;
