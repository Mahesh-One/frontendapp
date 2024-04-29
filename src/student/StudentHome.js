import React, { useEffect, useState } from 'react';

export default function StudentHome() {
  const [studentData, setStudentData] = useState("");

  useEffect(() => {
    const storedStudentData = localStorage.getItem('student');
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudentData(parsedStudentData)
    }
  }, []);

  return (
    <div className='stdhmbg' style={{height:'517pt', marginTop:'-15pt'}} >
      {studentData && (
        <div>
          <h1  style={{color:'white',textAlign:'center'}}>Welcome {studentData.fullname}</h1>
          
        </div>
      )}
    </div>
  );
}