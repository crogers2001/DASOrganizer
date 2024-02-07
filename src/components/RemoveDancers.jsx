import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HomeButton from './HomeButton.jsx';

function RemoveDancers() {
    const { objectID } = useParams(); //the objectID of the user's dance
    const navigate = useNavigate();
    const [dance, setDance] = useState(null);
    const [selectedDancers, setSelectedDancers] = useState([]);
    
    useEffect(() => {
        // Function to fetch performance data
        const fetchPerformanceData = async () => {
            try {
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

    const isMemberSelected = (member) => {
        return selectedDancers.some(selectedDancer => selectedDancer._id === member._id);
    };

    const handleDancerClick = (dancer) => {
        // Toggle the selection of the dancer
        if (!isMemberSelected(dancer)) {
            // Add the selected data to the array
            setSelectedDancers(prevArray => [...prevArray, dancer]);
        }
    };

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
                    dancers: dance.dancers.filter(dancer => !selectedDancers.includes(dancer)),
                    // Include other fields if needed
                }),
            });

            if (!response.ok) {
                console.error('Failed to update performance');
                return;
            }

            console.log('Performance updated successfully');
            navigate(`/choreographer/manage/${objectID}`);

            // Clear the selectedDancers after removing dancers
            setSelectedDancers([]);
            
            // You may want to fetch the updated performance data again if needed
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackButton = () => {
        navigate(`/choreographer/manage/${objectID}`);
    }

    const handleUndo = () => {
        // Remove the last index in the array
        setSelectedDancers(prevArray => prevArray.slice(0, -1));
    };

    return (
        <div>
            <button className='back-button' onClick={handleBackButton}>
                <img src= "/back-arrow.svg" alt="Back" />
            </button>
            <HomeButton />
            <div className='centered-form-container'>
                <h1>Remove Dancers</h1>
                <div className='fine-print'> Select all of the dancers you would like to remove and press "Done"</div>

                <ul className='search-list'>
                    {dance &&
                        dance.dancers.map((dancer, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleDancerClick(dancer)}
                                    className={index % 2 === 0 ? 'even' : 'odd'} // Apply different class based on index
                                >
                                    {dancer.name}
                                </li>
                        ))}
                </ul>

                {selectedDancers.length > 0 && (
                    <div>
                        <h4>Dancers to remove:</h4>
                        {selectedDancers.map((dancer, index) => (
                            <div key={index}>{dancer.name}</div>
                        ))}

                        <button className='undo-button' onClick={handleUndo}>
                            Undo
                            <img src='/undo.svg' alt='Undo' />
                        </button>
                        <div className='blank-space'></div>
                    </div>
                )}
                <div className='blank-space'></div>
                <button type='' className='submit-button' onClick={handleSubmit}>Done</button>
            </div>
        </div>
    );
}

export default RemoveDancers;
