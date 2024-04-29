import React from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'

import StudentHome from './StudentHome'
import StudentProfile from './StudentProfile'
import UpdateStudentProfile from './UpdateStudentProfile'
import ViewAppliedJobs from './ViewAppliedJobs'
import ViewJobsPosted from './ViewJobsPosted'


export default function StudentNavBar() 
{

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isStudentLoggedIn');
    localStorage.removeItem('student');

    navigate('/studentlogin');
    window.location.reload()
  };

  return (
    <div>

    <nav>
     <ul>
     <Link to="/studenthome">Home</Link>
     <li className="dropdown">
            <Link>Profile</Link>
            <div className="dropdown-content">
            <Link to="/studentprofile">View Profile</Link>
            <Link to="/updatestudentprofile">Update Profile</Link>
            </div>
          </li>
          <li><Link to="/viewjobsposted">View Jobs</Link></li>
          <li><Link to="/viewappliedjobs">Applied Jobs</Link></li>

     <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>

     </ul>
     </nav>

         <Routes>
         <Route path="/studenthome" Component={StudentHome} exact/>
         <Route path="/studentprofile" Component={StudentProfile} exact/>
         <Route path="/updatestudentprofile" element={<UpdateStudentProfile/>} exact />
         <Route path="/viewjobsposted" element={<ViewJobsPosted/>} exact />
        <Route path="/viewappliedjobs" element={<ViewAppliedJobs/>} exact />
         

        </Routes>

    </div>
  )
}