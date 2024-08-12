import React from 'react';
import LoginForm from '../../features/auth/layout/LoginForm';
import { LoginOption } from '../../features/auth/components/AuthOption';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Information from '../../common/components/Information';
import MiniFooter from '../../common/components/MiniFooter';
import '../../common/styles/styles.css'

const Login:React.FC=()=>{

  return (
<div className='px-4 py-4 d-flex flex-column align-items-center'>
            <div className='auth-page-items'>
 <LoginOption
            title='Already have an account?'
            buttonText='Signup'
             icon = {faUser}
             route='signup' />
 <Information center= {true}text='' head='Login' icon={faUser} />
 <LoginForm/>
 </div>
 <MiniFooter/>
 </div>
  )
}

export default  Login;
