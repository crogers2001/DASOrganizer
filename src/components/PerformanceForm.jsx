import React, { useState, useEffect} from 'react';

function PerformanceForm() {
  const [performance, setPerformance] = useState({
    name: '',
    length: '',
    choreographer: null,
    dancers: '',
  });

  const [performanceArray, setPerformanceArray] = useState([]);
  const [dancerArray, setDancerArray] = useState([]);
  const [selectedChoreographer, setSelectedChoreographer] = useState(null);
  const [selectedDancers, setSelectedDancers] = useState([]);


  useEffect(() => {
    // Fetch existing performanceArray from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/performances');
        const result = await response.json();

        if (result.success) {
          setPerformanceArray(result.data); // Assuming the data is a valid array
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
        const response = await fetch('http://localhost:3001/api/dancers');
        const result = await response.json();

        if (result.success) {
          const sortedDancerArray = result.data.sort((a, b) => a.name.localeCompare(b.name));
          setDancerArray(result.data); // Assuming the data is a valid array of dancers
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
    }));
  };


  const handleSubmit = async (e) => {
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
        setPerformance({ name: '', length: '', choreographer: null, dancers: '' });
        setSelectedChoreographer(null);
        setSelectedDancers([]);
      } else {
        // Handle error
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    setPerformanceArray([...performanceArray, performance]);
    setPerformance({ name: '', length: '', choreographer: null, dancers: '' });
    setSelectedChoreographer(null);

  };

  const handleDancerChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedDancers(selectedOptions);
    console.log(selectedDancers);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add Performances</h3>
        <label>
          Song Name:
          <input
            type="text"
            name="name"
            value={performance.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Song Length:
          <input
            type="text"
            name="length"
            value={performance.length}
            onChange={handleChange}
          />
        </label>
        <label>
        Choreographer:
        <select
            name="choreographer"
            value={selectedChoreographer ? selectedChoreographer.name : ''}
            onChange={handleChoreographerChange}
        >
            <option value="">Select Dancer</option>
            {dancerArray.map((dancer, index) => (
            <option key={index} value={dancer.name}>
                {dancer.name}
            </option>
            ))}
        </select>
        </label>
        <label>
        Dancers:
          <select
            name="dancers"
            multiple
            value={selectedDancers}
            onChange={handleDancerChange}
          >
            {dancerArray.map((dancer, index) => (
              <option key={index} value={dancer.name}>
                {dancer.name}
              </option>
            ))}
          </select>
        </label>
    {/* FIXME Add a way to select choreographer and dancers from a list of all the dancers, searchable by their name*/}
        <button type="submit">Add Performance</button>
      </form>

      {/* Display the current list of performances */}
      <div>
        <h5>Performances:</h5>
        <ul>
        {performanceArray.map((performance, index) => (
        <li key={index}>
            <strong>Name:</strong> {performance.name},{' '}
            <strong>Length:</strong> {performance.length},{' '}
            <strong>Choreographer:</strong> {performance.choreographer ? performance.choreographer.name : 'None'},{' '}
            <strong>Dancers:</strong> {' '}
              {performance.dancers.length > 0 ? (
                performance.dancers.map((dancer, dancerIndex) => (
                  <span key={dancerIndex}>{dancer}, </span>
                ))
              ) : (
                'None'
              )}
        </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default PerformanceForm;
