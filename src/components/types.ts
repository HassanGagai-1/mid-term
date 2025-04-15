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


export interface StudentProps {
  student: StudentWithMarks | null;
  onClose: () => void;
  refreshStudents: () => void; // <- new prop
}