import React from 'react';
import NotFoundImage from './notfound.png';
import './style.css'

export default function PageNotFound() {
  return (
    <div className="not-found-container">
      <h1 style={{color:"white"}}> oops.. We are Sorry Page Not Found</h1>
      <img src={NotFoundImage} alt="Page Not Found" className="not-found-image" />
    </div>
  );
}