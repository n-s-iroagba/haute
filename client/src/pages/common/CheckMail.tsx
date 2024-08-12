import React from "react";
import Information from "../../common/components/Information";
import { faMailchimp } from "@fortawesome/free-brands-svg-icons";
import '../../common/styles/styles.css'


const CheckMail = () => {
    return <div className="pt-5"> 
        <Information head='Check your mail' text="Kindly check your mail to proceed with the request." icon={faMailchimp} center/>
    </div>
}
export default CheckMail