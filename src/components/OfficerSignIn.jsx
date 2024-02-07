import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton.jsx';
import Semester from './Semester.jsx';

function OfficerPage() {
    const navigate = useNavigate();
    const [inputFlag, setInputFlag] = useState("");

    const handleBackButton = () => {
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Assuming passcode is case-sensitive
        const enteredPasscode = e.target.passcode.value;

        if (enteredPasscode === "dasifer") {
            // Correct passcode, navigate to '/officer/manage'
            navigate('/officer/manage');
        } else {
            // Incorrect passcode, set inputFlag
            setInputFlag("The passcode is incorrect. Please try again.");
        }
    }

    return (
        <div>
            <button className='back-button' onClick={handleBackButton}>
                <img src="/back-arrow.svg" alt="Back" />
            </button>
            <HomeButton />
            <div><Semester /></div>

            <div className='centered-form-container'>
                <h1>Officer</h1>
                <form onSubmit={handleSubmit}>

                    <label>
                        Enter your officer passcode:
                        <br />
                        <input className='long-input' name='passcode' type='password' />
                    </label>
                    <div className='blank-space'></div>
                    <button className='submit-button' type="submit">Submit</button>
                </form>

                {inputFlag && <div>{inputFlag}</div>}
            </div>
        </div>
    )
}

export default OfficerPage;
