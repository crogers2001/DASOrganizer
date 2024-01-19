import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton.jsx';
import Semester from './Semester.jsx';

function MemberPage() {

    const navigate = useNavigate();

    const handleEnrollClick = () => {
        navigate('/member/enroll');
      };
      
    return (
      <div>
        <HomeButton />
        <h1>Member</h1>
            <button className="big-button" onClick={handleEnrollClick}>Enroll as a Member</button>
            <button className="big-button" >Pay Dues</button>
      </div>
    )
}

export default MemberPage