import Servicio from "../models/servicioModel.js";

export const obtenerServicios = async (req, res) => {
    try {
        const servicios = await Servicio.getAllServicios();
        res.json(servicios);
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        res.status(500).json({ error: "Error al obtener servicios" });
    }
};
