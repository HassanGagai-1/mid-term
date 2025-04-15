// StudentList.tsx

import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { StudentWithMarks } from './types';

export const StudentList = () => {
  // State for the list of all students.
  const [students, setStudents] = useState<StudentWithMarks[]>([]);
  // State for the student fetched by registration number.
  const [selectedStudent, setSelectedStudent] = useState<StudentWithMarks | null>(null);

  const [semNo, setSemNo] = useState<number>(0);

  const [courseids, setCourseIds] = useState<number[]>([]);



  // Fetch the full list of students on mount.
  const getStudents = async () => {
    try {
      const response = await api.get('/api/students-with-marks');
      console.log('Response:', response);
      const data = response.data;
      console.log('Fetched students list:', data);
        // Set the students state with the fetched data. 
      setStudents(data);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };






  useEffect(() => {
    getStudents();
  }, []);  

  return (
    <div>
      <h2>Student Detail Lookup</h2>
      {/* Pass the fetch function and the selected student to the Student component */}
      <div>&nbsp;</div>
    
      <h2>Students List</h2>
      
      <table> 
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg. No.</th>
            <th>Quiz 1</th>
            <th>Quiz 2</th>
            <th>Assig. 1</th>
            <th>Assig. 2</th>
            <th>Final 1</th>
            <th>Mid Term 1</th>
            <th>Project 1</th>
            <th>CP 1</th>
            <th>Total</th>
            <th>Percent</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td> 
                <td>{s._id}</td>
                <td>{s.marksByHead.find(m => m.headid === 1)?.marks || 0}</td>
                <td>{s.marksByHead.find(m => m.headid === 2)?.marks || 0}</td>
                <td>{s.marksByHead.find(m => m.headid === 3)?.marks || 0}</td>
                <td>{s.marksByHead.find(m => m.headid === 4)?.marks || 0}</td>
                <td>{s.marksByHead.find(m => m.headid === 5)?.marks || 0}</td>
                <td>{s.marksByHead.find(m => m.headid === 6)?.marks || 0}</td>
                <td>{s.marksByHead.find(m => m.headid === 7)?.marks || 0}</td>
                <td>{s.marksByHead.find(m => m.headid === 8)?.marks || 0}</td>
                <td>{s.totalMarks}</td>
                <td>{Math.round(s.totalMarks)}%</td>
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
