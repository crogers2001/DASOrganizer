import React, { useState, useEffect} from 'react';
import HomeButton from './HomeButton.jsx';
import Semester from './Semester.jsx';
import { useNavigate } from 'react-router-dom';
import NewDanceConfirm from './NewDanceConfirm.jsx';

function PerformanceForm() {
  const currSemester = Semester();
  const [performance, setPerformance] = useState({
    name: '',
    min: '',
    sec: '',
    choreographer: null,
    dancers: null,
    artist: '',
    passcode: '',
    semester: currSemester
  });

  const [performanceArray, setPerformanceArray] = useState([]);
  const [dancerArray, setDancerArray] = useState([]);
  const [selectedChoreographer, setSelectedChoreographer] = useState(null);
  const [selectedDancers, setSelectedDancers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);


  const updateMemberData = (data) => {
    setPerformanceArray(data); // Assuming the data is an array of dancers
    console.log(data); // Log the data directly
  };

  useEffect(() => {
    // Fetch existing performanceArray from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/performances');
        const result = await response.json();

        if (result.success) {
          updateMemberData(result.data); // Assuming the data is a valid array
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


useEffect(() => {
    // Fetch existing dancersArray from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/members');
        const result = await response.json();

        if (result.success) {
          const sortedDancerArray = result.data.sort((a, b) => a.name.localeCompare(b.name));
          setDancerArray(sortedDancerArray); // Assuming the data is a valid array of members
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
    const { name, value } = e.target;

    setPerformance((prevPerformance) => ({
      ...prevPerformance,
      [name]: value,
    }));
  };

  const handleChoreographerChange = (e) => {
    const selectedDancerName = e.target.value;
    const selectedDancer = dancerArray.find(
      (dancer) => dancer.name === selectedDancerName
    );

    setSelectedChoreographer(selectedDancer); // Set the entire dancer object
    setPerformance((prevPerformance) => ({
      ...prevPerformance,
      choreographer: selectedDancer, // Store the entire dancer object
      dancers: [selectedDancer],
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    
    sendToServer(e);
    setShowConfirmation(true);

  };

  const sendToServer = async (e) => {

    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/api/performances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performance),
      });
  
      const result = await response.json();
  
      if (result.success) {
        // Handle success (e.g., clear form)
        setPerformance({ name: '', artist: '', min: '', sec: '', choreographer: null, dancers: null, passcode: '' });
        setSelectedChoreographer(null);
      } else {
        // Handle error
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    setPerformanceArray([...performanceArray, performance]);
    setPerformance({ name: '', artist: '', min: '', sec: '', choreographer: null, dancers: null, passcode: '' });
    setSelectedChoreographer(null);

  };

  // const calculateTotalSeconds = (min, sec) => {
  //   const minutes = parseInt(min, 10) || 0; // Parse as integer, default to 0 if not a valid number
  //   const seconds = parseInt(sec, 10) || 0;
  //   return minutes * 60 + seconds;
  // };

  return (
    <div>
      {showConfirmation ? (
        <NewDanceConfirm />
      ) : (
      <div>
      <HomeButton />

      <div className='form-container'>

      <h1>Create a new dance for <Semester /></h1>

      <form onSubmit={handleSubmit}>

          <label>
          Choreographer
            <br />
            <select
                className='long-input'
                name="choreographer"
                value={selectedChoreographer ? selectedChoreographer.name : ''}
                onChange={handleChoreographerChange}
            >
                <option value="">Select Dancer...</option>
                {dancerArray.map((dancer, index) => (
                <option key={index} value={dancer.name}>
                    {dancer.name}
                </option>
                ))}
            </select>
            <br />
          </label>
          <label>
            Song title
            <br />
            <input
              className='long-input'
              type="text"
              name="name"
              value={performance.name}
              onChange={handleChange}
            />
            <br />
          </label>
          <label>
            Song artist
            <br />
            <input
              className='long-input'
              type="text"
              name="artist"
              value={performance.artist}
              onChange={handleChange}
            />
            <br />
          </label>
          {/* <label>
            Song length:
            <br />
            <input
              className='short-input'
              type="text"
              name="min"
              value={performance.min}
              onChange={handleChange}
            />
            <span className='horizontal-whitespace'>min </span>
            <input
              className='short-input'
              type="text"
              name="sec"
              value={performance.sec}
              onChange={handleChange}
            />
            sec
            <br />
          </label> */}
          <div className='blank-space'></div>
          <label>
            Make a passcode:
            <br />
            <input
              className='long-input'
              type="text"
              name="passcode"
              value={performance.passcode}
              onChange={handleChange}
            />
            <br />
          </label>
          <div className='center-stuff'>
            <div className='fine-print'>This is so only you can view and manage your dance. DO NOT enter a password that is important to you as it will not be encrypted. Be sure to remember or write down this passcode. </div>

            <button className='submit-button' type="submit"> Create Dance </button>
          </div>
        </form>
      </div>
    </div>
    )}
  </div>
    
  );
}

export default PerformanceForm;

// /* Display the current list of performances */
// <div>
// <h5>Performances:</h5>
// <ul>
// {performanceArray.map((performance, index) => (
// <li key={index}>
//     <strong>Choreographer:</strong> {performance.choreographer ? performance.choreographer.name : 'None'},{' '}
//     <strong>Song Name:</strong> {performance.name},{' '}
//     <strong>Artist:</strong> {performance.artist},{' '}
//     <strong>Length:</strong> {calculateTotalSeconds(performance.min, performance.sec)} seconds,{' '}
//     <strong>Dancers:</strong>
//       { performance.dancers ? (performance.dancers.length > 0 ? (
//         performance.dancers.map((dancer, dancerIndex) => (
//           <span key={dancerIndex}>{dancer}, </span>
//         ))
//       ) : (
//         ' None'
//       )) : 'None'}
// </li>
// ))}
// </ul>
// </div>