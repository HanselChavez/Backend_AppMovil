import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import rolRoutes from "./routes/rolRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import servicioRoutes from "./routes/servicioRoutes.js";
import resenaRoutes from './routes/resenaRoutes.js'
import especialidadRoutes from "./routes/especialidadRoutes.js";
import citaRoutes from './routes/citaRoutes.js'
import historialRoutes from './routes/historialRoutes.js'
import sedeRoutes from './routes/sedeRoutes.js'
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
dotenv.config();

//app.use('/api/auth',authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/doctores", doctorRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/sedes", sedeRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/especialidades", especialidadRoutes);
app.use("/api/resenas", resenaRoutes);
app.use("/api/historial", historialRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
