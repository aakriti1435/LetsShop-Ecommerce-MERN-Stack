import express from 'express';
import { signUp, signIn, requireSignIn } from '../../controller/admin/user.js';
import { validateSignUpRequest, validateSignInRequest, isRequestValidated } from '../../validators/user.js';

const router = express.Router();

router.post('/admin/signIn', validateSignInRequest, isRequestValidated, signIn);

router.post('/admin/signUp', validateSignUpRequest, isRequestValidated, signUp);


export default router;