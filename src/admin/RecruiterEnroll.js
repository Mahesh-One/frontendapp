import React, { useState } from 'react';
import axios from 'axios';
import './recruiteradder.css'
import config from '../config';

export default function RecruiterEnroll() 
{
  //formData state variable
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    company: '',
    username: '',
    email: '',
    address: '',
    contact: ''
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => 
  {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const changetext = (e) =>
  {
    const txt = e.target.value.toUpperCase()
    e.target.value = txt
  }

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/addrecruiter`, formData);
      if (response.status === 200) 
      {
        setFormData({
          fullname: '',
          gender: '',
          company: '',
          designation: '',
          empRange: '',
          username: '',
          password: '',
          email: '',
          address: '',
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
    <div className='recbg' style={{height:'773px', marginTop:'-80px'}}>
      {
        message ? <h2  className='label8' align="center" style={{color:'white'}}>{message}</h2> : <h4 align="center">{error}</h4>
      }

      <form  className='card0' onSubmit={handleSubmit}>
        <div>
          <label className='label0'>Full Name</label>
          <input  className='text0' type="text" id="fullname" value={formData.fullname} onChange={handleChange} onKeyUp={changetext} required />
        </div>
        <div>
          <label className='label0'>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        
        <div>
          <label className='label0'>Company Name</label>
          <input className='text0' type="text" id="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Designation</label>
          <input  className='text0'type="text" id="designation" value={formData.designation} onChange={handleChange} required />
        </div>
        <div>
        <label className='label0'>Employee-Range</label>
          <select id="empRange" value={formData.empRange} onChange={handleChange} required>
            <option value="">Employee-Count</option>
            <option value="1-100">1-100</option>
            <option value="100-500">100-500</option>
            <option value="500-1000">500-1000</option>
            </select>
        </div>
        <div>
          <label className='label0'>Username</label>
          <input className='text0' type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
        <label  className='label0'>Password</label>
          <input   className='text0' type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Email</label>
          <input className='text0' type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Address</label>
          <textarea  type="text" id="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Contact</label>
          <input className='text0' type="number" id="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <button className='button0' type="submit">Enroll</button>
      </form>
    </div>
  );
}