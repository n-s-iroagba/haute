import React from "react";
import { Spinner } from "react-bootstrap";



const LoadingSpinner:React.FC<{primaryBackground?:boolean, fullheight?:boolean}> = ({primaryBackground,fullheight}) =>{
    const color = primaryBackground?'text-light':''
    const spinnerColor = primaryBackground?'light':'success'
    const fullHeightClassName = fullheight ? 'full-height' :''

    return <div className= {`${fullHeightClassName} w-100 d-flex justify-content-center flex-column align-items-center`}>
        <Spinner variant={spinnerColor}/>
        <p className={color}>Loading...</p>
    </div>
}
export default LoadingSpinner