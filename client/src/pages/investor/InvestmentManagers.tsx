import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ManagerCard from '../../common/components/ManagerCard'; 
import MiniFooter from '../../common/components/MiniFooter';
import { SelectManagerButton } from '../../common/components/Button';
import ErrorMessage from '../../common/components/ErrorMessage';
import '../../common/styles/styles.css'
import { ManagerDto } from '../../../../common/managerType';
import { getManagers } from '../../features/manager/helpers/managerApiHelpers';
import LoadingSpinner from '../../common/components/LoadingSpinner';


const InvestmentManagers: React.FC = () => {
const [managers,setManagers] = useState<ManagerDto[]|null>(null)
const [errorMessage, setErrorMessage]=useState('')

useEffect(()=>{
      fetchManagerData(); 
    },[]);
    const fetchManagerData = async () => {
      try {
        const managerData = await getManagers(); 
        managerData && setManagers(managerData);
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred while fetching managers. Please try again later.'); 
      }      
    }
    return (
       <div className='primary-background'>
        <div className='d-flex flex-column align-items-center px-3 full-height'>
        {!managers === null?
        <div className='d-flex justify-content-center'>
        <LoadingSpinner primaryBackground/>
        </div>:(
            <Row className='gy-4 gx-1'>
                <Col xs={12}>
                    <h3 className='text-center mt-4 text-light'>
                        { Array.isArray(managers) && managers.length?  'Select Your Fund Manager And Investment Tier':'No investment Manager Availble at this time.'}
                    </h3>
                </Col>
               <Row className='gx-2  gy-2 d-flex justify-content-center'>
                {Array.isArray(managers)&& managers.length?managers.map((manager:ManagerDto) => (
                <Col  key={manager.id} xs={12} md={6} lg={4}>
                    <ManagerCard
                        {...manager}
                        button={<SelectManagerButton managerId={manager.id} />}
                    />
                </Col>
                ))
              : <h3 className='text-light text-center'>No managers available yet</h3>
              }
                </Row>
            </Row>)}
            </div>
            <ErrorMessage message={errorMessage} />
            <MiniFooter primaryVariant={true} />
        </div>
            
    );
};

export default InvestmentManagers