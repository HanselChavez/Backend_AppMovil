import express from "express";
const router = express.Router();
import {
    getCitasPorDoctor
} from "../controllers/citaController.js";

router.get("/doctor/:id", getCitasPorDoctor);
export default router;
