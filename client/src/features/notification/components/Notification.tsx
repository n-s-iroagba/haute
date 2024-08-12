import {NotificationDto} from '../../../../../common/notificationType'
import { Card} from 'react-bootstrap';

const Notification:React.FC<{data:NotificationDto}>=({data})=> {
  
    return(
    
      <Card className='w-100 mx-2'>
        <Card.Body>
       
          <Card.Title className='border-0 border-bottom border-black' >{data.title} </Card.Title>
  
        <Card.Text >{data.message}</Card.Text>
        </Card.Body>
       
      </Card>
     
    )}

export default Notification;