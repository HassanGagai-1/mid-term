import mongoose from "mongoose";
import { Course } from "./Course.js";
import { Grade } from "./Grade.js"
import { Head } from "./Head.js"
import { Mark } from "./Mark.js"
import { Student } from "./Student.js"
(async()=>{
    if(mongoose.connection.readyState === 1){ //if connection has been opened no need to open a connection else we will move to try catch block
        return true;
    }
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/recapsheet");
    } catch(error){
        console.log(error);
    }
})();
    //const is used so that object db name should not be changed
export const db = {
    Course, Student, Head, Mark, Grade

}