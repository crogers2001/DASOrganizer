import React, { useState } from 'react';
import './App.css'
import DanceForm from './components/DanceForm';
import PerformanceForm from './components/PerformanceForm';

function App() {

  return (
    <div>
      <h1>Dancer Form</h1>
      <DanceForm />

      <h1>Performance Form</h1>
      <PerformanceForm />
    </div>
  );
}

export default App;

