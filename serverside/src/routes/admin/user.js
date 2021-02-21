import express from 'express';
import { requireSignIn } from '../../common-middlewares/index.js';
import { signUp, signIn, signOut } from '../../controller/admin/user.js';
import { validateSignUpRequest, validateSignInRequest, isRequestValidated } from '../../validators/user.js';

const router = express.Router();

router.post('/admin/signIn', validateSignInRequest, isRequestValidated, signIn);

router.post('/admin/signUp', validateSignUpRequest, isRequestValidated, signUp);

router.post('/admin/signOut', requireSignIn, signOut);


export default router;