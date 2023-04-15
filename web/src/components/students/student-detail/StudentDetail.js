import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import studentsService from '../../../services/students';

function StudentDetail() {
  const [student, setStudent] = useState();
  const { studentId } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const student = await studentsService.get(studentId);
        setStudent(student);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudent();
  }, [studentId])

  return (
    <>
      {!student ? (<p><i className='fa fa-gear fa-spin'></i>Loading...</p>) : (
        <>
          <h1>{student.name}</h1>
        </>
      )}
    </>
  )
}

export default StudentDetail