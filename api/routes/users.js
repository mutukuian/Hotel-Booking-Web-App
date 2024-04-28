import express from "express"
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controller/user_controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello User You are Loggeed in")
// });

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("Hello User You are Logged in and can delete your account")
// });

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello Admin You are Logged in and can delete all accounts")
// });

//CREATE
router.post("/",createUser);
//UPDATE
router.put("/:id",verifyUser, updateUser);
//DELETE
router.delete("/:id",verifyUser,deleteUser);
//GET
router.get("/:id", verifyUser,getUser);
//GETALL
router.get("/",verifyAdmin,getAllUsers);


export default router