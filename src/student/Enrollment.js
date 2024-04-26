import React, { useState } from 'react';
import axios from 'axios';
import './enroll.css'
import { colors } from '@mui/material';
import config from '../config';

export default function Registration() 
{
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => 
  {
    
    setFormData({...formData, [e.target.id]: e.target.value});
    
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/insertstudent`, formData);
      if (response.status === 200) 
      {
        setFormData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          email: '',
          password: '',
          location: '',
          contact: ''
        });
      }
      setMessage(response.data);
      setError('');
    } 
    catch(error) 
    {
      setError(error.response.data);
      setMessage(''); 
    }
  };
  
  return (
    <div className='backscrn'  style={{marginTop:'-10px'}}>
      {
        message ? <h2 align="center" style={{color:'white'}}>{message}</h2> : <h4 align="center">{error}</h4>
      }

      <form  className='card9' onSubmit={handleSubmit}>
    
        <div className='text2'>
        <h3 style={{color:'white'}}><b><u>Student Registration </u></b></h3>
          <label style={{textAlign:'left'}}>Full Name</label>
          <input type="text" id="fullname" value={formData.fullname} onChange={handleChange} required />
       
          <label style={{textAlign:'left'}}>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
       
          <label style={{textAlign:'left'}}>Date of Birth</label>
          <input type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
        
          <label style={{textAlign:'left'}}>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        
          <label style={{textAlign:'left'}}>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
       
          <label style={{textAlign:'left'}}>Location</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required />
       
          <label style={{textAlign:'left'}}>Contact</label>
          <input type="number" id="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <button className='buttons' type="submit">Register</button>
      </form>
    </div>
  );
}