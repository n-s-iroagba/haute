import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import '../../../common/styles/styles.css'
import { useNavigate } from "react-router-dom";



const CircularButton: React.FC<{icon:any,title:string,path:string}> = ({icon,title,path})=>{
    const navigate = useNavigate()
    return<button onClick={()=>navigate('/'+path)} className="circular-button d-flex py-4 align-items-center justify-content-evenly flex-column"><FontAwesomeIcon icon={icon}/><small>{title}</small></button>
} 

export default CircularButton