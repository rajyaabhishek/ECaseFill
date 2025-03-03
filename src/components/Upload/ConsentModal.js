import React from 'react';
import { FaShieldAlt, FaTimes } from 'react-icons/fa';
import './ConsentModal.css';

const ConsentModal = ({ isOpen, onClose, onAgree }) => {
  if (!isOpen) return null;

  return (
    <div className="consent-modal-overlay">
      <div className="consent-modal">
        <button className="modal-close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="consent-modal-header">
          <FaShieldAlt className="shield-icon" />
          <h2>Privacy & Consent</h2>
        </div>

        <div className="consent-modal-content">
          <div className="consent-section">
            <h3>Legal Information Consent</h3>
            <p>Before proceeding with your case upload, please acknowledge the following:</p>
            
            <div className="consent-points">
              <div className="consent-point">
                <span className="point-marker">1</span>
                <p>I willingly provide my legal case information to ECase</p>
              </div>
              
              <div className="consent-point">
                <span className="point-marker">2</span>
                <p>The information provided will be used for case management purposes</p>
              </div>
              
              <div className="consent-point">
                <span className="point-marker">3</span>
                <p>My data will be stored securely and handled with confidentiality</p>
              </div>
              
              <div className="consent-point">
                <span className="point-marker">4</span>
                <p>I can request access to or deletion of my information at any time</p>
              </div>
            </div>
          </div>

          <div className="contact-info">
            <p>For assistance, contact us at:</p>
            <p><strong>Phone:</strong> +91 8826275476</p>
            <p><strong>Email:</strong> contactelawyer@gmail.com</p>
          </div>
        </div>

        <div className="consent-modal-footer">
          <button className="agree-button" onClick={onAgree}>I Agree</button>
        </div>
      </div>
    </div>
  );
};

export default ConsentModal;