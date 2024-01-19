import React from 'react';
import HomeButton from './HomeButton.jsx';
import { useNavigate } from 'react-router-dom';
import Semester from './Semester.jsx';

function Splash () {

    const navigate = useNavigate();

    const handleMemberClick = () => {
        navigate('/member');
    };

    const handleChoreographerClick = () => {
        navigate('/choreographer');
    };

    const handleOfficerClick = () => {
        navigate('/officer');
    };

  return (
    <div>
        <HomeButton isSplash />
        <div><Semester /></div>
        <button className="big-button" onClick={handleMemberClick}>Member</button>
        <button className="big-button" onClick={handleChoreographerClick}>Choreographer</button>
        <button className="big-button" onClick={handleOfficerClick}>Officer</button>
    </div>
  );
};

export default Splash;