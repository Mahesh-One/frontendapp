import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css'
import config from '../config';

export default function ViewStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${config.url}/viewstudents`);
      setStudents(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (email) => {
    try {
      await axios.delete(`${config.url}/deletestudent/${email}`);
      fetchStudents();
    } catch (error) {
      console.error(error.message);
    }
  }

  const viewStudent = async (email) => {
    try 
    {
      navigate(`/viewstudentprofile/${email}`)
      window.location.reload()
    } 
    catch (error) 
    {
      console.error(error.message);
    }
  }

 
  return (
    <div style={{ textAlign: 'center',height:'512pt', marginTop:'-15pt'  }} className='stdenbg'>
      <h1 style={{color:'white'}}>Students Enrolled</h1>
      
      <table border={1} align="center" className='table1' style={{ width: '15px', height: '150px' ,fontFamily:'Cascadia Code SemiBold'}}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(students) && students.length > 0 ? (
    students.map((student, index) => (
      <tr key={index}>
        
        <td>{student.fullname}</td>
        <td>{student.gender}</td>
        <td>{student.dateofbirth}</td>
        <td>{student.email}</td>
        <td>{student.location}</td>
        <td>{student.contact}</td>
        <td>
        <button onClick={() => viewStudent(student.email)} className='button'>View</button>
          <button onClick={() => deleteStudent(student.email)} className='buttom'>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
    </div>
  );
}