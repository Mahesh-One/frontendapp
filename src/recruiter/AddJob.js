import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './recruiter.css'
import config from '../config';

export default function AddJob() {

    const [recruiterData, setRecruiterData] = useState("");

    useEffect(() => {
        const storedRecruiterData = localStorage.getItem('recruiter');
        if (storedRecruiterData) {
          const parsedRecruiterData = JSON.parse(storedRecruiterData);
          setRecruiterData(parsedRecruiterData)
        }
      }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    roles: [], 
    location: '',
    salary: '',
    jobtype: '', 
    educationqualifications: '', 
    requirements: '',
    email: '',
    deadline: '',
    recruiter:''
  });

  // message state variable
  const [message, setMessage] = useState('');
  // error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRolesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, roles: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/addjob`, { ...formData, recruiter: recruiterData, company:recruiterData.company });
      if (response.status === 200) {
        setFormData({
          title: '',
          description: '',
          company: '',
          roles: [],
          location: '',
          salary: '',
          jobtype: '',
          educationqualifications: '',
          requirements: '',
          email: '',
          deadline: '',
          recruiter: ''
        });
      }
      setMessage(response.data);
      setError("Successfully Posted");
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage(''); //set message to ""
    }
  };
  

  return (
    
    <div  className='jobbg' style={{height:'600pt', marginTop:'-15pt'}}  >
      <h2 align="center"><u>Post a New Job</u></h2>
      {
        message ? <h4 align="center" style={{color:'white'}}>{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }
      <form onSubmit={handleSubmit} className='card10'>
        <div>
          <label className='label0' >Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Roles</label>
          <select id="roles" value={formData.roles} onChange={handleRolesChange} multiple required>
            <option value="Software Engineer">Software Engineer</option>
            <option value="System Engineer">System Engineer</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Testing">Testing</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label className='label0'>Job Type</label>
          <select id="jobtype" value={formData.jobtype} onChange={handleChange} required>
            <option value="">---Select---</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div>
          <label className='label0'>Location</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Salary</label>
          <input type="number" id="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0' style={{textAlign:'left'}}>Education Qualifications</label>
          <textarea id="educationqualifications" value={formData.educationqualifications} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Requirements(Skills)</label>
          <textarea id="requirements" value={formData.requirements} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Contact Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className='label0'>Deadline</label>
          <input type="date" id="deadline" value={formData.deadline} onChange={handleChange} required />
        </div>
        <button className='button00' type="submit">Post</button>
      </form>
    </div>
  );
}