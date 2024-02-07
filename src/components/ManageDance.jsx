import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HomeButton from './HomeButton.jsx';

const ManageDance = () => {
  const { objectID } = useParams(); //the objectID of the user's dance
  const navigate = useNavigate();

  // State to store the fetched performance data
  const [dance, setDance] = useState(null);

  useEffect(() => {
    // Function to fetch performance data
    const fetchPerformanceData = async () => {
      try {
        // Convert objectID to a valid ObjectId
    
        // Make a GET request to fetch the performance with the given objectID
        const response = await fetch(`https://www.server.dastamu.com/api/performances/${objectID}`);
        
        if (!response.ok) {
          console.error("An error occurred while fetching performance data");
          return;
        }
    
        const responseData = await response.json(); // Convert the response body to JSON
    
        // Set the fetched performance data to the state
        setDance(responseData.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    // Call the fetchPerformanceData function
    fetchPerformanceData();
  }, [objectID]); // Run the effect whenever objectID changes

  const handleAddDancersClick = () => {
    navigate(`/choreographer/manage/adddancers/${objectID}`);
  };

  const handleRemoveDancerClick = () => {
    navigate(`/choreographer/manage/removedancer/${objectID}`);
  };
  
  const handleContactADancerClick = () => {
    navigate(`/choreographer/manage/contactdancer/${objectID}`);
  };

  const handleUploadDocumentsClick = () => {
    navigate(`/choreographer/manage/upload/${objectID}`);
  };

  const handleBackButton = () => {
    navigate('/choreographer');
  }

  return (
    <div>
      <button className='back-button' onClick={handleBackButton}>
        <img src= "/back-arrow.svg" alt="Back" />
      </button>
      <HomeButton />
      {dance && (
      <div>

            <div className='manage-header'>
              <h1>{dance.name}</h1>
              <div>{dance.choreographer.name}</div>
            </div>

            <div>
              <div className='small-button-row'>
                <button className='small-button' onClick={handleAddDancersClick}>
                  Add Dancers
                </button>
                <button className='small-button' onClick={handleRemoveDancerClick}>
                  Remove Dancers
                </button>
              </div>
              <div className='small-button-row' >
                <button className='small-button' onClick={handleContactADancerClick}>
                  Contact a Dancer
                </button>
                  {/* <button className='small-button' onClick={handleUploadDocumentsClick}>
                    Upload Documents
                  </button> */}
              </div>
            </div>
            <div className='blank-space'></div>
            <div className='manage-content-container'>
                <div className='dancer-box-container'>
                  <h5>Current Dancers:</h5>
                  <div className='dancer-box'>
                      {dance.dancers &&
                          dance.dancers
                              .slice() // Create a copy of the array to avoid mutating the original array
                              .sort((a, b) => a.name.localeCompare(b.name)) // Sort dancers by name
                              .map((dancer, index) => (
                                  <div key={index}>{dancer.name}</div>

                              ))}
                  </div>
                </div>

                {/* <div className='docs-list'>
                  <div></div>
                  <h5>Documents due by ___:</h5>
                  <div></div>
              </div> */}
            </div>


      </div>
      )}
    </div>
  );
};

export default ManageDance;