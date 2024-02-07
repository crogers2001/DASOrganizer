import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton.jsx';
import Semester from './Semester.jsx';

function MemberPage() {

    const navigate = useNavigate();

    const handleEnrollClick = () => {
        navigate('/member/enroll');
      };
    
    const handleBackButton = () => {
      navigate('/');
    }
    
    const handleContactADancerClick = () => {
      navigate(`/member/contactdancer`);
    };
  
    const handlePayDuesClick = () => {
      // Navigate to the specified URL
      window.open('https://tamu.estore.flywire.com/products?storeCatalog=2908', '_blank');
  };

    return (
      <div>
        <button className='back-button' onClick={handleBackButton}>
          <img src= "/back-arrow.svg" alt="Back" />
        </button>
        <HomeButton />
        <h1>Member</h1>
            <button className="big-button" onClick={handleEnrollClick}>Enroll as a Member</button>
            <button className="big-button" onClick={handlePayDuesClick}>Make a Payment</button>
            <button className='big-button' onClick={handleContactADancerClick}>Contact a Member</button>
      </div>
    )
}

export default MemberPage