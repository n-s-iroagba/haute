import React from 'react'
import'../styles/styles.css'
const Logo:React.FC<{logoImage:any}> = ({logoImage}) =>{
    return(
        <div>
          <img className='logo' src={logoImage} alt='Logo'/>
        </div>
    )
}
export default Logo 

