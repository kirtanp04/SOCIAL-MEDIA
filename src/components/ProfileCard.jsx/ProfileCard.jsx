import React, { useContext, useState } from "react";
import "./ProfileCard.css";
import { Context } from "../../Context/Context";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Modal, useMantineTheme } from "@mantine/core";

const ProfileCard = ({data,videoLength}) => {

  
  const{followers,following,post} = useContext(Context)
  const[img,setImg] = useState([])
  const[video,setVideo] = useState([])
  const [openMode, setOpenModel] = useState(false)
  const theme = useMantineTheme()
  const ProfilePage = true;
  const coverImg = "https://i.pinimg.com/736x/ce/11/6f/ce116f46e4b65a89e8890de09c1f59f0--bubble-photography-cover-quotes.jpg"
  const profilePicture = "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
  return (
    <>
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={data.CoverPic === " " ? coverImg : data.CoverPic} alt="" />
        <img src={data.ProfilePic === " " ? profilePicture : data.ProfilePic} alt="" />
      </div>

      <div className="ProfileName">
        <span>{data.Name}</span>
        <span>{data.WorkAs}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{followers.length}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow" onClick={()=>{setOpenModel(true)
              setImg(data.Posts)
              setVideo(data.Videos)}}>
                <span>{post.length + videoLength.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>


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
        <ImageList sx={{ width: 600, height: 450 }} cols={3} rowHeight={164}>
      {img.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={item}
            // srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt=""
            loading="lazy"
          />
        </ImageListItem>
      ))}
      {
        video.length === 0 ? <></>:<>
          {
            video.map((val)=>(
              <video width="200" controls>
                        <source
                          src={val}

                        />

                      </video>
            ))
          }
        </>
      }

      
    </ImageList>
      </Modal>
          
         </>   

  );
};

export default ProfileCard;
