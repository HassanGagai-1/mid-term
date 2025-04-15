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

export type StudentProps = {
    getStudent: (regno: string) => Promise<void>;
  // The student prop can be null if no student details have been fetched yet.
  student: StudentWithMarks | null;

}

export type SemesterProps = {
    getSemNo: (semNo: number) => void
}
export type Course = {
    courseid: number,
    code: string,
    title: string,
    crhr: number,
    semester: number
  }
  
  export type SemetserCoursesProps = {
      semno: number
      getCourseIds: (args: {
        name: string;
        value: number;
        crsIds: number[];
    }) => void,
    cids: number[],
    addRegs: () => void
  }