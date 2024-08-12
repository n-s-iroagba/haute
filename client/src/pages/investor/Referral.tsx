import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form} from 'react-bootstrap';
import Information from '../../common/components/Information';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import '../../common/styles/styles.css'
import { ReferralDetailsDto } from '../../../../common/referralTypes';
import { clientDomain } from '../../constants/constants';
import { getReferralDetails } from '../../features/referral/helpers/referralHelpers';



const Referrals: React.FC<{id:number}>= ({id}) => {
 const [code, setCode] = useState<number>(0)
 const [link,setLink] = useState('')
 const [referrer,setReferrer] = useState({firstName:'', lastName:''})
 const [referred,setReferred] = useState<{firstName:string, lastName:string}[]>([])


 const navigate = useNavigate()
 useEffect(() => {
  const fetchReferral = async () => {
     
    try {
      const response:ReferralDetailsDto = await getReferralDetails(id);
      console.log('response',response)
      if (response){
    
      setCode( response.referralCode);
      setLink(`${clientDomain}/signup/${ response.referralCode}`)
      setReferrer( response.referrer)
      setReferred( response.referred)
      }
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

    fetchReferral(); 
  }, [id]);


  const handleCopyClick = () => {
    alert('Text copied to clipboard!');
    navigator.clipboard.writeText(code.toString()); 
  }
  const handleCopyClickLink = () => {
    alert('Text copied to clipboard!');
    navigator.clipboard.writeText(link); 
  };

  return (
   <div className="d-flex justify-content-center align-items-center flex-column my-5">
       <Information  text="Share either the link or the code with your friends, and you'll receive 20% of their initial investment profits.." head= "Refer and Earn" icon={faUsers} />
    <Form className="form py-5 " >       
   
        <Form.Group className='mb-2' controlId="validationFormik04">
          <Form.Label className='mb-0'>Referral Code</Form.Label>
          <Form.Control
            readOnly={true}
            value={code}
        className=" custom-input bg-transparent form-control text-light"
          />
        </Form.Group>

      <div className='d-flex justify-content-evenly w-100 pb-5'>
        <button onClick={handleCopyClick} className='button-styles w-50 text-light'>
         Copy Code
        </button>
      </div>
      <Form.Group className='mb-2' controlId="validationFormik04">
          <Form.Label className='mb-0'>Referral Link</Form.Label>
          <Form.Control
            readOnly={true}
            value={link}
        className=" custom-input bg-transparent form-control text-light"
          />
        </Form.Group>

      <div className='d-flex justify-content-evenly w-100 pb-5'>
        <button onClick={handleCopyClickLink} className='button-styles w-50 text-light'>
         Copy Link
        </button>
      </div>
      <Form.Group className='mb-4 border-0 border-bottom border-white'>
        <Form.Label className='mb-0'>Referrer:</Form.Label>
        <div>{referrer.firstName+'   '}{referrer.lastName}</div>
        </Form.Group>
        <Form.Group className='my-4'>
        <Form.Label className='mb-0'>Referrals:</Form.Label>
        {
          referred.map((referral)=>(
            <div>{referral.firstName + '  '}{referral.lastName}</div>
          ))
        }
        </Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
       
        <button className='button-styles text-light w-50' onClick={() => navigate('/dashboard')}> Dashboard</button>
        
      
      </div>
    </Form>
    </div>
  );
};

export default Referrals;
