import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user.route.js'
const app = express();
dotenv.config();
// security packages
app.use(cors());
// middleware packages
app.use(express.json());
const PORT = process.env.PORT || 8000;
// db config
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB is connected successfully!')
}).catch((error) => {
    console.log(error)
});
// all routes
app.use('/api', userRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
});