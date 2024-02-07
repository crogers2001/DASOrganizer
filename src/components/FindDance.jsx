import React, { useState, useEffect} from 'react';
import HomeButton from './HomeButton.jsx';
import Semester from './Semester.jsx';
import { useNavigate } from 'react-router-dom';

function FindDance() {
    const navigate = useNavigate();
    const [inputFlag, setInputFlag] = useState("");
    const [credentials, setCredentials] = useState({
        email: '',
        passcode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const displayValidity = () => {
        setInputFlag("The given email or passcode is incorrect. Please try again or contact the president.")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Make a GET request to fetch performances with the given credentials
            const response = await fetch(`https://www.server.dastamu.com/api/performances?email=${credentials.email}&passcode=${credentials.passcode}`);
    
            if (!response.ok) {
                console.error("An error occurred while fetching performances");
                return;
            }
    
            const responseData = await response.json(); // Convert the response body to JSON
    
            // Check if any matching performances are found
            if (responseData.data.length === 0) {
                // Display an error message if no matching performances are found
                console.error("No performances found with the given credentials. Please check if everything is correct");
            } else {
                // Check if there is a performance with both the given email and passcode
                const matchingPerformance = responseData.data.find(performance => performance.choreographer.email === credentials.email && performance.passcode === credentials.passcode);
    
                if (matchingPerformance) {
                    // If a matching performance is found, navigate the user to the corresponding URL
                    const objectId = matchingPerformance._id; // Assuming the _id is present in the response
                    navigate(`/choreographer/manage/${objectId}`);
                } else {
                    displayValidity();
                }
            }
        } catch (error) {
            // Handle any potential errors during the fetch or JSON parsing
            console.error("An error occurred:", error);
        }
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
            <div><Semester /></div>

            <div className='form-container'>

                <h1>Manage Your Dance</h1>
                { inputFlag !== "" ? (
                <div className='bad-input'>{inputFlag}</div>
                ) : null
                }

                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <br />
                        <input
                            className='long-input'
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                        />
                        <br />
                    </label>
                    <label>
                        Passphrase
                        <br />
                        <input
                            className='long-input'
                            type="text"
                            name="passcode"
                            value={credentials.passcode}
                            onChange={handleChange}
                        />
                        <br />
                    </label>
                    <div className='fine-print'>If you forgot your passphrase, ask the president or vice president to give it to you.</div>
                    <div className='blank-space'></div>
                    <div className='center-stuff'>
                        <button className='submit-button' type="submit"> Find Dance </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FindDance;
