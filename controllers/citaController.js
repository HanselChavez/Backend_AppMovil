import Cita from "../models/citaModel.js";

export const addCita = async (req, res) => {
    const { usuario_id, doctor_id, servicio_id, fecha, hora, nota } = req.body;

    if (!usuario_id || !doctor_id || !fecha || !hora) {
        return res
            .status(400)
            .json({
                error: "usuario_id, doctor_id, fecha y hora son requeridos",
            });
    }

    try {
        const nuevaCita = await Cita.addCita({
            usuario_id,
            doctor_id,
            servicio_id: servicio_id || null,
            fecha,
            hora,
            nota: nota || null,
        });

        res.status(200).json({
            cita_id: nuevaCita.id,
            mensaje: "Cita creada exitosamente",
        });
    } catch (error) {
        console.error("Error al crear cita:", error);
        res.status(500).json({ error: "Error al crear cita" });
    }
};

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
