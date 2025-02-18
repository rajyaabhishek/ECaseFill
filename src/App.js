import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from '../src/components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ConsentForm from '../src/components/Consent/ConsentForm';
import Payment from '../src/components/Payment/Payment';
import FileUpload from '../src/components/Upload/FileUpload';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/consent" element={<ConsentForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 