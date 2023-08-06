import React, {  useContext, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router-dom";


const InfoCard = ({data}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const{showEdit} = useContext(Context)
  const navigation = useNavigate()
  const Logout = ()=>{
    localStorage.clear("code")
    navigation("/")
  }
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
        {
          showEdit ? <></> : <>

          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          </>
        }
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status: </b>
        </span>
        <span>{data.Status}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in: </b>
        </span>
        <span>{data.City}</span>
      </div>

      <div className="info">
        <span>
          <b>Country: </b>
        </span>
        <span>{data.Country}</span>
      </div>

      <button className="button logout-button" onClick={()=>Logout()}>Logout</button>
    </div>
  );
};

export default InfoCard;
