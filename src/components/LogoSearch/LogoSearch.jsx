import React, { useContext } from 'react'
// import Logo from '../../img/logo.png'
// import {UilSearch} from '@iconscout/react-unicons'
import './LogoSearch.css'
import { Context } from '../../Context/Context'
const LogoSearch = () => {

    const{member,setMember} = useContext(Context)
  return (
   <div className="LogoSearch">
       {/* <img src={Logo} alt="" /> */}
       <div className="Search">
           <input type="text" placeholder='Search Members' value={member} onChange={(e)=>setMember(e.target.value)} />
           {/* <div className="s-icon">
               <UilSearch/>
           </div> */}
       </div>
   </div>
  )
}

export default LogoSearch