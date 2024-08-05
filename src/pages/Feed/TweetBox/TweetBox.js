import React, { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from 'axios';
import "./TweetBox.css"
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

function TweetBox() {
  const [post, setPost] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [loggedInUser] = useLoggedInUser();
  //console.log(loggedInUser)
  const [user]=useAuthState(auth);
  const email = user?.email;

  const userProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
  
  const handleUploadImage = (e)=>{
      setIsLoading(true)
      const image = e.target.files[0];
      
      const formData = new FormData();
      formData.set('image', image)

      axios.post("https://api.imgbb.com/1/upload?key=6b734baff606732321dbdaca2d170894", formData)
          .then(res => {
          setImageURL(res.data.data.display_url);
          console.log(res.data.data.display_url);
          setIsLoading(false);
          })
          .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
  }

  const handleTweet = (e) => {
    e.preventDefault();
    if (user.providerData[0].providerId==='password'){
       fetch('http://localhost:5000/loggedInUser?email=${email}')
       .then(res=>res.json())
       .then(data => {
          setName(data[0]?.name)
          setUsername(data[0]?.username)
        })
    }
    else{
      setName(user?.displayName)
      setUsername(email?.split('@')[0])
    }
    //if (user?providerData[0]?.provider)
    if (name){
    const userPost = {
      profilePhoto:userProfilePic,
      post: post,
      photo: imageURL,
      username:username,
      name:name,
      email:email
    }
    //console.log(userPost);
    setPost('');
    setImageURL('');
    fetch('http://localhost:5000/post',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(userPost)
    })
      .then(res => res.json())
      .then(data =>{
        console.log(data);
      })
  };
}

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox_input">
        <Avatar src={loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>

        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
          {
          isLoading ? <p>Uploading Image</p> : <p>{imageURL ? 'Image Uploaded' : <AddPhotoAlternateOutlinedIcon />}</p>
          }
          </label>
          <input type="file" id="image" className="imageInput" onChange={handleUploadImage}/>
          <Button className="tweetBox__tweetButton" type="submit">
          Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;