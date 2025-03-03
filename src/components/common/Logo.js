import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ position = 'left' }) => {
  return (
    <div className={`logo-container ${position}`}>
      <Link to="/">
        <img 
          src={process.env.PUBLIC_URL + '/logo.png'} 
          alt="ECase Logo" 
          className="logo"
        />
      </Link>
    </div>
  );
};

export default Logo;