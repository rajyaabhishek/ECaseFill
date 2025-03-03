import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <div className="contact-divider"></div>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
      
          <p>Have questions? We're here to help! Reach out through any of these channels:</p>
          
          <div className="contact-info-items">
            <div className="contact-info-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-detail">
                <h3>Email Us</h3>
                <p>
                  <a href="mailto:contactelawyer@gmail.com">contactelawyer@gmail.com</a>
                </p>
                <p>We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-detail">
                <h3>Call Us</h3>
                <p>
                  <a href="tel:+918826275476">+91 8826275476</a>
                </p>
                <p>Monday to Friday, 9:00 AM - 6:00 PM IST</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-detail">
                <h3>Visit Us</h3>
                <p>B-7/10 Sector-17, Rohini</p>
                <p>New Delhi-110089</p>
              </div>
            </div>
          </div>

          <div className="contact-note">
            <strong>Note:</strong> For refund-related queries, please contact us directly via phone or email with your transaction details.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;