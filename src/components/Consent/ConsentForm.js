import React, { useState } from 'react';
import { db, auth } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const ConsentForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleConsent = async () => {
    if (agreed) {
      try {
        const userId = auth.currentUser?.uid;
        
        if (!userId) {
          setError('User not authenticated');
          navigate('/login');
          return;
        }

        await setDoc(doc(db, 'userConsent', userId), {
          consented: true,
          timestamp: new Date()
        });
        
        navigate('/payment');
      } catch (error) {
        console.error('Error saving consent:', error.message);
        setError('Failed to save consent. Please try again.');
      }
    }
  };

  // Fixed the checkbox onChange handler
  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
  };

  return (
    <div className="consent-container">
      <h2>Consent Form</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div className="consent-content">
        <h3>Legal Information Consent</h3>
        <p>
          By accepting this consent form, I hereby acknowledge and agree that:
        </p>
        <ul>
          <li>I willingly provide my legal case information to ECaseFile</li>
          <li>The information provided will be used for case management purposes</li>
          <li>My data will be stored securely and handled with confidentiality</li>
          <li>I can request access to or deletion of my information at any time</li>
        </ul>
      </div>

      <div className="consent-checkbox">
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={handleCheckboxChange} // Fixed this line
          />
          I have read and agree to the terms above
        </label>
      </div>

      <button 
        onClick={handleConsent}
        disabled={!agreed}
        className={agreed ? 'button-primary' : 'button-disabled'}
      >
        Continue
      </button>
    </div>
  );
};

export default ConsentForm;