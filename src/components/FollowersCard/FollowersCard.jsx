import React, { useContext, useState } from 'react'
import './FollowersCard.css'
import { useNavigate } from 'react-router-dom'
import { Links } from '../../Link'
import axios from 'axios'
import { Context } from '../../Context/Context'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
// import { Followers } from '../../Data/FollowersData'


const FollowersCard = ({ users, show, setCitys,setCountrys,setStatus, setdata,setVideoLength,setPost,setFollowers,setFollowing }) => {
    const navigation = useNavigate()
    // const [text, setText] = useState("Follow")
    const [shows, setShow] = useState(false)
    const{setShowEdit,member} = useContext(Context)


    const sendRequest = async (id) => {
        const token = localStorage.getItem("code")
        // alert(id)
        if (token) {
            try {

                setShow(true)
                await axios.post(`${Links}/sendrequest/${token}/${id}`)
                    .then((res) => {
                        if (res.data.mess === "success") {
                            setShow(false)
                             Toastify({
                                text: "Request Send.",
                                duration: 2000,
                                newWindow: true,
                                close: true,
                                gravity: "top", // `top` or `bottom`
                                position: "center", // `left`, `center` or `right`
                                stopOnFocus: false, // Prevents dismissing of toast on hover
                                style: {
                                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                                },
                              }).showToast();
                            // setText("Request Sent")
                        }else if(res.data.mess === "there"){
                            setShow(false)
                            Toastify({
                                text: "Already Sent !!!",
                                duration: 2000,
                                newWindow: true,
                                close: true,
                                gravity: "top", // `top` or `bottom`
                                position: "center", // `left`, `center` or `right`
                                stopOnFocus: false, // Prevents dismissing of toast on hover
                                style: {
                                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                                },
                              }).showToast();
                        }
                    })
            } catch {
                navigation('/')
            }
        } else {
            navigation("/")
        }
    }

    const getUserData = async(id)=>{
        try{
            setShow(true)
                await axios.get(`${Links}/singleuser/${id}`)
                    .then((res) => {
                        if (res.data.mess === "success") {
                            setShow(false)
                            setShowEdit(true)
                            setdata(res.data.user)
                            setVideoLength(res.data.user.Videos)
                            setPost(res.data.user.Posts)
                            setFollowers(res.data.user.Followers)
                            setFollowing(res.data.user.Following)
                            
                        }
                    })
        }catch{
            alert("server error")
        }
    }



    const profilePicture = "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
    return (
        <div className="FollowersCard">
            <h3>Enjoyers</h3>
            {
                show ? <>
                    <div className="buttons spinner-border text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </> : <>
                    {users.filter((data) => {
                            if (data.Name.includes(member)) {
                              return data
                            }
                          }).map((follower, id) => {
                        return (
                            <div className="follower">
                                <div>
                                    <img src={follower.ProfilePic === " " ? profilePicture : follower.ProfilePic} alt="" className='followerImage' onClick={()=>getUserData(follower._id)} />
                                    <div className="name">
                                        <span>{follower.Name}</span>
                                        <span>@{follower.Name}</span>
                                    </div>
                                </div>

                                {
                                    shows ? <>
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </> : <>
                                        <button className='button fc-button' onClick={() => sendRequest(follower.Email)}>
                                            Follow
                                        </button>
                                    </>
                                }
                            </div>
                        )
                    })}
                </>
            }



        </div>
    )
}

export default FollowersCard