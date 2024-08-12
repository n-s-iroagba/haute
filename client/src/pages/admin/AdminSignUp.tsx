import React from 'react'
import { LoginOption } from '../../features/auth/components/AuthOption'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Information from '../../common/components/Information'
import AdminSignUpForm from '../../features/auth/layout/AdminSignUpForm'
import MiniFooter from '../../common/components/MiniFooter'
import '../../common/styles/styles.css'

const AdminSignUp: React.FC = () => {

    return (
        <div className='px-4 py-4 d-flex flex-column align-items-center'>
            <div className='auth-page-items full-height'>
            <LoginOption
            title='Already have an account?'
            buttonText='Login'
             icon = {faUser}
             route='login' />
            <Information text='Welcome to the admin registeration page, please note there can only be one admin.' head='Account Details' icon={faUser} center={true} />
            <AdminSignUpForm />
            </div>
            <MiniFooter/>
        </div>
    )
}
export default AdminSignUp