import React, { useEffect, useState } from 'react';
import './recruiter.css'
import config from '../config';

export default function RecruiterHome() {
  const [recruiterData, setRecruiterData] = useState("");

  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData)
    }
  }, []);

  return (
    <div className='rechmbg'   style={{height:'512pt', marginTop:'-15pt'}}>
      {recruiterData && (
        <div>
          <h1  style={{color:'Black',textAlign:'center'}}>Welcome {recruiterData.fullname}</h1>
        </div>
      )}
    </div>
  );
}