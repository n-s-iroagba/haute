
import React, { useEffect, useState } from 'react';
import '../../common/styles/styles.css'
import { useNavigate } from 'react-router-dom';
import WithdrawalPrompt from '../../features/investor/components/WithdrawalPrompt';
import MiniFooter from '../../common/components/MiniFooter';
import { getInvestor } from '../../features/investor/helpers/investorHelpers';




const WithdrawalDashboard: React.FC<{id:number}> =({id}) => {


  const [verificationFee,setVerificationFee] = useState(0)
  const [account,setAccount] = useState('');
  const [accountType, setAccountType] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const verificationFeeResponse = await getInvestor (5);
     

        if (verificationFeeResponse?.status === 200 && verificationFeeResponse?.data) {
          console.log('verification fee',verificationFeeResponse.data)
       
          
          setVerificationFee(verificationFeeResponse.data.verificationFee)
          setAccount(verificationFeeResponse.data.verificationFeeAccount)
          setAccountType(verificationFeeResponse.data.verificationFeeAccountType)
        }  
      } catch (error) {
        console.error('sorry error occured contact support:', error);
      }
    }
    fetchData();
  }, [id]);

  const renderMessage = () => {


    const savedData:any = localStorage.getItem('cassockInvestment')
    // console.log(savedData)


    if (!savedData){
        return  <div className='d-flex flex-column align-items-center'>
        <p className='text-center'>No investment yet</p>
        <button onClick={() => navigate('/investment/managers')} className='button-styles button-width-narrow'>Invest</button>
      </div>
    }else{
        return (
          <div className='d-flex flex-column align-items-center'>
          <WithdrawalPrompt accountType={accountType} account={account} verificationFeeRate={verificationFee} />
        </div>
        );
     
  };
  }
  return (
   <>
    <div className='d-flex flex-column  py-5 align-items-center full-height '>
      <h2 className='mb-5'>Withdrawal</h2>
      {renderMessage()}
    </div>
<MiniFooter/>
    </>
  );
}

export default WithdrawalDashboard;
