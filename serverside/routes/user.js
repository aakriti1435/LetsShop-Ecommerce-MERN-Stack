import express from 'express';
import { signUp, signIn, requireSignIn } from '../controller/user.js';

const router = express.Router();

router.post('/signIn', signIn);

router.post('/signUp', signUp);


export default router;