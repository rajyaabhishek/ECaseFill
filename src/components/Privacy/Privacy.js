import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <h1>Privacy Policy</h1>
        <div className="privacy-divider"></div>
      </div>

      <div className="privacy-content">
        <div className="privacy-section">
          <h2>Information We Collect</h2>
          <p>We collect and process the following types of information:</p>
          <ul>
            <li>Personal identification information (Name, email address, phone number)</li>
            <li>Case-related documents and information</li>
            <li>Payment information</li>
            <li>Usage data and analytics</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our legal services</li>
            <li>To process your case submissions</li>
            <li>To communicate with you about your cases</li>
            <li>To send important updates and notifications</li>
            <li>To improve our services and user experience</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Data Security</h2>
          <p>We implement robust security measures to protect your information:</p>
          <ul>
            <li>End-to-end encryption for all sensitive data</li>
            <li>Secure SSL/TLS encryption for data transmission</li>
            <li>Regular security audits and updates</li>
            <li>Restricted access to personal information</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request data correction or deletion</li>
            <li>Withdraw consent at any time</li>
            <li>Request data portability</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Contact Us</h2>
          <p>For any privacy-related concerns or questions, please contact us at:</p>
          <ul>
            <li>Email: contactelawyer@gmail.com</li>
            <li>Phone: +91 8826275476</li>
            <li>Address: B-7/10 Sector-17, Rohini, New Delhi-110089</li>
          </ul>
        </div>

        <div className="privacy-note">
          <p><strong>Last Updated:</strong> February 28, 2025</p>
          <p>We reserve the right to update this privacy policy at any time. Any changes will be posted on this page.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;