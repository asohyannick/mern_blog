import { StatusCodes } from "http-status-codes";
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'All fields are required'});
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password:hashPassword
    });
    try {
        await newUser.save();
        res.json("signup successful!");
    } catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
}