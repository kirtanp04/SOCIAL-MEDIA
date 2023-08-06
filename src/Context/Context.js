import { createContext, useState } from "react";
import axios from "axios"
import {Links} from "../Link"

const Context = createContext()

const Provider = ({children})=>{



    const [personalData,setPersonalData] = useState("")
    const[name,setName]= useState("")
    const[lastName,setlastName]= useState("")
    const[citys,setCitys]= useState("")
    const[countrys,setCountrys]= useState("")
    const[professions,setProfessions] = useState("")
    const[requestSent,setRequestSent] = useState([])
    const[followers,setFollowers] = useState([])
    const[following,setFollowing] = useState([])
    const[post,setPost] = useState([])
    const[getRequest,setGetRequest] = useState([])
    const[allPosts,setAllPosts] = useState([])
    const[show,setShow] = useState(false)
    const[showEdit,setShowEdit] = useState(false)
    const[member,setMember]= useState("")


    const getAllPost = async()=>{
        try{
            setShow(true)
            await axios.get(`${Links}/getposts`)
            .then((res)=>{
                setShow(false)
                setAllPosts(res.data.data)
            })
        }catch{
            alert("server error while fetching posts")
        }
    }
    


    return(
        <>
            <Context.Provider value={{personalData,setPersonalData,name,setName,lastName,setlastName,citys,setCitys,countrys,setCountrys,professions,setProfessions,
            requestSent,setRequestSent,followers,setFollowers,following,setFollowing,post,setPost,getRequest,setGetRequest,getAllPost,allPosts,
            show,showEdit,setShowEdit,member,setMember}}>{children}</Context.Provider>
        </>
    )
}


export {Context, Provider}