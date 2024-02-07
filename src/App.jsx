import React from 'react';
import './App.css'
import EnrollForm from './components/EnrollForm';
import PerformanceForm from './components/PerformanceForm';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Splash from './components/Splash';
import MemberPage from './components/MemberPage';
import ChoreographerPage from './components/ChoreographerPage';
import OfficerSignIn from './components/OfficerSignIn';
import FindDance from './components/FindDance';
import ManageDance from './components/ManageDance';
import AddDancers from './components/AddDancers';
import ContactDancer from './components/ContactDancer';
import UploadDocuments from './components/UploadDocuments';
import RemoveDancers from './components/RemoveDancers';
import OfficerManage from './components/OfficerManage';
import ViewDances from './components/ViewDances';
import RemoveDances from './components/RemoveDances';
import ViewMembers from './components/ViewMembers';
import RemoveMembers from './components/RemoveMembers';

function App() {

  return (
    <div>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/member" element={<MemberPage/>} />
            <Route path="/choreographer" element={<ChoreographerPage/>} />
            <Route path="/officer/signin" element={<OfficerSignIn/>} />
            <Route path="/officer/manage" element={<OfficerManage/>} />
            <Route path="/officer/manage/viewdances" element={<ViewDances/>} />
            <Route path="/officer/manage/removedances" element={<RemoveDances/>} />
            <Route path="/officer/manage/viewmembers" element={<ViewMembers/>} />
            <Route path="/officer/manage/removemembers" element={<RemoveMembers/>} />
            <Route path="/member/enroll" element={<EnrollForm/>} />
            <Route path="/choreographer/new" element={<PerformanceForm/>} />
            <Route path="/choreographer/find" element={<FindDance/>} />
            <Route path="/choreographer/manage/:objectID" element={<ManageDance/>} />
            <Route path="/choreographer/manage/adddancers/:objectID" element={<AddDancers/>} />
            <Route path="/choreographer/manage/removedancer/:objectID" element={<RemoveDancers/>} />
            <Route path="/choreographer/manage/contactdancer/:objectID" element={<ContactDancer/>} />
            <Route path="/member/contactdancer" element={<ContactDancer/>} />
            <Route path="/choreographer/manage/upload/:objectID" element={<UploadDocuments/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
