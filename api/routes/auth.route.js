import express from 'express';
import { authSignup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',authSignup)

export default router;