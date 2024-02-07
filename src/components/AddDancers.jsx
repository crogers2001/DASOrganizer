import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import HomeButton from './HomeButton.jsx';

function AddDancers() {
    const { objectID } = useParams(); //the objectID of the user's dance
    const [selectedMemberArray, setSelectedMemberArray] = useState([]);
    const [dance, setDance] = useState(null);
    const navigate = useNavigate();

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
            updateDance(responseData.data);
            console.log(responseData.data.dancers);
          } catch (error) {
            console.error("An error occurred:", error);
          }
        };
        
        // Call the fetchPerformanceData function
        fetchPerformanceData();
    }, [objectID]); // Run the effect whenever objectID changes


    const updateDance = (data) => {
        setDance(data);
        console.log("Dance has been updated")
    }

    const isMemberSelected = (member) => {
        return selectedMemberArray.some(selectedMember => selectedMember._id === member._id);
    };

    const handleSelect = (data) => {
        // Check if the selected data is not already in the array
        if (!isMemberSelected(data)) {
            // Add the selected data to the array
            setSelectedMemberArray(prevArray => [...prevArray, data]);
        }
    };

    const handleUndo = () => {
        // Remove the last index in the array
        setSelectedMemberArray(prevArray => prevArray.slice(0, -1));
    };

    const getDancers = () => {
        return dance.dancers;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Create a PUT request to update the performance
            const response = await fetch(`https://www.server.dastamu.com/api/performances/${objectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dancers: [...dance.dancers, ...selectedMemberArray],
                    // Include other fields if needed
                }),
            });
    
            if (!response.ok) {
                console.error('Failed to update performance');
                return;
            }
    
            console.log('Performance updated successfully');
            navigate(`/choreographer/manage/${objectID}`);

            // Clear the selectedMemberArray after adding dancers
            setSelectedMemberArray([]);
            
            // You may want to fetch the updated performance data again if needed
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const handleBackButton = () => {
        navigate(`/choreographer/manage/${objectID}`);
    }

    return (
        <div>
            <button className='back-button' onClick={handleBackButton}>
                <img src= "/back-arrow.svg" alt="Back" />
            </button>
            <HomeButton />
            <div className='centered-form-container'>
                <h1>Add Dancers</h1>
                <div className='fine-print'> Select all of the dancers you would like to add and press "Done"</div>
                {/* Conditionally render SearchBar only if dance has been fetched */}
                {dance && (
                    <>
                        <SearchBar type="members" excludeArray={getDancers()} onSelect={handleSelect} />
                        
                        {/* Conditionally render "Dancers to add" section only if selectedMemberArray is not empty */}
                        {selectedMemberArray.length > 0 && (
                            <div>
                                <h4>Dancers to add:</h4>
                                <div>
                                    {selectedMemberArray.map((selectedMember, index) => (
                                        <div key={index}>{selectedMember.name}</div>
                                    ))}
                                </div>
                                
                                <button className='undo-button' onClick={handleUndo}>
                                    Undo
                                    <img src='/undo.svg' alt='Undo' />
                                </button>
                                <div className='blank-space'></div>
                                <button type='' className='submit-button' onClick={handleSubmit}>
                                    Done
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default AddDancers;
