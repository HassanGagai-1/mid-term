import mongoose from "mongoose";
const { model, models, Schema } = mongoose;

const studentSchema = new Schema({
	regno: String,
	name: String,
	marks:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Mark'
	}]
});

export const Student = models.Student || model('Student', studentSchema);
