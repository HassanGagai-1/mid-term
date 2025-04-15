import express from "express";
import { Grade } from "../models/Grade.js";
import { db } from "../models/index.js";

const router = express.Router();

// Grade calculation function
async function calculateGrade(percentage) {
  try {
    const grades = await Grade.find().sort({ start: -1 });
    const matchedGrade = grades.find(
      (grade) => percentage >= grade.start && percentage <= grade.end
    );
    return matchedGrade || { gradeid: 0, grade: "Invalid", gpa: 0 };
  } catch (err) {
    console.error("Error calculating grade:", err);
    throw new Error("Error calculating grade");
  }
}

router.get("/students-with-marks", async (req, res) => {
  try {
    const students = await db.Student.aggregate([
      {
        $lookup: {
          from: "marks",
          localField: "regno",
          foreignField: "regno",
          as: "marks",
        },
      },
      { $unwind: { path: "$marks", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "heads",
          localField: "marks.hid",
          foreignField: "hid",
          as: "headDetails",
        },
      },
      { $unwind: { path: "$headDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          regno: 1,
          name: 1,
          headid: "$marks.hid",
          headname: "$headDetails.headname",
          marks: "$marks.marks",
          total: "$headDetails.total",
        },
      },
      {
        $group: {
          _id: "$regno",
          name: { $first: "$name" },
          marksByHead: {
            $push: {
              headid: "$headid",
              headname: "$headname",
              marks: "$marks",
              total: "$total",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Remove duplicates and calculate totals
    const studentsWithGrades = await Promise.all(
      students.map(async (student) => {
        const aggregatedHeads = new Map();

        student.marksByHead.forEach(({ headid, headname, marks, total }) => {
          if (!aggregatedHeads.has(headid)) {
            aggregatedHeads.set(headid, {
              headname,
              totalMarks: 0,
              totalOutOf: 0,
            });
          }
          const current = aggregatedHeads.get(headid);
          current.totalMarks += marks || 0;
          current.totalOutOf += total || 0;
        });

        const uniqueHeads = Array.from(aggregatedHeads.entries()).map(
          ([headid, data]) => ({
            headid,
            headname: data.headname,
            marks: data.totalMarks,
            total: data.totalOutOf,
          })
        );

        const totalMarks = uniqueHeads.reduce((sum, h) => sum + h.marks, 0);
        const totalMaxMarks = uniqueHeads.reduce((sum, h) => sum + h.total, 0);
        const percentage = totalMaxMarks
          ? parseFloat(((totalMarks / totalMaxMarks) * 100).toFixed(2))
          : 0;

        const gradeInfo = await calculateGrade(percentage);

        return {
          regno: student._id,
          name: student.name,
          totalMarks,
          percentage,
          grade: gradeInfo.grade,
          gpa: gradeInfo.gpa,
          marksByHead: uniqueHeads,
        };
      })
    );

    res.status(200).json(studentsWithGrades);
  } catch (error) {
    console.error("Error retrieving students with grades:", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  }
});
router.put("/update-marks", async (req, res) => {
    try {
      const { regno, headid, newMarks } = req.body;
  
      console.log("Incoming PUT request:", { regno, headid, newMarks });
  
      if (!regno || headid === undefined || newMarks === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const updatedMark = await db.Mark.findOneAndUpdate(
        { regno: regno, hid: headid },
        { $set: { marks: newMarks } },
        { new: true }
      );
  
      if (!updatedMark) {
        console.log("Mark record not found");
        return res.status(404).json({ error: "Mark record not found" });
      }
  
      console.log("Updated mark:", updatedMark);
      res.status(200).json({ message: "Marks updated successfully", updatedMark });
    } catch (error) {
      console.error("Error updating marks:", error);  // Full error details
      res.status(500).json({ error: "Internal server error" });
    }
  });



export default router;
