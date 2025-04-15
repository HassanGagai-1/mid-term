import { db } from "./models/index.js";

// db.Student.find()
// .then(res => console.log(JSON.stringify(res, null, 4)))
// .then(() => process.exit());


// db.Student.find()
// .populate('marks')
// .then(res => console.log(JSON.stringify(res, null, 4)))
// .then(() => process.exit());

// db.Mark.find()
// .populate('student')
// .then(res => console.log(JSON.stringify(res, null, 4)))
// .then(() => process.exit());


// db.Student.find()
//     .then(students => {// we have asynced student object using student not students(which calls collections)
//         students.forEach(async student => { // we want to iterate not return hence we used forEach
//             let result = await db.Mark.updateMany(
//                 { regno: student.regno },
//                 { $set: { student: student._id } },
//                 { new: true } // returns updated objects
//             )
//             .populate('marks') // we want to see the result of the updateMany
//             console.log(result);

//             console.log(student.marks);
//         })
//     })




// db.Head.find()
//     .then(heads => {
//         heads.forEach(async head => {
//             let result = await db.Mark.updateMany(
//                 { hid: head.hid },
//                 { $set: { head: head._id } },
//                 { new: true }
//             )
//             console.log(result);

//             //console.log(student.regno)
//         })
//     })


//One to Many, 2 changes updatemany to update one and instead of $set we use $push

// db.Student.find().then( students => {
//     students.forEach(async student =>{
//         let ids = await db.Mark.find({ regno: student.regno }).select({_id: 1}); //id:1 is used to only get the id of the object
//         let result = await db.Student.updateOne(
//             { regno: student.regno }, //filtering
//             { $push: { marks: ids } }, 
//             {new: true}
//         )
//         console.log(result);

//     })
// })

// db.Student.find()
// .populate('marks')
// .then(res => console.log(JSON.stringify(res, null, 4)))
// .then(() => process.exit());


db.Student.aggregate([
    {
        $lookup:{
            from: "marks", 
            foreignField: "regno", 
            localField: "regno", 
            as: "obtain"
        }
    }, 
    {
        $unwind: "$obtain"
        },
    {
        $group:{
            _id: { regno: "$regno", name: "$name" },
            marks :{ $sum: {$ifNull: ["$obtain.marks",0] } },
        }
    },
    {
        $project:{
            _id: 0,
            regno: "$_id.regno",
            name: "$_id.name",
            marks: 1
        }
    }
])
.then(res => console.log(JSON.stringify(res, null, 4)))
.then(() => process.exit());

