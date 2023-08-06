import React, { useContext, useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import { Button, ListItem, Modal, useMantineTheme } from "@mantine/core";
import { Context } from "../../Context/Context";
import { Avatar, List, ListItemAvatar, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Links } from "../../Link";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";

const RightSide = ({ getAllUser }) => {

  const { setShowEdit,showEdit } = useContext(Context)
  const theme = useMantineTheme()
  const [modalOpeneds, setModalOpeneds] = useState(false)
  const [modalOpened, setModalOpened] = useState(false)
  const navigation = useNavigate()
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState([])
  const Homes = () => {
    getAllUser()
    window.location.reload()
    setShowEdit(false)
  }

  const getNoti = async () => {
    setModalOpeneds(true)
    const token = localStorage.getItem("code")
    if (token) {
      try {
        setLoading(true)
        await axios.get(`${Links}/getrequest/${token}`)
          .then((res) => {
            setLoading(false)
            setRequests(res.data.data)
          })
      } catch {
        navigation('/')
      }
    } else {
      navigation('/')
    }

  }

  const Accept = async(id)=>{
    const token = localStorage.getItem("code")
    if (token) {
      try {
        setLoading(true)
        await axios.post(`${Links}/getrequest/${id}/${token}`)
          .then((res) => {
            if(res.data.mess === "success"){
              getNoti()
              setLoading(false)
            }
          })
      } catch {
        navigation('/')
      }
    } else {
      navigation('/')
    }
  }


  return (
    <>
      <div className="RightSide">
        <div className="navIcons">
          <img src={Home} alt="" onClick={() => Homes()} />
          {
            showEdit? <></>:<>

          <UilSetting onClick={()=>setModalOpened(true)}/>
            </>
          }
          <img src={Noti} alt="" onClick={() => getNoti()} />
          {/* <img src={Comment} alt="" /> */}
        </div>

        <TrendCard />

        <Modal
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          size="50%"
          opened={modalOpeneds}
          onClose={() => setModalOpeneds(false)}
        >

          {
            loading ? <>

              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </> : <>
            <div className="texts">
              <h2>Want's to Follow You</h2>
            </div>
              {
                requests.map((val) => {
                  return (
                    <>
                    <div className="comment">
                      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <Avatar alt={val.name} src={val.pic} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={val.name} secondary={val.id} />

                        </ListItem>
                      </List>
                      <Button onClick={()=>Accept(val.id)}>Accept</Button>
                      </div>
                      <hr />
                    </>
                  )
                })
              }
            </>
          }




        </Modal>

      </div>

      

          <ProfileModal modalOpened={modalOpened}
            setModalOpened={setModalOpened}/>



    </>



  );
};

export default RightSide;
