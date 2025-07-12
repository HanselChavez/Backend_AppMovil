import express from "express";
const router = express.Router();
import {
    addSede,
    getSedes
} from "../controllers/sedeController.js";
router.get("/", getSedes);
router.post("/",addSede);

export default router;
