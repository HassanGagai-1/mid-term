import React, { useEffect, useState } from 'react';
import { StudentProps } from './types';

export default function Student({ getStudent, student }: StudentProps) {
  // Local object to store each headid => mark
  const [localMarks, setLocalMarks] = useState<Record<number, number>>({});

  useEffect(() => {
    // Whenever a new student is selected, fill the local state
    // with the student's existing marks, keyed by headid.
    if (student) {
      const marksMap: Record<number, number> = {};
      student.marksByHead.forEach(item => {
        marksMap[item.headid] = item.marks;
      });
      setLocalMarks(marksMap);
    }
  }, [student]);

  // Handler to update localMarks when the user types in an <input>
  const handleMarkChange = (headid: number, newValue: string) => {
    const value = parseFloat(newValue) || 0;
    setLocalMarks(prev => ({
      ...prev,
      [headid]: value
    }));
  };

  if (!student) {
    return <p>No student selected</p>;
  }

  return (
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
        {/* Single-row table, if this is a single student */}
        <tr>
          <td>{student.name}</td>
          <td>{student._id}</td>
          {/* Example: Quiz 1 with a maximum of 5 marks */}
          <td>
            <input
              type="number"
              style={{ width: '40px' }}
              value={localMarks[1] ?? 0}
              onChange={(e) => handleMarkChange(1, e.target.value)}
            />{" "}
            / 5
          </td>

          {/* Repeat the same pattern for Quiz 2, Assig.1, etc. */}
          <td>
            <input
              type="number"
              style={{ width: '40px' }}
              value={localMarks[2] ?? 0}
              onChange={(e) => handleMarkChange(2, e.target.value)}
            />{" "}
            / 5
          </td>
          <td>
            <input
              type="number"
              style={{ width: '40px' }}
              value={localMarks[3] ?? 0}
              onChange={(e) => handleMarkChange(3, e.target.value)}
            />{" "}
            / 5
          </td>
          <td>
            <input
              type="number"
              style={{ width: '40px' }}
              value={localMarks[4] ?? 0}
              onChange={(e) => handleMarkChange(4, e.target.value)}
            />{" "}
            / 5
          </td>
          <td>
            <input
              type="number"
              style={{ width: '40px' }}
              value={localMarks[5] ?? 0}
              onChange={(e) => handleMarkChange(5, e.target.value)}
            />{" "}
            / 35
          </td>
          <td>
            <input
              type="number"
              style={{ width: '40px' }}
              value={localMarks[6] ?? 0}
              onChange={(e) => handleMarkChange(6, e.target.value)}
            />{" "}
            / 25
          </td>
          <td>
            <input
              type="number"
              style={{ width: '40px' }}
              value={localMarks[7] ?? 0}
              onChange={(e) => handleMarkChange(7, e.target.value)}
            />{" "}
            / 15
          </td>
          <td>
            <input
              type="number"
              style={{ width: '40px' }}
              value={localMarks[8] ?? 0}
              onChange={(e) => handleMarkChange(8, e.target.value)}
            />{" "}
            / 5
          </td>

          {/* For total, you might sum the localMarks or rely on student.totalMarks */}
          <td>{student.totalMarks}</td>
          <td>{Math.round(student.totalMarks)}%</td>
          <td>{/* Grade or placeholder here */}</td>
        </tr>
      </tbody>
    </table>
  );
}
