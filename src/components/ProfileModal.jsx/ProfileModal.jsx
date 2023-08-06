import { Modal, useMantineTheme } from "@mantine/core";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext } from "react";
import { Links } from "../../Link";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Context } from "../../Context/Context";


function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const {name,lastName,citys,countrys,professions} = useContext(Context)
  const [fname, setFname] = React.useState(name)
  const [lname, setLname] = React.useState(lastName)
  const [city, setCity] = React.useState(citys)
  const [country, setCountry] = React.useState(countrys)
  const [status, setStatus] = React.useState("")
  const [profilePic, setProfilePic] = React.useState("")
  const [coverPic, setCoverPic] = React.useState("")
  const [profession, setProfession] = React.useState(professions)
  const [show, setShow] = React.useState(false)
  const navigation = useNavigate()

  const Change = async (e) => {
    const data = e.target.files[0]
    const base64 = await convertImg(data)
    setProfilePic(base64)
  }
  const convertImg = (data) => {
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

  const ChangeCover = async (e) => {
    const data = e.target.files[0]
    const base64 = await convertImgs(data)
    // setPic([data])
    setCoverPic(base64)
  }

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


  const updateProfile = async(e) => {
    const token = localStorage.getItem("code")
    // alert(token)
    try {
      // e.preventDefault()
      setShow(true)
      await axios.post(`${Links}/update/${token}`, {
        fname, lname, city, status, country, profession, profilePic, coverPic
      }).then((res) => {
        if (res.data.mess === "updated") {
          window.location.reload()
          setShow(false)
          setModalOpened(false)
        } else if (res.data.mess === "expire") {
          setShow(false)
          navigation("/")
        }
      })
    } catch {
      alert("server error")
      navigation("/")
    }
  }


  
  return (
    <>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <form className="infoForm">
          <h3>Your info</h3>

          <div>
            <input
              type="text"
              className="infoInput"
              name="FirstName"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder={name}
            />

            <input
              type="text"
              className="infoInput"
              name="LastName"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              placeholder={lastName}
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="Profession"
              value={profession === "" ? "" : profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder={professions === "" ? "Profession" : professions}
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="City"
              value={city === "" ? "" : city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={citys === "" ? "City" : citys}
            />

            <input
              type="text"
              className="infoInput"
              name="Country"
              value={country === "" ? "" : country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={countrys === "" ? "Country" : countrys}
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="RelationShip Status"
            />
          </div>


          <div>
            Profile Image
            <input type="file" onChange={Change} name='profileImg' />
            Cover Image
            <input type="file" onChange={ChangeCover} name="coverImg" />
          </div>

          <button className="button infoButton" onClick={() => updateProfile()}>Update</button>
        </form>

      </Modal>
      <Backdrop
        sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 4 }}
        open={show}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default ProfileModal;
