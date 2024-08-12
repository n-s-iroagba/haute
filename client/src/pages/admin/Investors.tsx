import React, { useEffect, useState } from 'react';
import {Col, Row } from 'react-bootstrap';
import DeleteModal from '../../common/components/DeleteModal';

import MiniFooter from '../../common/components/MiniFooter';
// import { InvestorAndInvestment } from '../../../../common/compositeTypes';
import '../../common/styles/styles.css'
import InvestorsCard from '../../features/investor/components/InvestorsCard';
import { getInvestors } from '../../features/investor/helpers/investorHelpers';




const Investors = () => {
  const [idToBeDeleted, setIdToBeDeleted] = useState(0)
const [showDeleteModal,setShowDeleteModal]= useState(false)
const [investorData, setInvestorData] = useState<any>([])
useEffect(() => {
  const fetchInvestorData = async () => {
    try {
      const data: [] = await getInvestors();
    data&& setInvestorData(data);
    console.log('investor',data)
    } catch (error) {
      console.error('Error fetching  data.investor data:', error);
    }
  };

  fetchInvestorData();
}, []);
const handleDelete =(id:number) =>{
setShowDeleteModal(true)
setIdToBeDeleted(id)

}

  return (
    <div className='primary-background '>
    <div className=' full-height px-2'>
    <h2 className='text-center text-light py-3'>Your Investors</h2>
    <Row className='flex flex-column align-items-center gy-3'>
      {investorData.length?investorData.map((data:any,index:number) => (
        <Col md={6}>
        <InvestorsCard
            firstName={data.investor.firstName}
            lastName={data.investor.lastName}
            amount={data.investment.amount}
            date={data.investment.investmentDate}
            amountDeposited={data.investment.amountDeposited}
            deleteButton={<button className='red-button button-width-narrow' onClick={() => handleDelete(data.investor.id)}>Delete</button>}       />
        </Col>
      )):
      <h2 className='text-center text-light'>No Investors...</h2>
      }
    </Row>
    <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='investor'/>
    </div>
    <MiniFooter primaryVariant/>
    </div>
  );
};
export default Investors;

