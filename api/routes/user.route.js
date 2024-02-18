import express from 'express';
import { APItest } from '../controllers/user.controller.js';
const router = express.Router();
router.get('/test', APItest);

export default router;