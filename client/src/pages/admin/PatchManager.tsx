import React from 'react';
import ManagerForm from '../../features/manager/components/ManagerForm';
import '../../common/styles/styles.css'
import { useNavigate } from 'react-router-dom';
const PatchManager: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='primary-background px-3 pt-5'>
      <div className='d-flex flex-column align-items-center'>
        <button className='button-styles button-width-narrow' onClick={() => navigate('/admin/managers')}>View Managers</button>
        <ManagerForm patch={true} />
      </div>
    </div >)
}
export default PatchManager;
