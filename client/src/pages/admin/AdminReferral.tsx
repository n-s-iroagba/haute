import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import MiniFooter from '../../common/components/MiniFooter';
import PaymentCard from '../../features/payments/components/PaymentCard';
import { getUnpaidReferrals } from '../../features/referral/helpers/referralHelpers';
import { ReferralDto } from '../../../../common/referralTypes'
import '../../common/styles/styles.css'
const AdminReferral = () => {
  const [referrals, setReferral] = useState<ReferralDto[]>([])
  
 
    useEffect(() => {
      const fetchReferralData = async () => {
        try {
          const referralArray:any = await getUnpaidReferrals()
          referralArray &&setReferral(referralArray)
        } catch (error) {
          console.error('Error fetching bonus data:', error);
        }
      };
    
      fetchReferralData();
    
    }, [])
  

 


  return (
    <div className='primary-background '>
    <div className='d-flex flex-column align-items-center full-height text-light px-3'>
      <h2 className='my-3'>Pending Referrals</h2>
      <Row className='d-flex justify-content-center align-items-center gy-2' >
      {referrals.length>0? referrals.map((referral:any) => (
        <Col xs={12} md={4} lg={3}>
        <PaymentCard key={referral.id}  
        amount={referral.amount}
        currency={referral.wallet.currency}
        address= {referral.wallet.address}
        id={referral.id} entity='referral' />
        </Col>
      ))
      :
      <h2 className='text-light text-center'>No Referrals.</h2>}
      </Row>
      </div>
      <MiniFooter primaryVariant/>
    </div>
  );
};

export default AdminReferral;
