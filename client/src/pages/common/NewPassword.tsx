import React, { useEffect } from 'react'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import Information from '../../common/components/Information'
import PasswordForm from '../../features/auth/layout/PasswordForm'
import '../../common/styles/styles.css'
import { useNavigate } from 'react-router-dom'

const NewPassword:React.FC = ()=>{
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (!token) {
            navigate('/login')
        }
    })
    
    return(
        <div className='px-4 py-4 d-flex flex-column align-items-center'>
        <div className='auth-page-items'>
     
              <Information center= {true}text='Enter new password.' head='New Password' icon={faUser} />
        <PasswordForm/>
      
        </div>
        </div>
    )
}
export default NewPassword