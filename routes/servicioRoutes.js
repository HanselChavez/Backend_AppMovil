import express from 'express';
import {obtenerServicios} from '../controllers/servicioController.js';

const router = express.Router();

router.get('/', obtenerServicios);

export default router;