import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton.jsx';
import Semester from './Semester.jsx';

function OfficerManage() {

    const navigate = useNavigate();

    // const handleViewMembersClick = () => {
    //     navigate('/member/enroll');
    //   };
    
    const handleBackButton = () => {
      navigate('/');
    }
    
    const handleViewDancesClick = () => {
      // Navigate to the specified URL
      navigate('/officer/manage/viewdances');
    };

    const handleRemoveDancesClick = () => {
        // Navigate to the specified URL
        navigate('/officer/manage/removedances');
      };

      const handleViewMembersClick = () => {
        // Navigate to the specified URL
        navigate('/officer/manage/viewmembers');
      };

      const handleRemoveMembersClick = () => {
        // Navigate to the specified URL
        navigate('/officer/manage/removemembers');
      };

    return (
      <div>
        <button className='back-button' onClick={handleBackButton}>
          <img src= "/back-arrow.svg" alt="Back" />
        </button>
        <HomeButton />
        <h1>Officer</h1>
            <button className="big-button" onClick={handleViewMembersClick}>View Members</button>
            <button className="big-button" onClick={handleViewDancesClick}>View Dances</button>
            <button className="big-button" onClick={handleRemoveMembersClick}>Remove A Member</button>
            <button className="big-button" onClick={handleRemoveDancesClick}>Remove A Dance</button>
      </div>
    )
}

export default OfficerManage