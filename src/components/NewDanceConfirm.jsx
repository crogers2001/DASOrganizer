import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewDanceConfirm = () => {
    const navigate = useNavigate();

    const handleManageClick = () => {
        navigate('/choreographer/find');
    }

  useEffect(() => {

  }, []);

  //send user straight into their dance manager without needing to type in credentials
  return (
    <div>
      <div className='thank-you'>Your dance is saved! You may now manage your dance:</div>
      <button className='big-button' onClick={handleManageClick}>Manage Your Dance</button> 
    </div>
  );
};

export default NewDanceConfirm;