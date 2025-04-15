import mongoose from "mongoose";  // Import mongoose as ES Module

const { Schema } = mongoose;  // Destructure Schema from mongoose

const gradeSchema = new Schema({
  gradeid: Number,
  start: Number,
  end: Number,
  grade: String,
  gpa: Number
});

export const Grade = mongoose.model("Grade", gradeSchema);  // Export model
