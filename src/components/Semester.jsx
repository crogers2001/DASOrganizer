import React from 'react';

const Semester = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

    let season;
    if (currentMonth >= 1 && currentMonth <= 5) {
      season = 'Spring';
    } else if (currentMonth >= 6 && currentMonth <= 12) {
      season = 'Fall';
    }

    const year = currentDate.getFullYear();

    return season + ' ' + year;
};

export default Semester;