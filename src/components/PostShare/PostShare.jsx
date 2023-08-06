import React, { useState, useRef, useContext } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { Context } from "../../Context/Context"
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import axios from "axios";
import { Links } from "../../Link";
import { useNavigate } from "react-router-dom";

const PostShare = ({ data, show, setShow }) => {


  const [image, setImage] = useState(null);
  const [video, setVideo] = useState("")
  const [videos, setVideos] = useState(null)
  const [pic, setPic] = useState("")
  const imageRef = useRef();
  const videoRef = useRef()
  const { getAllPost } = useContext(Context)
  const navigation = useNavigate()
  const [caption, setCaption] = useState("")
  const[datas,setData] = useState("")

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
    const data = event.target.files[0]
    const base64 = await convertImgs(data)
    // setPic([data])
    setPic(base64)
    setData(base64)
  };

  const convertImgs = (data) => {
    return new Promise((sucess, fail) => {
      const fileRender = new FileReader();
      fileRender.readAsDataURL(data);
      fileRender.onload = () => {
        sucess(fileRender.result);
        // console.log(files)
      }
      fileRender.onerror = (e) => {
        fail(e);
      }

    })
  }


  const onVideoChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setVideos({
        image: URL.createObjectURL(img),
      });
    }
    const data = event.target.files[0]
    const base64 = await convertImgs(data)
    // setPic([data])
    setVideo(base64)
    setData(base64)
  };


  const PostShare = async () => {
    if (datas === "") {
      return Toastify({
        text: "Select Post",
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

      const token = localStorage.getItem("code")
      if (token) {
        try {
          setShow(true)
          await axios.post(`${Links}/uploadpost/${token}`, {
            pic, caption, video
          })
            .then((res) => {
              if (res.data.mess === "success") {
                setImage("")
                setPic("")
                setVideo("")
                setCaption("")
                getAllPost()
                setData("")
                setShow(false)
              }
            })
        } catch {
          navigation("/")
        }

      } else {
        navigation("/")
      }

    }
  }




  return (
    <>
      <div className="PostShare">
        <img src={data.ProfilePic} alt="" />
        <div>
          <input type="text" placeholder="Caption???" value={caption} onChange={(e) => setCaption(e.target.value)} />
          <div className="postOptions">
            <div className="option" style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>
            <div className="option" onClick={() => videoRef.current.click()} style={{ color: "var(--video)" }}>
              <UilPlayCircle />
              Video
            </div>{" "}
            <div className="option" style={{ color: "var(--location)" }}>
              <UilLocationPoint />
              Location
            </div>{" "}
            <div className="option" style={{ color: "var(--shedule)" }}>
              <UilSchedule />
              Shedule
            </div>
            <button className="button ps-button" onClick={() => PostShare()}>Share</button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
              <input
                type="file"
                name="myImage"
                ref={videoRef}
                onChange={onVideoChange}
              />
            </div>
          </div>
          {image && (

            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={image.image} alt="" />
            </div>

          )}
          {videos
            && (

              <div className="previewImage">
                <UilTimes onClick={() => setVideos(null)} />
                <video width="300" controls>
                  <source
                    src={videos}
                    
                   />
                   
                </video>
              </div>

            )
          }


        </div>
      </div>
      <Backdrop
        sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 4 }}
        open={show}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default PostShare;
