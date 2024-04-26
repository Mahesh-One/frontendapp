import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './admin.css';
import config from '../config';

import AdminHome from './AdminHome';
import ViewStudents from './ViewStudents';
import RecruiterEnroll from './RecruiterEnroll';
import ViewRecruiters from './ViewRecruiters';
import ViewStudentProfile from './ViewStudentProfile';

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin');
    window.location.reload()
  };

    // setTimeout(handleLogout,3000) //3000 in the sense 3 seconds

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/adminhome">Home</Link></li>
          <li className="dropdown">
            <Link>Student</Link>
            <div className="dropdown-content">
              <Link to="/viewstudents">View Students</Link>
            </div>
          </li>
          <li className="dropdown">
            <Link>Recruiter</Link>
            <div className="dropdown-content">
                 <Link to="/recruiterenroll">Recruiter Enroll</Link>
                 <Link to="/viewrecruiters">View Recruiters</Link>
            </div>
          </li>
          <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/viewstudents" element={<ViewStudents />} exact />
        <Route path="/recruiterenroll" element={<RecruiterEnroll />} exact />
        <Route path="/viewrecruiters" element={<ViewRecruiters />} exact />
        <Route path="/viewstudentprofile/:email" element={<ViewStudentProfile/>} exact />

      </Routes>
    </div>
  );
}