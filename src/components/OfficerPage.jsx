import React, { useState, useEffect } from 'react';
import HomeButton from './HomeButton.jsx';
import Semester from './Semester.jsx';

function OfficerPage() {
    return (
        <div>
            <HomeButton />
            <div><Semester /></div>
        </div>
    )
}

export default OfficerPage