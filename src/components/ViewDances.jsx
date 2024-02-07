import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import HomeButton from './HomeButton.jsx';

function ViewDances() {
    const [displayedDance, setDisplayedDance] = useState(null);
    const navigate = useNavigate();

    const handleSelect = (selectedDance) => {
        setDisplayedDance(selectedDance);
    }

    const handleBackButton = () => {
        navigate(`/officer/manage`);
    }

    return (
        <div>
            <button className='back-button' onClick={handleBackButton}>
                <img src="/back-arrow.svg" alt="Back" />
            </button>
            <HomeButton />
            <div className='form-container'>
                <h1>View Dances</h1>
                <div className='fine-print'>Search for a dance to view information:</div>
                <SearchBar type="performances" onSelect={handleSelect} />
                <div>
                    {displayedDance && (
                        <div>
                            <h5>Choreographer:</h5>
                            <div>{displayedDance.choreographer.name + " (email: " + displayedDance.choreographer.email + ")"}</div>
                            <h5>Dance Passcode:</h5>
                            <div>{displayedDance.passcode}</div>
                            <h5>Song:</h5>
                            <div>{displayedDance.name + " - " + displayedDance.artist}</div>
                            <h5>Dancers:</h5>
                            <div className='dancer-box'>
                                {displayedDance.dancers.map((dancer, index) => (
                                    <div key={index}>{dancer.name}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewDances;
