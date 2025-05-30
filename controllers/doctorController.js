import Doctor from "../models/doctorModel.js";

export const obtenerDoctores = async (req, res) => {
    try {
        const doctores = await Doctor.getAllDoctores();
        res.json(doctores);
    } catch (err) {

        console.log(err);

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

export const obtenerDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.getDoctorById(req.params.id);
        if (!doctor)
            return res.status(404).json({ mensaje: "Doctor no encontrado" });
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener doctor" });
    }
};
export const actualizarDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.updateDoctor(req.params.id, req.body);
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al actualizar doctor" });
    }
};
export const eliminarDoctor = async (req, res) => {
    try {
        await Doctor.deleteDoctor(req.params.id);
        res.json({ mensaje: "Doctor eliminado" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al eliminar doctor" });
    }
};
/*
export const obtenerDoctoresPorEspecialidad = async (req, res) => {
    try {
        const { especialidad_id } = req.params;
        const doctores = await Doctor.getDoctoresPorEspecialidad(especialidad_id);
        res.json(doctores);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener doctores por especialidad" });
    }
}; */

