import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css'
import config from '../config';

export default function AdminHome() {
  const [adminData, setAdminData] = useState("");
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedAdminData = localStorage.getItem('admin');
    if (storedAdminData) {
      const parsedAdminData = JSON.parse(storedAdminData);
      setAdminData(parsedAdminData);
      fetchCounts();
    }
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${config.url}/analysis`);
      setCounts(response.data);
    } catch (error) {
      setError('Failed to fetch counts');
    }
  };

  return (
    <div className='adminhomebg' style={{height:'540pt', marginTop:'1pt'}} >
      {adminData && (
        <div style={{alignContent:"center"}}> 
          <h1 style={{color:'white',textAlign:'center'}}>Welcome {adminData.username}</h1>
          {counts ? (
            <div className="row">

             <div className="column">
                <div className="card52">
                  <h3>Students</h3>
                  <p>{counts.studentCount}</p>
                </div>
              </div>

              <div className="column">
                <div className="card52">
                  <h3>Recruiters</h3>
                  <p>{counts.recruiterCount}</p>
                </div>
              </div>


              <div className="column">
                <div className="card52">
                  <h3>Jobs</h3>
                  <p>{counts.jobCount}</p>
                </div>
              </div>

              <div className="column">
                <div className="card52">
                  <h3>Job Applicants</h3>
                  <p>{counts.jobApplicantCount}</p>
                </div>
              </div>

              <div className="column">
                <div className="card52">
                  <h3>Selected Applicants</h3>
                  <p>{counts.selectedCount}</p>
                </div>
              </div>


              <div className="column">
                <div className="card52">
                  <h3>Rejected Applicants</h3>
                  <p>{counts.rejectedCount}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading counts...</p>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
}
