import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './student.css'
import config from '../config';

export default function ViewJobsPosted() 
{
  const [studentData, setStudentData] = useState("");

  useEffect(() => {
    const storedStudentData = localStorage.getItem('student');
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudentData(parsedStudentData)
    }
  }, []);

  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${config.url}/viewjobsbystudent/`);
      setJobs(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchJobs();
  }); // Remove the dependency array

  const applyJob = async (jobid, studentemail) => {
    try 
    {
      const response = await axios.post(`${config.url}/applyjob`, { jobid, studentemail });
      fetchJobs();
      setMessage(response.data);
      setError('');
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage('');
    }
  }
  

  return (
    <div className="table-containers" style={{height:'512pt', marginTop:'2.1pt'}}>
      <h1 style={{color:'white', textAlign:'center'}}>Posted Jobs</h1>
      {
        message ? <h4 align="center" style={{color:'white'}}>{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }
      <table className="job-table" align='center'>
        <thead>
          <tr>
            <th>JOB ID</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Deadline</th>
            <th>Posted By</th>
            <th>Posted Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job, index) => (
              <tr key={index}>
                <td>{job.jobid}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>{job.deadline}</td> 
                
                <td>{job.recruiter.fullname}</td>
                <td>{job.postedtime}</td>
                <td><button className='button' onClick={() => applyJob(job.jobid,studentData.email)}>Apply</button></td>
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