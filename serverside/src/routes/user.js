import express from "express";
import { signUp, signIn, signOut } from "../controller/user.js";
import {
    validateSignUpRequest,
    validateSignInRequest,
    isRequestValidated,
} from "../validators/user.js";

const router = express.Router();

router.post("/signIn", validateSignInRequest, isRequestValidated, signIn);

router.post("/signUp", validateSignUpRequest, isRequestValidated, signUp);

router.post("/signOut", signOut);

export default router;
