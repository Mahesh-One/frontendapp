import React, { useState } from 'react';
import './admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {FaUser,FaLock } from "react-icons/fa";
import profilee from '../images/adminphto.jpeg'
import aboutbg1 from '../images/aboutbg1.avif';
// import config from '../config';

export default function AdminLogin({onAdminLogin}) 
{
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post('https://sdpbackendapp-u3ub.onrender.com/checkadminlogin', formData);
      if (response.data != null) 
      {
        onAdminLogin(); 

        localStorage.setItem('admin', JSON.stringify(response.data));
        
        navigate("/adminhome");
      } 
      else 
      {
        setMessage("Login Failed");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  };

  return (
    <div className='body2'style={{height:'560pt', marginTop:'-60pt'}} >
      {/* <h2 align="center" style={{fontFamily:'Ink Free', color:'orange'}}>Admin Login</h2> */}
      {
        message ? <h3 align="center" style={{color:'red'}}>{message}</h3> : <h4 align="center">{error}</h4>
      }

      <form onSubmit={handleSubmit}  className='card8'>
      <img  className=' image' src={profilee} alt="profilee"  />
      <h2>Admin</h2>
        <div className='textarea1'>
          <label >Username</label>
          <input style={{border:'blue'}}  type="text" name="username" value={formData.username} onChange={handleChange} required />
          <FaUser  className='icon' />
        </div>
        <div >
          <label >Password</label>
          <input style={{border:'blue'}}  type="password" name="password" value={formData.password} onChange={handleChange} required />
          <FaLock className='icon' />

        </div>

        <button type="submit" className="button">Login</button>
      </form>
      <div>
        
          <img src={aboutbg1} alt="here"  className='img2' ></img>
        </div>
    </div>
    );}