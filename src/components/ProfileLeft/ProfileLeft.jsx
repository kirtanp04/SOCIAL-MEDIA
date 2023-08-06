import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
const ProfileLeft = ({data,users,show,setCitys,setCountrys,setStatus,setdata,setVideoLength,setPost,setFollowers,setFollowing}) => {
  return (
   <div className="ProfileSide">
       <LogoSearch/>
       <InfoCard data={data}/>
       <FollowersCard users={users} show={show} setCitys={setCitys}
        setCountrys={setCountrys} setStatus={setStatus} setdata={setdata}
        setPost={setPost} setVideoLength={setVideoLength} setFollowers={setFollowers}
        setFollowing={setFollowing}
        />
   </div>
  )
}

export default ProfileLeft