import React from 'react'
// import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
import Post from '../Post/Post'
const PostSide = ({data,show,setShow}) => {
  return (
   <div className="PostSide">
       <PostShare data={data} setShow={setShow} show={show}/>
       <Post/>
   </div>
  )
}

export default PostSide