import express from "express";
import { createError } from "../utils/error.js";
import {createRoom, deleteRoom, getAllRooms, getRoom, updateRoom} from "../controller/room_controller.js"
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()


//CREATE
router.post("/:hotelId",verifyAdmin,createRoom);
//UPDATE
router.put("/:id",verifyAdmin,updateRoom);
//DELETE
router.delete("/:id/:hotelId",verifyAdmin, deleteRoom);
//GET
router.get("/:id", getRoom);
//GETALL
router.get("/",getAllRooms);

export default router