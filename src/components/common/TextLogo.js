import React from 'react';
import { Link } from 'react-router-dom';
import './TextLogo.css';

const TextLogo = ({ position = 'left' }) => {
  return (
    <div className={`text-logo-container ${position}`}>
      <Link to="/">
        <span className="text-logo">ECase: Click. Submit. Done.</span>
      </Link>
    </div>
  );
};

export default TextLogo;