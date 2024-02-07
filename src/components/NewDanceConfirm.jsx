import React  from 'react';
import { useNavigate } from 'react-router-dom';

const NewDanceConfirm = () => {
    const navigate = useNavigate();

    const handleManageClick = () => {
        navigate('/choreographer/find');
    }


  return (
    <div>
      <div className='thank-you'>Your dance is saved! You may now add dancers to your roster:</div>
      <button className='big-button' onClick={handleManageClick}>Change Your Roster</button> 
    </div>
  );
};

export default NewDanceConfirm;