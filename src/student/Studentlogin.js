import React, {useState} from 'react'
import {Routes,Route,Link, useNavigate} from 'react-router-dom'
import Enrollment from './Enrollment'
import './student.css'
import profile from './projectlogo.jpg'
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import config from '../config'



export default function Studentlogin({onStudentLogin}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/checkstudentlogin`, formData);
      if (response.data != null) 
      {
        onStudentLogin();

        localStorage.setItem('student', JSON.stringify(response.data));

        navigate("/studenthome");
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
    <div className='stdbg' style={{height:'512pt', marginTop:'-15pt'}} >
      
        {/* <h2 align="center" style={{color:'#ffb300', fontFamily:'Ink Free'}  }>LOGIN</h2> */}
        {
        message ? <h4 align="center" style={{color:'red'}}>{message}</h4> : <h4 align="center">{error}</h4>
      }
        <form className='card' onSubmit={handleSubmit}>
        <div >
        {/* <img src={profile} alt="profile" width="40%" /> */}
         <AccountCircleIcon color="primary" fontSize="large" />
         <h2 >Studentlogin</h2>
          <label className='label' >Email</label>
          <input style={{borderColor:'violet'}}  type="email" id="email"  value={formData.email} onChange={handleChange} placeholder='Enter e-mail'  required/>
    
          <label className='label'  >Password</label>
          <input style={{borderColor:'violet'}}  type="password" id="password" value={formData.password} onChange={handleChange}   placeholder='password' required/>
        </div>
        <button type="submit" className="button"  >Login</button>&nbsp;&nbsp;&nbsp;&nbsp;
        {/* <button type = "reset" className="button">Clear</button> */}
        <p > New User? &nbsp;

       <Link to="/enrollment" style={{color:"black"}}>Register here</Link>
        <Routes> <Route path="/enroll" element={<Enrollment/>} exact/></Routes> </p>
      </form>
            
            
      
        </div>
        
  )
}
