import { pool } from "../db/db.js";

export default class Cita {
    static async getCitasPorDoctor(doctorId, fechaInicio, fechaFin) {
        let query = `
            SELECT c.*, u.nombres AS paciente_nombre, u.apellidos AS paciente_apellidos
            FROM Citas c
            INNER JOIN Usuarios u ON c.usuario_id = u.id
            WHERE c.doctor_id = $1`;

        const params = [doctorId];
        if (fechaInicio && fechaFin) {
            query += " AND c.fecha BETWEEN $2 AND $3";
            params.push(fechaInicio, fechaFin);
        }

        const result = await pool.query(query, params);
        return result.rows;
    }
}
