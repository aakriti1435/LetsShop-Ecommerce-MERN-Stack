import express from 'express';
import { signUp, signIn } from '../controller/user.js';
import { validateSignUpRequest, validateSignInRequest, isRequestValidated } from "../validators/user.js";

const router = express.Router();

router.post('/signIn', validateSignInRequest, isRequestValidated, signIn);

router.post('/signUp', validateSignUpRequest, isRequestValidated, signUp);


export default router;