import express from "express";
import { Grade } from "../models/Grade.js";
import { db } from "../models/index.js";

const router = express.Router();



router.get("/students-with-marks", async (req, res) => {
    try {
        const students = await db.Student.aggregate([
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
                      },
                      
                    }
                  }
                },
                // 6. Optionally sort the results (here by regno in ascending order).
                {
                  $sort: { _id: 1 }
                }
        ]);
            
            res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve students" });
    }    
});

router.get("/get-grades", async (req,res) => {
    try {
        const grades = await db.Grade.find();
        res.status(200).json(grades);
    } catch (error) {
        console.error("Error fetching grades:", error);
        res.status(500).json({ error: "Failed to fetch grades" });
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
