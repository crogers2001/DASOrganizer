import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import HomeButton from './HomeButton.jsx';

function ContactDancer () {
    const { objectID } = useParams(); //the objectID of the user's dance
    const [displayedDancer, setDisplayedDancer] = useState(null);
    const navigate = useNavigate();

    const handleSelect = (selectedDancer) => {
        setDisplayedDancer(selectedDancer);
    }

    const handleBackButton = () => {
        if (!objectID){
            navigate(`/member`);
        }
        else{
            navigate(`/choreographer/manage/${objectID}`);
        }
        
    }

    return (
        <div>
            <button className='back-button' onClick={handleBackButton}>
                <img src= "/back-arrow.svg" alt="Back" />
            </button>
            <HomeButton />
            <div className='form-container'>
                <h1>Contact a Dancer</h1>
                <div className='fine-print'>Search for a dancer to get their contact information:</div>
                <SearchBar type="members" onSelect={handleSelect} />
                <div>
                    {displayedDancer && (
                        <div>
                            <h2>Contact Info:</h2>
                            <div>{displayedDancer.name}</div>
                            <div>{displayedDancer.email}</div>
                            <div>{displayedDancer.phone}</div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default ContactDancer;