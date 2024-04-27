import express from "express"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js";
import {createHotel, deleteHotel, getAllHotels, getHotel, updateHotel} from "../controller/hotel_controller.js"


const router = express.Router()

//CREATE
router.post("/",createHotel);
//UPDATE
router.put("/:id", updateHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET
router.get("/:id", getHotel);
//GETALL
router.get("/",getAllHotels);

export default router