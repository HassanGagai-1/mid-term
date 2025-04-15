import mongoose from "mongoose";
const { model, models, Schema } = mongoose;

const markSchema = new Schema({
	mid: Number,
	regno: String,
	hid: Number,
	marks: Number,
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Student'
	},
	head: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Head'
	}
});

export const Mark = models.Mark || model('Mark', markSchema);
