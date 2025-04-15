import { model, Schema } from "mongoose"

const markSchema = new Schema({
    mid: Number,
    regno: String,
    hid: Number,
    marks: Number,
    // student: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Student",
    // },
    // head: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Head",
    // },
});

// Always attach `populate()` to `find()` calls
// markSchema.pre("find", function () {
//     // prettier-ignore
//     this
//     .populate({ path: "student", select: "name -_id" })
//     .populate({ path: "head", select: "headname total -_id" });
// });

// markSchema.set("toObject", { virtuals: true });
// markSchema.set("toJSON", { virtuals: true });

// markSchema.virtual("head", {
//   ref: "Head",
//   localField: "hid",
//   foreignField: "hid",
// });

export const Mark = model("Mark", markSchema);
