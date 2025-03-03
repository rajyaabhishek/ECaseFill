import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Ecase</h1>
        <div className="about-divider"></div>
      </div>

      <div className="about-content">
        <div className="about-intro">
          <p>Ecase is your trusted digital legal platform, revolutionizing the way legal services are accessed and delivered. Founded with the vision of making legal services more accessible, efficient, and transparent, we bridge the gap between traditional legal practices and modern technology.</p>
        </div>
        
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>To democratize access to legal services through innovative digital solutions, ensuring everyone has access to quality legal assistance regardless of their location or circumstances.</p>
        </div>
        
        <div className="about-section">
          <h2>What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📝</div>
              <h3>Digital Case Filing</h3>
              <p>Submit and manage your legal cases online with ease and security.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📄</div>
              <h3>Legal Document Management</h3>
              <p>Store, organize, and access your legal documents anytime, anywhere.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔒</div>
              <h3>Secure Communication</h3>
              <p>Communicate with legal professionals through encrypted channels.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔔</div>
              <h3>Real-time Updates</h3>
              <p>Receive instant notifications about your case progress and updates.</p>
            </div>
           
          </div>
        </div>
        
        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-container">
            <div className="value-item">
              <h3>Accessibility</h3>
              <p>Making legal services available to everyone, regardless of location or circumstances.</p>
            </div>
            <div className="value-item">
              <h3>Transparency</h3>
              <p>Clear communication and honest pricing with no hidden fees.</p>
            </div>
            <div className="value-item">
              <h3>Efficiency</h3>
              <p>Streamlined processes that save time and reduce complexity.</p>
            </div>
            <div className="value-item">
              <h3>Security</h3>
              <p>Protecting your sensitive information with advanced security measures.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;