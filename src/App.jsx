import React from 'react';
import './App.css'
import EnrollForm from './components/EnrollForm';
import PerformanceForm from './components/PerformanceForm';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Splash from './components/Splash';
import MemberPage from './components/MemberPage';
import ChoreographerPage from './components/ChoreographerPage';
import OfficerPage from './components/OfficerPage';
import FindDance from './components/FindDance';
import ManageDance from './components/ManageDance';
import AddDancers from './components/AddDancers';
import ContactDancer from './components/ContactDancer';
import UploadDocuments from './components/UploadDocuments';
import RemoveDancers from './components/RemoveDancers';

function App() {

  return (
    <div>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/member" element={<MemberPage/>} />
            <Route path="/choreographer" element={<ChoreographerPage/>} />
            <Route path="/officer" element={<OfficerPage/>} />
            <Route path="/member/enroll" element={<EnrollForm/>} />
            <Route path="/choreographer/new" element={<PerformanceForm/>} />
            <Route path="/choreographer/find" element={<FindDance/>} />
            <Route path="/choreographer/manage/:objectID" element={<ManageDance/>} />
            <Route path="/choreographer/manage/adddancers/:objectID" element={<AddDancers/>} />
            <Route path="/choreographer/manage/removedancers/:objectID" element={<RemoveDancers/>} />
            <Route path="/choreographer/manage/contactdancer/:objectID" element={<ContactDancer/>} />
            <Route path="/choreographer/manage/upload/:objectID" element={<UploadDocuments/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

