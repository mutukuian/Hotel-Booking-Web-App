import user_model from "../models/user_model.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"


//register User logic

export const register = async(req,res,next) =>{

    try {
        //password encryption using bcryptjs
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        //creation of user object 
        const newUser = new user_model({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        });

        await newUser.save()
        res.status(200).send("Registration Successfully")
    } catch (err) {
        next(err)
    }
};


//login user logic

export const login = async(req,res,next) =>{

    try{
        //user validation
        const user = await user_model.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found! "));


        //password validation
        const isPasswordCorrect = await bcrypt.compare(req.body.password , user.password)
        if(!isPasswordCorrect) return next(createError(400,"Wrong Password! "));

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT);

        const{password,isAdmin, ...otherDetails } = user._doc;
        res
        .cookie("access_token",token,{
            httpOnly:true //does not allow client secret to reach cookie
        })
        .status(200)
        .json({...otherDetails});
    } catch (err) {
        next(err);
    }
};