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
      const data = response.data;
      console.log('Fetched students list:', data);
        // Set the students state with the fetched data. 
      setStudents(data);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };
  const getSemNo = (semNo: number) => {
    setSemNo(semNo);
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
            <th>Reg. No.</th>
            <th>Name</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s._id}>
                <td>{s.regno}</td>
                <td>{s.name}</td>
                <td>
                  {s.marks && s.marks.length > 0 ? (
                    s.marks.map((mark) => mark.marks).join(', ')
                  ) : (
                    'No marks'
                  )}
                </td>
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
