import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewRecruiters() {
  const [recruiters, setRecruiters] = useState([]);

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get(`${config.url}/viewrecruiters`);
      setRecruiters(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const deleteRecruiter = async (username) => {
    try {
      await axios.delete(`${config.url}/deleterecruiter/${username}`);
      fetchRecruiters();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div style={{ textAlign: 'center' ,height:'512pt', marginTop:'-15pt'   }} className='rectrvwbg'>
      <h1 style={{color:'red'}}>Recruiters</h1>
      
      <table  className='table1' border={1} align="center" style={{ width: 'auto', height: 'auto' }}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Company</th>
              <th>Designation</th>
              <th>Employee-Range</th>
              <th>Username</th>
              <th>Password</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(recruiters) && recruiters.length > 0 ? (
    recruiters.map((recruiter, index) => (
      <tr key={index}>
        <td>{recruiter.fullname}</td>
        <td>{recruiter.gender}</td>
        <td>{recruiter.company}</td>
        <td>{recruiter.designation}</td>
        <td>{recruiter.empRange}</td>
        <td>{recruiter.username}</td>
        <td>{recruiter.password}</td>
        <td>{recruiter.email}</td>
        <td>{recruiter.address}</td>
        <td>{recruiter.contact}</td>
        <td>
          <button   onClick={() => deleteRecruiter(recruiter.username)} className='buttom'>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
    </div>
  );
}