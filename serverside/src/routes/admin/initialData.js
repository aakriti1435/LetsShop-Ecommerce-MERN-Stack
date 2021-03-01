import express from "express";
import { getInitialData } from "../../controller/admin/initialData.js";

const router = express.Router();

router.get("/initialData", getInitialData);

export default router;
