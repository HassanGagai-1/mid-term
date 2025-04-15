import { model, Schema } from 'mongoose';

const gradeSchema = new Schema({
	gradeid: Number,
	start: Number,
	end: Number,
	grade: String,
	gpa: Number
})

export const Grade = model('Grade', gradeSchema);
