import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';
import { StatusCodes } from 'http-status-codes';
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(errorHandler(StatusCodes.UNAUTHORIZED, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(StatusCodes.UNAUTHORIZED, 'Unauthorized'));
        }
        req.user = user;
        next();
    });
}