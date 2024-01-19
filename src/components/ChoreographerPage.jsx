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

    return (
        <div>
        <HomeButton />
        <h1>Choreographer</h1>
            <button className='big-button' onClick={handleNewDanceClick}>Create a New Dance for <Semester /></button>
            <button className='big-button' onClick={handleManageClick}>Manage Your Dance</button>
      </div>
    )
}

export default ChoreographerPage