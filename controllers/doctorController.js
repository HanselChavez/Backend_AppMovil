import Doctor from "../models/doctorModel.js";

export const obtenerDoctores = async (req, res) => {
    try {
        const doctores = await Doctor.getAllDoctores();
        res.json(doctores);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener doctores" });
    }
};

export const crearDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.createDoctor(req.body);
        res.status(201).json(doctor);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al crear doctor" });
    }
};
