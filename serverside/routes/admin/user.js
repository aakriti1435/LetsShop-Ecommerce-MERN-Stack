import express from 'express';
import { signUp, signIn, requireSignIn } from '../../controller/admin/user.js';

const router = express.Router();

router.post('/admin/signIn', signIn);

router.post('/admin/signUp', signUp);


export default router;