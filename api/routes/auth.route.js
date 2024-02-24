import express from 'express';
import { authSignup } from '../controllers/auth.controller.js';
import { authSignin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',authSignup)
router.post('/signin',authSignin)

export default router;