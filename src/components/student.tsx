import React, { useEffect, useState } from 'react';
import { StudentProps } from './types';

export default function Student({ getStudent, student }: StudentProps) {
  // Local state to store the marks (keyed by headid).
  const [localMarks, setLocalMarks] = useState<Record<number, number>>({});
  // Local state to store error messages (keyed by headid).
  const [errors, setErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    if (student) {

        const marksMap: Record<number, number> = {};
      student.marksByHead.forEach(item => {
        marksMap[item.headid] = item.marks;
      });
      setLocalMarks(marksMap);

      setErrors({});
    }
  }, [student]);


  const handleMarkChange = (headid: number, newValue: string) => {
    const value = parseFloat(newValue) || 0;
    let errorMessage = '';

    // Validate Quiz 1 only if headid === 1
    if (headid === 1 && (value < 0 || value > 5)) {
      errorMessage = 'Quiz 1 marks should be between 0 - 5';
    }

    setErrors(prev => ({
      ...prev,
      [headid]: errorMessage,
    }));

    // Update localMarks
    setLocalMarks(prev => ({
      ...prev,
      [headid]: value,
    }));
  };

  if (!student) {
    return <p>No student selected</p>;
  }

  return (
    <>
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
          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student._id}</td>

            <td>
              <input
                type="number"
                style={{ width: '40px' }}
                value={localMarks[1] ?? 0}
                onChange={(e) => handleMarkChange(1, e.target.value)}
              />{' '}
              / 5
            </td>

            <td>
              <input
                type="number"
                style={{ width: '40px' }}
                value={localMarks[2] ?? 0}
                onChange={(e) => handleMarkChange(2, e.target.value)}
              />{' '}
              / 5
            </td>

            <td>
              <input
                type="number"
                style={{ width: '40px' }}
                value={localMarks[3] ?? 0}
                onChange={(e) => handleMarkChange(3, e.target.value)}
              />{' '}
              / 5
            </td>
            <td>
              <input
                type="number"
                style={{ width: '40px' }}
                value={localMarks[4] ?? 0}
                onChange={(e) => handleMarkChange(4, e.target.value)}
              />{' '}
              / 5
            </td>
            <td>
              <input
                type="number"
                style={{ width: '40px' }}
                value={localMarks[5] ?? 0}
                onChange={(e) => handleMarkChange(5, e.target.value)}
              />{' '}
              / 35
            </td>
            <td>
              <input
                type="number"
                style={{ width: '40px' }}
                value={localMarks[6] ?? 0}
                onChange={(e) => handleMarkChange(6, e.target.value)}
              />{' '}
              / 25
            </td>
            <td>
              <input
                type="number"
                style={{ width: '40px' }}
                value={localMarks[7] ?? 0}
                onChange={(e) => handleMarkChange(7, e.target.value)}
              />{' '}
              / 15
            </td>
            <td>
              <input
                type="number"
                style={{ width: '40px' }}
                value={localMarks[8] ?? 0}
                onChange={(e) => handleMarkChange(8, e.target.value)}
              />{' '}
              / 5
            </td>
            <td>{student.totalMarks}</td>
            <td>{Math.round(student.totalMarks)}%</td>
            <td>{/* Grade (optional) */}</td>
          </tr>
        </tbody>
      </table>


      {errors[1] && (
        <p style={{ color: 'red', margin: '4px 0 0 0', fontSize: '0.9em' }}>
          {errors[1]}
        </p>
      )}
    </>
  );
}
