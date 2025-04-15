import { GradeType } from "../src/components/types";  // Import your TypeScript type
import { Grade } from "../models/Grade";

export async function calculateGrade(percentage: number): Promise<GradeType> {
  try {
    // Fetch all grades from the database, sorted by start percentage in descending order
    const grades = await Grade.find().sort({ start: -1 });

    // Find the grade that matches the percentage
    const matchedGrade = grades.find((grade) => 
      percentage >= grade.start && percentage <= grade.end
    );

    // Return the matched grade, or a default "Invalid" grade if no match is found
    return matchedGrade || { gradeid: 0, start: 0, end: 0, grade: "Invalid", gpa: 0 };
  } catch (err) {
    console.error("Error calculating grade:", err);
    throw new Error("Error calculating grade");
  }
}


