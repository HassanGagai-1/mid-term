// StudentList.tsx

import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { StudentWithMarks, Grade } from './types';
import Student from "./student"

export const StudentList = () => {

  const [students, setStudents] = useState<StudentWithMarks[]>([]);

  const [selectedStudent, setSelectedStudent] = useState<StudentWithMarks | null>(null);

  const [grades, setGrades] = useState<Grade[]>([]);

  const maxTotal = 100;

  const getStudents = async () => {
    try {
      const response = await api.get('/api/students-with-marks');
      console.log('Response:', response);
      const data = response.data;
      console.log('Fetched students list:', data);
      setStudents(data);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

const getGrades = async () => {
  try{
    const response = await api.get('/api/get-grades');
    console.log('Response:', response);
    const data: Grade[] = response.data;
    console.log("data: ",data);
    setGrades(data);
  } catch (error) {
    console.error('Error fetching grades:', error);
  }
};

function calculateGrade(gradesData: Grade[], percentage: number): Grade {
  // Create a copy and sort descending by start value.
  const sortedGrades = [...gradesData].sort((a, b) => b.start - a.start);
  // Find the first grade where percentage fits in between start and end.
  const matchedGrade = sortedGrades.find(
    (grade) => percentage >= grade.start && percentage <= grade.end
  );
  return matchedGrade || { gradeid: 0, grade: "Invalid"};
}
const computedStudents = students.map(student => {
  const percentage = (student.totalMarks / maxTotal) * 100;
  const roundedPercentage = Math.round(percentage);
  const computedGrade = calculateGrade(grades, roundedPercentage);
  return { ...student, percentage: roundedPercentage, grade: computedGrade.grade };
});



  useEffect(() => {
    getStudents();
    getGrades();
  }, []);  

  return (
    <>
    <div>
      <h2>Student Detail Lookup</h2>
      {/* Pass the fetch function and the selected student to the Student component */}
      <div>&nbsp;</div>
    
      <h2>Students List</h2>
      <h2>Upon clicking Student name, it opens table at bottom</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}> 
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
          {computedStudents.length > 0 ? (
            computedStudents.map((s) => (
              <tr key={s._id}>
                <td
                style={{cursor: 'pointer',hover: {color: 'blue'}}}
                onClick={() => setSelectedStudent(s)}>
                  {s.name}</td> 
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
                <td>{s.percentage}%</td>
                  <td>{s.grade}</td>
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
    <div
          style={{
            width: '300px',
            borderLeft: '1px solid #ccc',
            padding: '1rem',
            background: '#f9f9f9'
          }}
        >
          <Student
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
            refreshStudents={getStudents}
          />
        </div>
          </>
  );
};

export default StudentList;
