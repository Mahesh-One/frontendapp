import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import './admin.css';
import config from '../config';

export default function ViewStudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const { email } = useParams(); // Extract email from URL parameters

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${config.url}/viewstudentprofile/${email}`);
        setStudentData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (email) {
      fetchStudentData();
    }
  }, [email]);


  if (!email) {
    return null;
  }

  return (
    studentData ? (
      <div className='card82'>
        <p><strong>Full Name:</strong> {studentData.fullname}</p>
        <p><strong>Gender:</strong> {studentData.gender}</p>
        <p><strong>Date of Birth:</strong> {studentData.dateofbirth}</p>
        <p><strong>Email:</strong> {studentData.email}</p>
        <p><strong>Location:</strong> {studentData.location}</p>
        <p><strong>Contact:</strong> {studentData.contact}</p>
      </div>
    ) : (
      <p>No Student Data Found</p>
    )
  );
}