
import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Page Not Found</p>
        <a href="/" className="not-found-link">Go Back Home</a>
      </div>
    </div>
  );
};

export default NotFound;
