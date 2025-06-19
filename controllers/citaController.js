import Cita from "../models/citaModel.js";
export const getCitasPorDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { fechaInicio, fechaFin } = req.query;
        const citas = await Cita.getCitasPorDoctor(id, fechaInicio, fechaFin);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener citas del doctor" });
    }
};

export const getCitasPorPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const citas = await Cita.getCitasPorPaciente(id);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener citas del paciente" });
    }
};
export const getCitas = async (req, res) => {
    try {
        const citas = await Cita.getCitas();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener todas las citas" });
    }
};
