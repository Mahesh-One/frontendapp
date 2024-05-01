import React, { useState } from 'react';
import './recruiter.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../images/stdregbg.jpg';
import config from '../config';

export default function RecruiterLogin({onRecruiterLogin}) 
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
      const response = await axios.post(`${config.url}/checkrecruiterlogin`, formData);
      if (response.data != null) 
      {
        onRecruiterLogin();

        localStorage.setItem('recruiter', JSON.stringify(response.data));

        navigate("/recruiterhome");
      } 
      else 
      {
        setMessage("Login Failed")
        setError("")
      }
    } 
    catch (error) 
    {
      setMessage("")
      setError(error.message)
    }
  };

  return (
    <div className='bgimg' style={{height:'742px', marginTop:'-80px'}}>
      {
        message ? <h4 align="center">{message}</h4> : <h4  align = "center">{error}</h4>
      }
      <form onSubmit={handleSubmit} className='wrapper'>
        <h2 style={{color:'#666666'}}> Recruiter Login</h2>
        <div className='textfield4'>
          <label className='label4'>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
       </div>
       <div className='textfield4'>
          <label className='label4'>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button  type="submit" className="button1">Login</button>
        
      </form>
    </div>
  );
}