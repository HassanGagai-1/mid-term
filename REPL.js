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
    // 1. Lookup marks for each student using the registration number.
    {
      $lookup: {
        from: "marks",         // The marks collection.
        localField: "regno",   // The student’s registration number.
        foreignField: "regno", // The marks document’s registration number.
        as: "marks"            // New array field with matching mark documents.
      }
    },
    // 2. Unwind the marks array so that each mark document can be processed individually.
    {
      $unwind: {
        path: "$marks",
        preserveNullAndEmptyArrays: true  // In case a student has no marks.
      }
    },
    // 3. Lookup head details for each mark based on hid.
    {
      $lookup: {
        from: "heads",           // The heads collection.
        localField: "marks.hid", // The head id in the mark document.
        foreignField: "hid",     // The head id field in the heads collection.
        as: "headDetails"
      }
    },
    // 4. Unwind the headDetails array to convert it to a single document.
    {
      $unwind: {
        path: "$headDetails",
        preserveNullAndEmptyArrays: true
      }
    },
    // 5. Group by the student registration number to accumulate total marks and mark details.
    {
      $group: {
        _id: "$regno",
        name: { $first: "$name" },
        totalMarks: { $sum: "$marks.marks" },
        // Create an array of objects for marks per head.
        marksByHead: {
          $push: {
            headid: "$marks.hid",
            headname: "$headDetails.headname",
            marks: "$marks.marks"
          }
        }
      }
    },
    // 6. Optionally sort the results (here by regno in ascending order).
    {
      $sort: { _id: 1 }
    }
  ])
.then(res => console.log(JSON.stringify(res, null, 4)))
.then(() => process.exit());

