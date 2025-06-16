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
    static async getCitasPorPaciente(pacienteId) {
        const query = `
        SELECT c.*, 
             d.id AS doctor_id, 
             u.nombres AS doctor_nombre, 
             u.apellidos AS doctor_apellido
        FROM Citas c
        INNER JOIN Doctores d ON c.doctor_id = d.id
        INNER JOIN Usuarios u ON d.usuario_id = u.id
        WHERE c.usuario_id = $1
        ORDER BY c.fecha DESC, c.hora DESC;
    `;
        const { rows } = await pool.query(query, [pacienteId]);
        return rows;
    }
}
