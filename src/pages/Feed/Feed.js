import React, { useEffect, useState } from 'react';
import './Feed.css'
import TweetBox from './TweetBox/TweetBox';
import axios from 'axios';
import './Feed.css'
import Post from './Post/Post';

const Feed = () => {
    const [posts, setPosts]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5002/post')
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
    },[])
    return (
    <div className='feed'>
      <div className='feed_header'>
      <h1>Home</h1>
      </div>
      <TweetBox />
      {
          posts.map(p=> <Post key={p._id} p={p}/>)
      }
    </div>
  );
};

export default Feed;
