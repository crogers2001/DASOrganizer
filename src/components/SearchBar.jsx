import React, { useEffect, useState } from 'react';

function SearchBar({ type, excludeArray, onSelect }) {
    const [options, setOptions] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [searchableOptions, setSearchableOptions] = useState([]);
    const [inputValue, setInputValue] = useState(''); // State to track input value

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.server.dastamu.com/api/${type}`);
                const actualResponse = await response.json();
                const data = actualResponse.data;
                const rawOptions = data;

                const sortedOptions = rawOptions.sort((a, b) => a.name.localeCompare(b.name));

                if (excludeArray) {
                    const filteredOptions = sortedOptions.filter(option => !excludeArray.some(excluded => excluded._id === option._id));
                    setOptions(filteredOptions);
                    setSearchableOptions(filteredOptions);
                } else {
                    setOptions(sortedOptions);
                    setSearchableOptions(sortedOptions);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [type]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setInputValue(inputValue); // Update input value state
        const filtered = options.filter(option => option.name.toLowerCase().includes(inputValue));
        setSearchableOptions(filtered);
    };

    const handleOptionSelect = (selectedOption) => {
        setSelectedData(selectedOption);
        setInputValue(''); // Clear input value when an option is selected
        onSelect(selectedOption);
    };

    return (
        <div>
            <input
                className="search-input"
                type="text"
                placeholder="Search..."
                value={inputValue} // Bind input value to state
                onChange={handleInputChange}
            />
            <ul className="search-list">
            {searchableOptions.map((option, index) => (
                <li
                    key={option._id}
                    onClick={() => handleOptionSelect(option)}
                    className={index % 2 === 0 ? 'even' : 'odd'} // Apply different class based on index
                >
                    {option.name}
                </li>
            ))}
        </ul>
        </div>
    );
}

export default SearchBar;
