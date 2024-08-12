import React from 'react'


const ErrorMessage:React.FC<{message:string}> = (message)=> {

return<>
{
    message.message===''?'': <p className='w-100 text-danger text-center'>{message.message}</p>
}
</>

}
export default ErrorMessage