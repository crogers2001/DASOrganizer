import React, { useState, useEffect } from 'react';

function DanceForm() {
  const [dancer, setDancer] = useState({
    name: '',
    email: '',
    phone: '',
    dues: false,
  });

  const [danceArray, setDanceArray] = useState([]);


  useEffect(() => {
    // Fetch existing dancersArray from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/dancers');
        const result = await response.json();

        if (result.success) {
          setDanceArray(result.data); // Assuming the data is an array of dancers
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




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/dancers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dancer),
      });

      const result = await response.json();

      if (result.success) {
        // Handle success (e.g., clear form)
        setDancer({ name: '', email: '', phone: '', dues: false });
      } else {
        // Handle error
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }


    setDanceArray([...danceArray, dancer]);
    setDancer({ name: '', email: '', phone: '', dues: false });
  };




//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setDanceArray([...danceArray, dancer]);
//     setDancer({ name: '', email: '', phone: '', dues: false });
//   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add Dancers</h3>
        <label>
          Dancer's Name:
          <input
            type="text"
            name="name"
            value={dancer.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={dancer.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={dancer.phone}
            onChange={handleChange}
          />
        </label>
        {/* <label>
          Dues Paid?:
          <input
            type="checkbox"
            name="dues"
            checked={dancer.dues}
            onChange={handleChange}
          />
        </label> */}
        <button type="submit">Add Dancer</button>
      </form>

      {/* Display the current list of dancers */}
      <div>
        <h5>Dancers:</h5>
        <ul>
          {danceArray.map((dancer, index) => (
            <li key={index}>
              <strong>Name:</strong> {dancer.name},{' '}
              <strong>Email:</strong> {dancer.email},{' '}
              <strong>Phone:</strong> {dancer.phone},{' '}
              {/* <strong>Dues Paid:</strong> {dancer.dues ? 'Yes' : 'No'} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DanceForm;
