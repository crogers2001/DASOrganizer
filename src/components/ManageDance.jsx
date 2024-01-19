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
        const response = await fetch(`http://localhost:3001/api/performances/${objectID}`);
        
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

  return (
    <div>
      <HomeButton />
      {dance && (
      <div>

            <div className='manage-header'>
              <h1>{dance.name}</h1>
              <div>{dance.choreographer.name}</div>
            </div>

            <div>
              <div className='small-button-row'>
                <button className='small-button'>
                  Add Dancers
                </button>
                <button className='small-button'>
                  Remove Dancers
                </button>
              </div>
              <div className='small-button-row'>
                <button className='small-button'>
                  Contact a Dancer
                </button>
                <button className='small-button'>
                  Upload Documents
                </button>
              </div>
            </div>
            <div className='blank-space'></div>
            <div className='manage-content-container'>
                <div className='dancer-box-container'>
                  <h5>Current Dancers:</h5>
                  <div className='dancer-box'>
                    {/* Display a list of the dancers in dance.dancers */}
                    {dance.dancers && dance.dancers.map((dancer, index) => (
                      <div key={index}>{dancer.name}</div>
                      // You can display other dancer information as needed
                    ))}
                  </div>
                </div>

                <div className='docs-list'>
                  <div></div>
                  <h5>Missing:</h5>
                  <div>Missing items list</div>
              </div>
            </div>


      </div>
      )}
    </div>
  );
};

export default ManageDance;