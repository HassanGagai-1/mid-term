export type Mark={
    _id: string;
    regno: string;
    subject: string;
    marks: number;
}
export type StudentWithMarks={
    _id: string;
    regno: string;
    name: string;
    marks: Mark[]; // Result of $lookup
}

export type Grade= {
    _id: string;
    gradeid : number,
    start : number,
    end : number,
    grade : string,
    gpa: number
}
export interface StudentProps {
  student: StudentWithMarks | null;
  onClose: () => void;
  refreshStudents: () => void; // <- new prop
}