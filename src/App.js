import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../src/components/Auth/Login';
import FileUpload from '../src/components/Upload/FileUpload';
import About from './components/About/About';
import SignUp from './components/Auth/SignUp';
import Contact from './components/Contact/Contact';
import Privacy from './components/Privacy/Privacy';
import Navbar from './components/common/Navbar';
import { auth } from './firebase/config';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user && <Navbar />}
        <div className="content-container">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/upload" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/upload" element={user ? <FileUpload /> : <Navigate to="/login" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
      
      </div>
    </Router>
  );
}

export default App;