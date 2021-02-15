import express from 'express';
import { signUp, signIn, requireSignIn } from '../controller/user.js';

const router = express.Router();

router.post('/signIn', signIn);

router.post('/signUp', signUp);

router.post('/profile', requireSignIn, (req, res) => {
    res.status(200).json({ user: 'profile' })
});

export default router;