import { pool } from "../db/db.js";
export default class Doctor {
    static getAllDoctores = async () => {
        const result = await pool.query("SELECT * FROM Doctores");
        return result.rows;
    };

    static createDoctor = async ({
        usuario_id,
        especialidad_id,
        descripcion,
    }) => {
        const result = await pool.query(
            "INSERT INTO Doctores (usuario_id, especialidad_id, descripcion) VALUES ($1, $2, $3) RETURNING *",
            [usuario_id, especialidad_id, descripcion]
        );
        return result.rows[0];
    };
    static getDoctorById = async (id) => {
        const result = await pool.query(
            "SELECT * FROM Doctores WHERE id = $1",
            [id]
        );
        return result.rows[0];
};
    static updateDoctor = async (
        id,
        { usuario_id, especialidad_id, descripcion }
    ) => {
        const result = await pool.query(
            "UPDATE Doctores SET usuario_id = $1, especialidad_id = $2, descripcion = $3 WHERE id = $4 RETURNING *",
            [usuario_id, especialidad_id, descripcion, id]
        );
        return result.rows[0];
    };

    static deleteDoctor = async (id) => {
        await pool.query("DELETE FROM Doctores WHERE id = $1", [id]);
    };

    /* QUIZA SIRVA PARA AUTENTICACION DE DOCTORES
    static findDoctorByEmail = async (correo) => {
    const query = `
        SELECT 
            u.id AS usuario_id,
            u.correo,
            u.contraseña,
            u.rol_id,
            d.id AS doctor_id,
            d.especialidad_id,
            d.descripcion
        FROM Usuarios u
        JOIN Doctores d ON d.usuario_id = u.id
        WHERE u.correo = $1
    `;
    const { rows } = await pool.query(query, [correo]);
    return rows[0] || null;
}; */
}