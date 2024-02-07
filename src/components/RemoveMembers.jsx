import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton.jsx';
import SearchBar from './SearchBar.jsx';

function RemoveMembers() {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (selectedMember) {
      try {
        const response = await fetch(`https://www.server.dastamu.com/api/members/${selectedMember._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          console.log('Member removed successfully');
          navigate('/officer/manage')
          // Optionally, you can reset the selectedMember state or perform any other actions.
        } else {
          throw new Error(`Failed to remove member: ${response.statusText}`);
        }
  
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  const handleBackButton = () => {
    navigate(`/officer/manage`);
  };

  return (
    <div>
      <button className='back-button' onClick={handleBackButton}>
        <img src="/back-arrow.svg" alt="Back" />
      </button>
      <HomeButton />
      <div className='form-container'>
        <h1>Remove A Member</h1>
        <div className='fine-print'> Select the member you would like to remove and press "Done"</div>

        <SearchBar type="members" onSelect={handleMemberClick} />

        {selectedMember && (
          <div className='center-stuff'>
            <div className='blank-space'></div>
            <h4>Member to remove:</h4>
            <div>{selectedMember.name}</div>
            <div className='blank-space'></div>
            <button type='' className='delete-button' onClick={handleSubmit}>Remove Member</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RemoveMembers;
