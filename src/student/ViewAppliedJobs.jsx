import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './student.css';
import config from '../config';

export default function ViewAppliedJobs() {
    const [studentData, setStudentData] = useState("");
    const [jobApplicants, setJobApplicants] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedStudentData = localStorage.getItem('student');
        if (storedStudentData) {
            const parsedStudentData = JSON.parse(storedStudentData);
            setStudentData(parsedStudentData);
        }
    }, []); 

    useEffect(() => {
        if (studentData) {
            fetchJobApplicants();
        }
    }); 

    const fetchJobApplicants = async () => {
        try {
            const response = await axios.get(`${config.url}/appliedjobs/${studentData.email}`);
            setJobApplicants(response.data);
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <div className="table-container1" style={{height:'512pt', marginTop:'2.1pt'}}>
            <h1 style={{color:'white' ,textAlign:'center'}}>Job Application Status</h1>
            {error && <h4 align="center" style={{ color: "red" }}>{error}</h4>}
            <table className="job-table" align='center'>
                <thead>
                    <tr>
                        <th>Applicant ID</th>
                        <th>Job ID</th>
                        <th>Applied Time</th>
                        <th>Status</th>
        
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(jobApplicants) && jobApplicants.length > 0 ? (
                        jobApplicants.map((applicant, index) => (
                            <tr key={index}>
                              <td>{applicant.jobid}</td>
                              <td>{applicant.applicantId}</td>
                                <td>{applicant.appliedTime}</td>
                               
                               
               
                                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor:
                      applicant.jobStatus === "SELECTED"
                        ? "#D3F804"
                        : applicant.jobStatus === "REJECTED"
                          ? "#F63434"
                          :  "pink",
                    color: "#222221",
                  }}>
                  {applicant.jobStatus}
                </td>
                              
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No Job Applications found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
