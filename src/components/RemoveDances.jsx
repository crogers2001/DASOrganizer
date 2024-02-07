import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton.jsx';
import SearchBar from './SearchBar.jsx';

function RemoveDances() {
  const navigate = useNavigate();
  const [selectedDance, setSelectedDance] = useState(null);

  const handleDanceClick = (dance) => {
    setSelectedDance(dance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (selectedDance) {
      try {
        const response = await fetch(`https://www.server.dastamu.com/api/performances/${selectedDance._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          console.log('Dance removed successfully');
          navigate('/officer/manage')
          // Optionally, you can reset the selectedDance state or perform any other actions.
        } else {
          throw new Error(`Failed to remove dance: ${response.statusText}`);
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
        <h1>Remove A Dance</h1>
        <div className='fine-print'> Select the dancer you would like to remove and press "Done"</div>

        <SearchBar type="performances" onSelect={handleDanceClick} />

        {selectedDance && (
          <div className='center-stuff'>
            <div className='blank-space'></div>
            <h4>Dance to remove:</h4>
            <div>{selectedDance.name}</div>
            <div className='blank-space'></div>
            <button type='' className='delete-button' onClick={handleSubmit}>Remove Dance</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RemoveDances;
