import React from 'react'
import Information from '../../../common/components/Information'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import '../../../common/styles/styles.css'

const ReferAndEarn :React.FC =()=>{
    return<div className='my-4 px-4'>
        <div className='d-flex flex-column align-items-center mb-3'>
            <h2 className='text-center'>Refer a friend and earn a reward</h2>
            <div className='primary-line'></div>
        </div>
         <Information head='' text={`Introduce a friend to our investment platform and both of you can reap the rewards
         ! With our Refer a Friend program, you can earn exciting rewards while your friend benefits from expert financial guidance.
          It's a win-win opportunity to share the wealth and grow together.`} icon={faUsers} /> 
    </div>
}
export default ReferAndEarn 