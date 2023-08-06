import React, { useContext, useEffect, useState } from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Links } from "../../Link"
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import { Context } from '../../Context/Context'
const Profile = () => {
  const navigation = useNavigate()
  const [data, setdata] = useState("")
  const [show, setShow] = React.useState(false)
  const{setName,setlastName,setCitys,setCountrys,setProfessions,
    setRequestSent,setFollowers,setFollowing,setPost,setGetRequest,getAllPost} = useContext(Context)
  const[users,setUsers] = useState([])
  const[videoLength,setVideoLength] = useState([])
  const[status,setStatus] = useState('')

  useEffect(() => {
    checkLogin()
    getData()
    getAllUser()
    getAllPost()
  }, [])

  const checkLogin = async () => {
    const code = await localStorage.getItem("code")
    if (code === "") {
      navigation("/")
    }
  }

  const getData = async () => {
    const token = await localStorage.getItem("code")
    if (!token) {
      navigation("/")
    } else {

      try {
        setShow(true)
        await axios.get(`${Links}/getdata/${token}`)
          .then((res) => {
            setShow(false)
            setdata(res.data.data)
            setName(res.data.data.Name)
            setlastName(res.data.data.lastName)
            setCitys(res.data.data.City)
            setCountrys(res.data.data.Country)
            setProfessions(res.data.data.WorkAs)
            setRequestSent(res.data.data.sentTo)
            setFollowers(res.data.data.Followers)
            setFollowing(res.data.data.Following)
            setPost(res.data.data.Posts)
            setGetRequest(res.data.data.UserRequest)
            setVideoLength(res.data.data.Videos)
            setStatus(res.data.data.Status)

          })
      } catch {
        setShow(false)
        navigation("/")
      }
    }
  }

  const getAllUser = async()=>{
    const token = localStorage.getItem("code")
    if(token){
      try{
        setShow(true)
        await axios.get(`${Links}/getusers/${token}`)
        .then((res)=>{
          setShow(false)
          setUsers(res.data)
        })
      }catch{
        navigation("/")
      }
     
    }else{
      navigation("/")
    }
  }





  return (
    <div className="Profile">
      <ProfileLeft data={data} users={users} show={show} setCitys={setCitys}
        setCountrys={setCountrys} setProfessions={setProfessions} setFollowers={setFollowers}
        setPost={setPost} setVideoLength={setVideoLength} setFollowing={setFollowing} setStatus={setStatus}
        setdata={setdata}
      />

      <div className="Profile-center">
        <ProfileCard data={data} videoLength={videoLength}/>
        <PostSide data={data} show={show} setShow={setShow}/>
      </div>

      <RightSide getAllUser={getAllUser}/>
      
    </div>
  )
}

export default Profile