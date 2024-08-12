import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import'../styles/styles.css'
const Information:React.FC<{ head:string,text: string; icon: IconProp, center?:boolean }> = (props) => {
    return<div className="w-100">
        <div className="d-flex justify-content-center mb-2"><FontAwesomeIcon className="primary-color icon-size" icon={props.icon}/></div>
        <h4 className="text-center">{props.head}</h4>
        <p className={ 'text-center'} >{props.text}</p>
    </div>
}
export default Information