import React, { useContext, useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import { Modal, useMantineTheme } from "@mantine/core";
import { Context } from '../../Context/Context'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Links } from '../../Link'
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useNavigate } from 'react-router-dom'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


const Post = () => {
  const { show, allPosts, getAllPost } = useContext(Context)
  const [showlike, setLike] = useState(false)
  const [loading, setLoading] = useState(false)
  const [commLoading, setCommLoading] = useState(false)
  const theme = useMantineTheme()
  const [openMode, setOpenModel] = useState(false)
  const [comm, setComm] = useState("")
  const [postID, setPostID] = useState("")
  const [comments, setComments] = useState([])
  const navigation = useNavigate()
  const addLike = async (id) => {
    try {
      setLike(true)
      await axios.put(`${Links}/addlike/${id}`)
        .then((res) => {
          if (res.data.mess === "success") {
            setLike(false)
            getAllPost()
          }

        })

    } catch {
      alert("server error")
    }
  }

  const openComment = async (id) => {
    setOpenModel(true)
    setPostID(id)
    const token = localStorage.getItem("code")
    if (token) {
      try {
        setCommLoading(true)
        await axios.get(`${Links}/getcomment/${id}`)
          .then((res) => {
            setCommLoading(false)
            if (res.data.mess === "success") {
              setComments(res.data.comment)
            }
          })
      } catch {
        alert("error")
        navigation('/')
      }
    } else {
      navigation('/')
    }
  }


  const postComment = async () => {
    const token = localStorage.getItem("code")
    if (token) {

      if (comm === "") {
        return Toastify({
          text: "Enter Comment!!",
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
      } else {

        try {
          setLoading(true)
          // alert(postID)
          await axios.post(`${Links}/addcomment/${postID}/${token}`, {
            comm
          })
            .then((res) => {
              if (res.data.mess === "success") {
                setLoading(false)
                setPostID(postID)
                openComment(postID)
                setComm("")
              }
            })
        } catch {
          alert("server error")
          navigation("/")
          // setLoading(false)
          //       openComment()
          //       setComm("")
        }
      }

    } else {
      navigation('/')
    }

  }



  return (
    <>
      {
        allPosts.toReversed().map((val) => {
          return (
            <>
              <div className="Post">
                {
                  val.Post === "" ?
                    <>
                      <video width="500" controls>
                        <source
                          src={val.Video}

                        />

                      </video>
                    </> : <>

                      <img src={val.Post} alt="" />
                    </>
                }



                <div className="postReact">
                  {
                    showlike === false ?
                      <>
                        <img src={Heart} alt="" onClick={() => addLike(val._id)} />
                      </> : <>
                        <div class="spinner-border text-warning spinner-border-sm" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </>
                  }

                  <img src={Comment} alt="" onClick={() => openComment(val._id)} />
                  <img src={Share} alt="" />
                </div>

                <div className='date'>

                  <span style={{ color: "var(--gray)", fontSize: '12px' }} >{val.likes} likes</span>



                  <span style={{ color: "var(--gray)", fontSize: '12px' }}>{val.uploadedOn}</span>
                </div>

                <div className="detail">
                  <span><b>@{val.name}</b></span>
                  <span> {val.caption}</span>
                </div>
              </div>
            </>
          )
        })
      }
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
        opened={openMode}
        onClose={() => setOpenModel(false)}
      >


        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '55ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className='comment'>

            <TextField className='inputcomment' id="outlined-basic" value={comm} onChange={(e) => setComm(e.target.value)} label="Add Comment" variant="outlined" />
            {/* <button className="btn btn-secondary" onClick={()=>postComment()} >Post</button> */}

            {
              loading ? <>
                <div class="spinner-grow text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </> : <>
                <Button variant="contained" className="btns" onClick={() => postComment()}>Post</Button>
              </>
            }
          </div>
          <br />



          {
            commLoading ? <>
              <div className="spinn">
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </> : <>
              {
                comments.toReversed().map((val) => {
                  return (
                    <>
                      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                          <ListItemAvatar>
                            {/* <Avatar> */}
                            <Avatar alt="Remy Sharp" src={val.userPic} />
                            {/* </Avatar> */}
                          </ListItemAvatar>
                          {
                            val.length === 0 ?
                              <><ListItemText primary="No comments" /></> : <><ListItemText primary={val.comment} secondary={val.dat} /></>
                          }
                          

                          <h5>@{val.user}</h5>
                          
                        </ListItem>
                      </List>
                    </>
                  )
                })
              }
            </>
          }



        </Box>

      </Modal >


      <Backdrop
        sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default Post