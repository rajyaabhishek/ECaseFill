import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaEnvelope, FaHome, FaInfoCircle, FaShieldAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  
  // Check if user is logged in and get user info
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.displayName || user.email.split('@')[0]);
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setShowDropdown(false);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { path: '/', icon: <FaHome />, text: 'Home' },
    { path: '/about', icon: <FaInfoCircle />, text: 'About' },
    { path: '/contact', icon: <FaEnvelope />, text: 'Contact' },
    { path: '/privacy', icon: <FaShieldAlt />, text: 'Privacy Policy' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <Logo position="left" />
          </Link>
        </div>
        
        {/* Mobile menu toggle */}
        <div className="navbar-menu-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <FaBars />
        </div>
        
        {/* Navigation links - conditional class for mobile */}
        <div className={`navbar-links ${showMobileMenu ? 'mobile-active' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.icon} <span>{link.text}</span>
            </Link>
          ))}
        </div>
        
        <div className="navbar-user" ref={dropdownRef}>
          {isLoggedIn ? (
            <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
              <span className="user-name">{userName}</span>
              <div className="user-avatar">
                <FaUser />
              </div>
              
              {showDropdown && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-user-avatar">
                      <FaUser />
                    </div>
                    <div className="dropdown-user-info">
                      <span className="dropdown-user-name">{userName}</span>
                      <span className="dropdown-user-email">{auth.currentUser?.email}</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleSignOut} className="dropdown-item">
                    <FaSignOutAlt className="dropdown-item-icon" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;