import React, { useState, useEffect } from 'react';
import HomeButton from './HomeButton';
import Semester from './Semester.jsx';
import EnrollConfirm from './EnrollConfirm'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

function EnrollForm() {

  const navigate = useNavigate();
  const currSemester = Semester();
  const [dancer, setDancer] = useState({
    name: '',
    class: '',
    email: '',
    phone: '',
    semester: currSemester,
    active: true
  });

  const [memberData, setMemberData] = useState([]);
  
  const [inputFlag, setInputFlag] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const updateMemberData = (data) => {
    setMemberData(data); // Assuming the data is an array of dancers
  };

  useEffect(() => {
    // Fetch existing dancersArray from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.server.dastamu.com/api/members');
        const result = await response.json();

        if (result.success) {
          updateMemberData(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

      setDancer((prevDancer) => ({
        ...prevDancer,
        [name]: type === 'checkbox' ? checked : value,
      }));
      
  };


  const checkValidity = () => {
    // If any fields are empty, return nothing
  
    // Name must have two words separated by a space (checking for first and last name)
    const nameWords = dancer.name.trim().split(/\s+/);
    if (dancer.name === '' || nameWords.length < 2) {

      return "Please enter your first and last name and submit again.";
    }
    
    if (dancer.class === '' ) {

      return "Please select a classification and submit again.";
    }

    // Trim leading and trailing whitespace for other fields
    const trimmedEmail = dancer.email.trim();
    const trimmedPhone = dancer.phone.replace(/[^\d]/g, ''); // Trim everything but digits from phone number
  
    // Email must be in standard email address format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (dancer.email === '' || !emailRegex.test(trimmedEmail)) {

      return "Please enter a valid email and submit again.";
    }
  
    // Phone number must be 10 digits long
    if (trimmedPhone.length !== 10 || !/^\d+$/.test(trimmedPhone)) {

      return "Please enter a valid 10-digit phone number and submit again.";
    }
  
    // Check if there is already someone with the same email or phone number
    const duplicateEmail = memberData.find((member) => member.email === trimmedEmail);
    const duplicatePhone = memberData.find((member) => member.phone === trimmedPhone);

    if (duplicateEmail) {
      return "Your email is already in the system! You only need to enroll once. If you have never previously enrolled, contact the president and they will enroll you.";
    }

    if (duplicatePhone) {
      return "Your phone is already in the system! You only need to enroll once. If you have never previously enrolled, contact the president and they will enroll you.";
    }

    // All checks passed, the form is valid
    return "";
  };


  const handleSubmit = async (e) => {

    e.preventDefault();
  
    const validMessage = checkValidity();
  
    if (validMessage === "") {

        try {
          await sendToServer();
          // Display Thank You message, navigate away
          setShowConfirmation(true);
        } catch (error) {
          console.log(error);
        }

    } 
    else if (validMessage === "duplicatePhone" || validMessage === "duplicateEmail"){
        setShowConfirmation(true);
    }
    else {
      setInputFlag(validMessage);
    }
  };
  

  const sendToServer = async () => {

    try {
      const trimmedName = dancer.name.trim();
      const trimmedEmail = dancer.email.trim();
      const cleanedPhone = dancer.phone.replace(/[^\d]/g, '');

      const cleanedDancer = {    
      name: trimmedName,
      class: dancer.class,
      email: trimmedEmail,
      phone: cleanedPhone,
      semester: currSemester,
      active: true
      };

      const response = await fetch('https://www.server.dastamu.com/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedDancer),
      });

      const result = await response.json();

      if (!result.success) {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setDancer({ name: '', email: '', phone: ''});
  };

  const handleBackButton = () => {
    navigate('/member');
  }

  return (
    <div>
      {showConfirmation ? (
        <EnrollConfirm />
      ) : (
        <div>
          <button className='back-button' onClick={handleBackButton}>
            <img src= "/back-arrow.svg" alt="Back" />
          </button>
          <HomeButton />
          
          <div className='form-container'>

            <h1>Enroll as a Member</h1>

            { inputFlag !== "" ? (
                <div className='bad-input'>{inputFlag}</div>
            ) : null
            }

            <form onSubmit={handleSubmit}>
              <label>
                Full name
                <br />
                <input
                  className='long-input'
                  type="text"
                  name="name"
                  value={dancer.name}
                  onChange={handleChange}
                />
                <br />
              </label>
                <label>
                Classification
                <br />
                <select
                  className='long-input'
                  name="class"
                  value={dancer.class}
                  onChange={handleChange}
                >
                  <option value="">Select your class...</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
                <br />
              </label>
              <label>
                Email
                <br />
                <input
                  className='long-input'
                  type="email"
                  name="email"
                  value={dancer.email}
                  onChange={handleChange}
                />
                <br />
              </label>
              <label>
                Phone number
                <br />
                <input
                  className='long-input'
                  type="tel"
                  name="phone"
                  value={dancer.phone}
                  onChange={handleChange}
                />
                <br />
              </label>
              <div className='center-stuff'>

                <div className='blank-space'></div>
                <div className='fine-print'>Make sure you entered everything correctly. If you need to change your information after submitting, contact the president.</div>
                
                <button className='submit-button' type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnrollForm;
