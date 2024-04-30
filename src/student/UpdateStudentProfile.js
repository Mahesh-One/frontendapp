import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './enroll.css';
import config from '../config';

export default function UpdateJSProfile() {
  const [studentData, setStudentData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialStudentData, setInitialStudentData] = useState({});

  useEffect(() => {
    const storedStudentData = localStorage.getItem('student');
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudentData(parsedStudentData);
      setInitialStudentData(parsedStudentData); 
    }
  }, []);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const updatedData = {};
      for (const key in studentData) {
        if (studentData[key] !== initialStudentData[key] && initialStudentData[key] !== '') {
          updatedData[key] = studentData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        updatedData.email = studentData.email;
        const response = await axios.put(`${config.url}/updatestudentprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/studentprofile/${studentData.email}`, updatedData)
        localStorage.setItem("student",JSON.stringify(res.data))
      } else {
        // No changes
        setMessage("No Changes in Student Profile");
        setError("");
      }
    } 
    catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  
  return (
    <div className='updbg' >
      {message ? <h4 align="center" style={{color:'white'}}>{message}</h4> : <h4 align="center" color='red'>{error}</h4>}
      <form onSubmit={handleSubmit} className='card9'>
        <div className='text2'>
        <h2  align="center" style={{color:'white'}}>Update Profile</h2>

          <label  style={{textAlign:'left'}}>Full Name</label>
          <input type="text" id="fullname" value={studentData.fullname} onChange={handleChange} required />
        
          <label  style={{textAlign:'left'}}>Gender</label>
          <input type="text" id="gender" value={studentData.gender} readOnly />
       
          <label  style={{textAlign:'left'}}>Date of Birth</label>
          <input type="date" id="dateofbirth" value={studentData.dateofbirth} onChange={handleChange} required />
       
          <label  style={{textAlign:'left'}}>Email</label>
          <input type="email" id="email" value={studentData.email} readOnly />
      
          <label  style={{textAlign:'left'}}>Password</label>
          <input type="password" id="password" value={studentData.password} onChange={handleChange} required />
      
          <label  style={{textAlign:'left'}}>Location</label>
          <input type="text" id="location" value={studentData.location} onChange={handleChange} required />
      
          <label  style={{textAlign:'left'}}>Contact</label>
          <input type="number" id="contact" value={studentData.contact} onChange={handleChange} required />
        </div>
        <button  className='buttonss'  type="submit">Update</button>
      </form>
    </div>
  );
}