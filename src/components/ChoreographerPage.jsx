import React from 'react';
import HomeButton from './HomeButton.jsx';
import { useNavigate } from 'react-router-dom';
import Semester from './Semester.jsx';

function ChoreographerPage() {

    const navigate = useNavigate();

    const handleNewDanceClick = () => {
        navigate('/choreographer/new');
      };
    
    const handleManageClick = () => {
      navigate('/choreographer/find');
    }

    const handleBackButton = () => {
      navigate('/');
    }

    return (
      <div>
        <button className='back-button' onClick={handleBackButton}>
          <img src= "/back-arrow.svg" alt="Back" />
        </button>
        <HomeButton />
        <h1>Choreographer</h1>
            <button className='big-button' onClick={handleNewDanceClick}>Create a New Dance <br /> for <Semester /></button>
            <button className='big-button' onClick={handleManageClick}>Change Your <br /> Roster</button>
      </div>
    )
}

export default ChoreographerPage