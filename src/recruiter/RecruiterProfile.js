import React, { useEffect, useState } from 'react';
import './recruiter.css';
import config from '../config';

export default function RecruiterProfile() {
  const [recruiterData, setRecruiterData] = useState(null);

  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData);
    }
  }, []);

  return (
    recruiterData ? (
      <div className='recpfbg' style={{height:'518pt', marginTop:'-1pt'}}  >
      <div className='cards-client'>
        <p><strong>Full Name:</strong> {recruiterData.fullname}</p>
        <p><strong>Gender:</strong> {recruiterData.gender}</p>
        <p><strong>Company Name:</strong> {recruiterData.companyname}</p>
        <p><strong>Designation:</strong> {recruiterData.designation}</p>
        <p><strong>Employee-Range:</strong> {recruiterData.empRange}</p>
        <p><strong>Username:</strong> {recruiterData.username}</p>
        <p><strong>Password:</strong> {recruiterData.password}</p>
        <p><strong>Email:</strong> {recruiterData.email}</p>
        <p><strong>Address:</strong> {recruiterData.address}</p>
        <p><strong>Contact:</strong> {recruiterData.contact}</p>


      </div>
      </div>
    ) : (
      <p>No Recruiter Data Found</p>
    )
  );
}