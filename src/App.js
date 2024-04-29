//import logo from './logo.svg';
//import './App.css';
import React,{ useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import HeaderNavBar from './forepage/HeaderNavBar';
import AdminNavBar from './admin/AdminNavBar';
import RecruiterNavBar from './recruiter/RecruiterNavBar';
import StudentNavBar from './student/StudentNavBar'


function App() {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isRecruiterLoggedIn, setIsRecruiterLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const studnetLoggedIn = localStorage.getItem('isStudentLoggedIn') === 'true';
    const recruiterLoggedIn = localStorage.getItem('isRecruiterLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsStudentLoggedIn(studnetLoggedIn);
    setIsRecruiterLoggedIn(recruiterLoggedIn);
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onStudentLogin = () => {
    localStorage.setItem('isStudentLoggedIn', 'true');
    setIsStudentLoggedIn(true);
  };

  const onRecruiterLogin = () => {
    localStorage.setItem('isRecruiterLoggedIn', 'true');
    setIsRecruiterLoggedIn(true);
  };

  return (
    <div className="App" >

     {/* <h1 align="center"  style={{color:'#ff6700 ',fontFamily:'Cambria (Headings)'}}> Campus Recruitment Management System </h1> */}

      <Router>
      {isAdminLoggedIn ? (
          <AdminNavBar />
        ) 
        : isStudentLoggedIn ? (
          <StudentNavBar />
        )
         : isRecruiterLoggedIn ? (
          <RecruiterNavBar />
        ): (
          <HeaderNavBar
            onAdminLogin={onAdminLogin}
            onStudentLogin={onStudentLogin}
            onRecruiterLogin={onRecruiterLogin}
          />
        )}
    
      </Router>

    </div>
    
  );
}

export default App;
