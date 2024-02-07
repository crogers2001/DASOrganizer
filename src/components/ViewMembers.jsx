import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import HomeButton from './HomeButton.jsx';

function ViewMembers() {
    const [displayedMember, setDisplayedMember] = useState(null);
    const navigate = useNavigate();

    const handleSelect = (selectedMember) => {
        setDisplayedMember(selectedMember);
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
                <h1>View Members</h1>
                <div className='fine-print'>Search for a member to view information:</div>
                <SearchBar type="members" onSelect={handleSelect} />
                <div>
                    {displayedMember && (
                        <div>
                            <h5>Name:</h5>
                            <div>{displayedMember.name}</div>
                            <h5>Email:</h5>
                            <div>{displayedMember.email}</div>
                            <h5>Phone:</h5>
                            <div>{displayedMember.phone}</div>
                            <h5>Classification:</h5>
                            <div>{displayedMember.class}</div>
                            <h5>Semester enrolled:</h5>
                            <div>{displayedMember.semester}</div>
                            <h5>Status:</h5>
                            <div>{displayedMember.active ? 'Active' : 'Inactive'}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewMembers;
