import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import './style.css';
import Contact from './Contact';
import Studentlogin from './../student/Studentlogin';
import Enrollment from '../student/Enrollment';
import AdminLogin from '../admin/AdminLogin';
import profile1 from './projectlogo.jpg';
import RecruiterLogin from './../recruiter/RecruiterLogin';
import PageNotFound from './PageNotFound';


export default function HeaderNavBar({onAdminLogin,onStudentLogin,onRecruiterLogin}) {
 

  return (
    <div>
      <nav>
        <ul>
          <img src={profile1} alt='profile' width='50%' />
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li><Link to='/about'>About</Link></li>
          <li> <Link to='/contact'>Contact</Link></li>
           <li>
                <Link to="/enrollment"> Student Enrollment</Link>
             
         </li>
        

         <li className="dropdown">
            <Link>Login</Link>
            <div className="dropdown-content">
              <Link to="/studentlogin">Student Login</Link>
              <Link to="/recruiterlogin">Recruiter Login</Link>
              <Link to="/adminlogin">Admin Login</Link>
            </div>
          </li>

        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/about' element={<About />} exact />
        <Route path='/contact' element={<Contact />} exact />
        <Route path='/studentlogin/*' element={<Studentlogin onStudentLogin={onStudentLogin}/>} exact />
        <Route path='/enrollment' element={<Enrollment />} exact />
        <Route path='/adminlogin'element={<AdminLogin onAdminLogin={onAdminLogin}/>} exact />
        <Route path='/recruiterlogin'element={<RecruiterLogin onRecruiterLogin={onRecruiterLogin}/>} exact />
        <Route path="*" element={<PageNotFound/>} exact />


      </Routes>
    </div>
  );
}