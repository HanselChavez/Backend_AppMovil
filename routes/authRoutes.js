import express from "express";
const router = express.Router();
import { login, register } from "../controllers/authController.js";
import { upload } from "../config/multerConfig.js";

router.post("/login", login);
router.post("/register", upload.single("imagen"), register);

export default router;
