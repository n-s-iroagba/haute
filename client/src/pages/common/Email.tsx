import React from "react";
import EmailForm from "../../features/auth/layout/EmailForm";
import Information from "../../common/components/Information";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import '../../common/styles/styles.css'


const Email = ()=>{
    return(
        <div className='px-4 py-4 d-flex flex-column align-items-center'>
        <div className='auth-page-items'>
            <Information text='To retrieve password enter your registration email.' center={true} head='Enter email' icon={faUser} />
            <EmailForm/>
        </div>
        </div>
    )
}
export default Email